import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalculatorDto } from './dtos';

@Injectable()
export class CalculatorService {
    constructor(private prisma: PrismaService){}

    async createCalculator(dto: CalculatorDto){
        const doesCalculatorExist = await this.prisma.calculator.findFirst();

        if (doesCalculatorExist) {
            throw new ConflictException('A calculator already exists. Only one calculator is allowed.');
        }
        const { distanceIntervals, ...calculatorData } = dto;

        const calculator = await this.prisma.calculator.create({
            data: {
                ...calculatorData,
                distanceIntervals:{
                    createMany: {
                        data: distanceIntervals
                    }
                }
            }         
        })

        return calculator;
    }

    async updateCalculator(id: number, calculatorDto: CalculatorDto) {
        this.getCalculator();
    
        const { distanceIntervals, ...calculatorData } = calculatorDto;
    
        const updatedCalculator = await this.prisma.calculator.update({
          where: { id },
          data: {
            ...calculatorData,
            distanceIntervals: {
              deleteMany: {},
              createMany: {
                data: distanceIntervals,
              },
            },
          },
        });
    
        return updatedCalculator;
    }

    async getCalculator() {
        const calculator = await this.prisma.calculator.findFirst({
          include: { distanceIntervals: true },
        });
    
        if (!calculator) {
          throw new NotFoundException(`Calculator not found`);
        }
    
        return calculator;
    }
}
