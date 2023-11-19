
import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from 'src/models/calculators/calculator.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalculatorDto } from 'src/models/calculators/dtos';
import { ConflictException } from '@nestjs/common';
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

      await expect(service.createCalculator(calculatorDto)).rejects.toThrowError(ConflictException);
    });
  });
});