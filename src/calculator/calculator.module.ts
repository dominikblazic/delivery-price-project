import { Module } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CalculatorService, JwtService],
  controllers: [CalculatorController]
})
export class CalculatorModule {}
