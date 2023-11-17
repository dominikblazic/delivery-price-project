import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  async updateCalculator(@Param('id', new ParseIntPipe()) id, @Body() calculatorDto: CalculatorDto) {
    const updatedCalculator = await this.calculatorService.updateCalculator(id, calculatorDto);
    return updatedCalculator;
  }

  @Get(':id')
  async getCalculatorById(@Param('id', new ParseIntPipe()) id) {
    const calculator = await this.calculatorService.getCalculatorById(id);
    return calculator;
  }
}
