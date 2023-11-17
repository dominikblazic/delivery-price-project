import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CalculatorDto } from './dto';

@Injectable()
export class CalculatorService {
    constructor(private prisma: PrismaService){}

    async createCalculator(dto: CalculatorDto){
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

    async getCalculatorById(id: number) {
        const calculator = await this.prisma.calculator.findUnique({
          where: { id },
          include: { distanceIntervals: true },
        });
    
        if (!calculator) {
          throw new NotFoundException(`Calculator with ID ${id} not found`);
        }
    
        return calculator;
      }
}
