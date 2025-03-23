/*
  Warnings:

  - The primary key for the `DiscountClick` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `checkoutId` on the `DiscountClick` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `DiscountClick` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `DiscountClick` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `DiscountClick` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DiscountClick" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT,
    "discountCode" TEXT NOT NULL,
    "cartTotal" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DiscountClick" ("cartTotal", "discountCode", "id", "timestamp") SELECT "cartTotal", "discountCode", "id", "timestamp" FROM "DiscountClick";
DROP TABLE "DiscountClick";
ALTER TABLE "new_DiscountClick" RENAME TO "DiscountClick";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
