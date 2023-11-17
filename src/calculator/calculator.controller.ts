import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CalculatorDto } from './dto';
import { CalculatorService } from './calculator.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Calculator')
@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService) {}

  @Post()
  async createCalculator(@Body() calculatorDto: CalculatorDto) {
    const calculator = await this.calculatorService.createCalculator(calculatorDto);
    return calculator;
  }

  @Get(':id')
  async getCalculatorById(@Param('id') id: number) {
    const calculator = await this.calculatorService.getCalculatorById(id);
    return calculator;
  }
}
