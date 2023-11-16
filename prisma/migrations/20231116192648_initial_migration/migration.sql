-- CreateTable
CREATE TABLE "Calculator" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "basePrice" DECIMAL(9,2) NOT NULL,
    "additionalPackagePrice" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "Calculator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DistanceInterval" (
    "id" SERIAL NOT NULL,
    "distanceFromKm" DECIMAL(9,2) NOT NULL,
    "distanceToKm" DECIMAL(9,2) NOT NULL,
    "pricePerKm" DECIMAL(9,2) NOT NULL,
    "calculatorId" INTEGER NOT NULL,

    CONSTRAINT "DistanceInterval_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DistanceInterval" ADD CONSTRAINT "DistanceInterval_calculatorId_fkey" FOREIGN KEY ("calculatorId") REFERENCES "Calculator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
