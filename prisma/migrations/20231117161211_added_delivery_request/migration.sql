-- CreateTable
CREATE TABLE "DeliveryRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDistance" INTEGER NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "numberOfPackages" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "totalPrice" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "DeliveryRequest_pkey" PRIMARY KEY ("id")
);
