import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { CalculatorService } from 'src/calculator/calculator.service';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService, CalculatorService]
})
export class DeliveryModule {}
