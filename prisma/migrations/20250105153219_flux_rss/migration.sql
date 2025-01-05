-- CreateTable
CREATE TABLE "Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idFolder" INTEGER NOT NULL,
    CONSTRAINT "Article_idFolder_fkey" FOREIGN KEY ("idFolder") REFERENCES "Folder" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_idFolder_name_key" ON "Article"("idFolder", "name");
