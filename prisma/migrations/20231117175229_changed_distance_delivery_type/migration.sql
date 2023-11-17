/*
  Warnings:

  - You are about to alter the column `deliveryDistance` on the `DeliveryRequest` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(9,2)`.

*/
-- AlterTable
ALTER TABLE "DeliveryRequest" ALTER COLUMN "deliveryDistance" SET DATA TYPE DECIMAL(9,2);
