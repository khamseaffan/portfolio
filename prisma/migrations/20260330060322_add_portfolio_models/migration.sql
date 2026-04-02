-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "greeting" TEXT NOT NULL DEFAULT 'Hello, I''m',
    "bio" TEXT NOT NULL,
    "image_src" TEXT NOT NULL DEFAULT '',
    "roles" TEXT[],
    "highlights" TEXT[],
    "available_for_hire" BOOLEAN NOT NULL DEFAULT true,
    "resume_url" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "experiences" TEXT[],
    "image_src" TEXT NOT NULL DEFAULT '',
    "tech_stack" TEXT[],
    "impact" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-400',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_src" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "demo" TEXT,
    "source" TEXT,
    "category" TEXT[],
    "impact" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'Complete',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educations" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "field_of_study" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "image_src" TEXT NOT NULL DEFAULT '',
    "start_year" INTEGER NOT NULL,
    "graduation_year" INTEGER NOT NULL,
    "gpa" TEXT NOT NULL DEFAULT '',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_src" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "certificate_link" TEXT,
    "issued_by" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image_src" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leaderships" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "experiences" TEXT[],
    "image_src" TEXT NOT NULL DEFAULT '',
    "tech_stack" TEXT[],
    "impact" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT 'from-purple-500 to-blue-400',
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leaderships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "experiences_sort_order_idx" ON "experiences"("sort_order");

-- CreateIndex
CREATE INDEX "projects_sort_order_idx" ON "projects"("sort_order");

-- CreateIndex
CREATE INDEX "educations_sort_order_idx" ON "educations"("sort_order");

-- CreateIndex
CREATE INDEX "certifications_sort_order_idx" ON "certifications"("sort_order");

-- CreateIndex
CREATE INDEX "skills_category_sort_order_idx" ON "skills"("category", "sort_order");

-- CreateIndex
CREATE INDEX "leaderships_sort_order_idx" ON "leaderships"("sort_order");
