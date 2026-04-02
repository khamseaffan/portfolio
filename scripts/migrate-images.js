import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';
import { lookup } from 'mime-types';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

const pool = new Pool({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Recursively collect all files in a directory
function collectFiles(dir, base) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...collectFiles(fullPath, base));
    } else {
      files.push({
        fullPath,
        relativePath: relative(base, fullPath), // e.g., "skills/python.png"
      });
    }
  }
  return files;
}

async function uploadAllImages() {
  const files = collectFiles(imagesDir, imagesDir);
  console.log(`Found ${files.length} image files to upload\n`);

  const urlMap = {}; // relativePath -> supabase public URL
  let uploaded = 0;
  let skipped = 0;

  for (const file of files) {
    const contentType = lookup(file.fullPath) || 'application/octet-stream';
    const buffer = readFileSync(file.fullPath);
    const storagePath = `images/${file.relativePath}`;

    // Check if already uploaded
    const { data: existing } = await supabase.storage
      .from('portfolio')
      .list(storagePath.split('/').slice(0, -1).join('/'), {
        search: storagePath.split('/').pop(),
      });

    if (existing?.length > 0) {
      const { data: urlData } = supabase.storage
        .from('portfolio')
        .getPublicUrl(storagePath);
      urlMap[file.relativePath] = urlData.publicUrl;
      skipped++;
      continue;
    }

    const { error } = await supabase.storage
      .from('portfolio')
      .upload(storagePath, buffer, { contentType, upsert: true });

    if (error) {
      console.error(`  ✗ ${file.relativePath}: ${error.message}`);
      continue;
    }

    const { data: urlData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(storagePath);

    urlMap[file.relativePath] = urlData.publicUrl;
    uploaded++;

    if (uploaded % 10 === 0) {
      console.log(`  Uploaded ${uploaded} files...`);
    }
  }

  console.log(`\nUpload complete: ${uploaded} new, ${skipped} already existed\n`);
  return urlMap;
}

async function updateDbRecords(urlMap) {
  console.log('Updating database records...\n');

  // Helper: update imageSrc for a model's records
  async function updateModel(modelName, label) {
    const records = await prisma[modelName].findMany();
    let updated = 0;
    for (const record of records) {
      if (record.imageSrc && urlMap[record.imageSrc]) {
        await prisma[modelName].update({
          where: { id: record.id },
          data: { imageSrc: urlMap[record.imageSrc] },
        });
        updated++;
      }
    }
    if (updated > 0) console.log(`  ✓ ${label}: ${updated} records updated`);
  }

  await updateModel('experience', 'Experience');
  await updateModel('project', 'Project');
  await updateModel('education', 'Education');
  await updateModel('certification', 'Certification');
  await updateModel('skill', 'Skill');
  await updateModel('leadership', 'Leadership');

  // Profile — single record
  const profile = await prisma.profile.findFirst();
  if (profile?.imageSrc && urlMap[profile.imageSrc]) {
    await prisma.profile.update({
      where: { id: profile.id },
      data: { imageSrc: urlMap[profile.imageSrc] },
    });
    console.log('  ✓ Profile: updated');
  }

  console.log('\nDatabase update complete!');
}

async function main() {
  console.log('=== Image Migration: public/images/ → Supabase Storage ===\n');

  const urlMap = await uploadAllImages();
  await updateDbRecords(urlMap);

  console.log('\nMigration finished. You can now remove public/images/ if desired.');
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
