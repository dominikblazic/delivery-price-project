import { Decimal } from "@prisma/client/runtime/library";
import { CalculatorDto, DistanceIntervalDto } from "src/models/calculators/dtos";

export const mockedDistanceIntervals = 
[
    {
      id: 1, 
      distanceFromKm: new Decimal(0),
      distanceToKm: new Decimal(5),
      pricePerKm: new Decimal(2),
      calculatorId: 1, 
    },
    {
      id: 2, 
      distanceFromKm: new Decimal(5),
      distanceToKm: new Decimal(10),
      pricePerKm: new Decimal(1),
      calculatorId: 1, 
    },
];

export const mockedCalculator = {
    id: 1, 
    createdAt: new Date(),
    updatedAt: new Date(),
    basePrice: new Decimal(10),
    additionalPackagePrice: new Decimal(5),
    distanceIntervals: mockedDistanceIntervals
  };



export const createMockCalculatorDto = (basePrice: number = 10): CalculatorDto => {
    return {
      basePrice: basePrice,
      additionalPackagePrice: 5,
      distanceIntervals: createMockDistanceIntervalDto(), 
    };
  };

export const createMockDistanceIntervalDto = (): DistanceIntervalDto[] => {
return [
    {
       distanceFromKm: 0,
       distanceToKm: 5, 
       pricePerKm: 2, 
    },
    {
        distanceFromKm: 5,
        distanceToKm: 10, 
        pricePerKm: 1, 
    }]  
};