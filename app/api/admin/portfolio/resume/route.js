import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAdminAuthenticated } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// POST /api/admin/portfolio/resume - Upload resume PDF
export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File must be under 5MB' }, { status: 400 });
  }

  const supabase = getSupabase();
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `resume-${Date.now()}.pdf`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('portfolio')
    .upload(fileName, buffer, {
      contentType: 'application/pdf',
      upsert: false,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('portfolio')
    .getPublicUrl(fileName);

  const resumeUrl = urlData.publicUrl;

  // Update profile
  const existing = await prisma.profile.findFirst();
  if (existing) {
    // Delete old resume file if it's a Supabase URL
    if (existing.resumeUrl?.includes('supabase')) {
      const oldPath = existing.resumeUrl.split('/portfolio/')[1];
      if (oldPath) {
        await supabase.storage.from('portfolio').remove([oldPath]);
      }
    }

    await prisma.profile.update({
      where: { id: existing.id },
      data: { resumeUrl },
    });
  }

  return NextResponse.json({ resumeUrl });
}
