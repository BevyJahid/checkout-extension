-- CreateTable
CREATE TABLE "DiscountClick" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "discountCode" TEXT NOT NULL,
    "cartTotal" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
