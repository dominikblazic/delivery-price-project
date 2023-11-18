import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CalculatorDto } from './dtos';
import { CalculatorService } from './calculator.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('Calculator')
@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {}

  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  @Post()
  async createCalculator(@Body() calculatorDto: CalculatorDto) {
    const calculator = await this.calculatorService.createCalculator(calculatorDto);
    return calculator;
  }

  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateCalculator(@Param('id', new ParseIntPipe()) id, @Body() calculatorDto: CalculatorDto) {
    const updatedCalculator = await this.calculatorService.updateCalculator(id, calculatorDto);
    return updatedCalculator;
  }
}
