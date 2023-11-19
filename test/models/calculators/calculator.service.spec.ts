
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from 'src/models/calculators/calculator.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalculatorDto } from 'src/models/calculators/dtos';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { createMockCalculatorDto, mockedCalculator } from './mocks/calculator.mock';
import { Decimal } from '@prisma/client/runtime/library';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService, PrismaService],
    }).compile();

    service = module.get<CalculatorService>(CalculatorService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('createCalculator', () => {
    it('should create a calculator successfully', async () => {
        const calculatorDto: CalculatorDto = createMockCalculatorDto();

      jest.spyOn(prismaService.calculator, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prismaService.calculator, 'create').mockResolvedValue(mockedCalculator);

      const result = await service.createCalculator(calculatorDto);

      expect(result.basePrice).toEqual(new Decimal(calculatorDto.basePrice))
      expect(result.additionalPackagePrice).toEqual(new Decimal(calculatorDto.additionalPackagePrice))
    });

    it('should throw a ConflictException when a calculator already exists', async () => {
        const calculatorDto: CalculatorDto = createMockCalculatorDto();

        jest.spyOn(prismaService.calculator, 'findFirst').mockResolvedValue(mockedCalculator);

        await expect(service.createCalculator(calculatorDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('updateCalculator', () => {
    it('should update a calculator successfully', async () => {
      const calculatorId = 1;
      const calculatorDto: CalculatorDto = createMockCalculatorDto(5);
      mockedCalculator.basePrice = new Decimal(5);

      jest.spyOn(service, 'getCalculator').mockImplementation();
      jest.spyOn(prismaService.calculator, 'update').mockResolvedValue(mockedCalculator); 

      const result = await service.updateCalculator(calculatorId, calculatorDto);

      expect(result.basePrice).toEqual(new Decimal(calculatorDto.basePrice))
      expect(result.additionalPackagePrice).toEqual(new Decimal(calculatorDto.additionalPackagePrice))
      expect(prismaService.calculator.update).toHaveBeenCalledWith({
        where: { id: calculatorId },
        data: expect.objectContaining({
          basePrice: calculatorDto.basePrice,
          additionalPackagePrice: calculatorDto.additionalPackagePrice,
        }),
      });
    });
  });

  describe('getCalculator', () => {
    it('should get a calculator successfully', async () => {
      jest.spyOn(prismaService.calculator, 'findFirst').mockResolvedValue(mockedCalculator);

      const result = await service.getCalculator();

      expect(result).toEqual(mockedCalculator);
      expect(prismaService.calculator.findFirst).toHaveBeenCalledWith({
        include: { distanceIntervals: true },
      });
    });

    it('should throw NotFoundException if calculator not found', async () => {
      jest.spyOn(prismaService.calculator, 'findFirst').mockResolvedValue(null);

      await expect(service.getCalculator()).rejects.toThrow(NotFoundException);
    });
  });
});