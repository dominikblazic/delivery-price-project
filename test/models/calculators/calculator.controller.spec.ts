import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorServiceMock } from './mocks/calculator.service.mock';
import { CalculatorController } from 'src/models/calculators/calculator.controller';
import { CalculatorService } from 'src/models/calculators/calculator.service';
import { CalculatorDto } from 'src/models/calculators/dtos';
import { createMockCalculatorDto } from './mocks/calculator.mock';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { mockConfigService, mockJwtService } from '../common/mocks';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';

describe('CalculatorController', () => {
    let controller: CalculatorController;
    let calculatorService: CalculatorService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CalculatorController],
        providers: [
            {
                provide: CalculatorService,
                useValue: CalculatorServiceMock,
            },
            JwtAuthGuard,
                { provide: JwtService, useValue: mockJwtService },
                { provide: ConfigService, useValue: mockConfigService },
          ],
      }).compile();
  
      controller = module.get<CalculatorController>(CalculatorController);
      calculatorService = module.get<CalculatorService>(CalculatorService);
    });

    describe('createCalculator', () => {
        it('should create a new calculator', async () => {
            const calculatorDto: CalculatorDto = createMockCalculatorDto();

            CalculatorServiceMock.createCalculator.mockResolvedValue(calculatorDto);

            const result = await controller.createCalculator(calculatorDto);

            expect(result).toEqual(calculatorDto);
            expect(calculatorService.createCalculator).toHaveBeenCalledWith(calculatorDto);
        });
    });

    describe('updateCalculator', () => {
        it('should update a calculator', async () => {
          const calculatorId = 1;
          const updatedCalculatorDto: CalculatorDto = createMockCalculatorDto();
    
          CalculatorServiceMock.updateCalculator.mockResolvedValue(updatedCalculatorDto);
    
          const result = await controller.updateCalculator(calculatorId, updatedCalculatorDto);
    
          expect(result).toEqual(updatedCalculatorDto);
          expect(calculatorService.updateCalculator).toHaveBeenCalledWith(calculatorId, updatedCalculatorDto);
        });
      });
})
