-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "img" TEXT NOT NULL,
    "imgAlt" TEXT,
    "git" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
