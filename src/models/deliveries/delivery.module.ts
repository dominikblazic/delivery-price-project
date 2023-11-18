import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { CalculatorService } from 'src/models/calculators/calculator.service';
import { EmailService } from 'src/common/services/email.service';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService, CalculatorService, EmailService]
})
export class DeliveryModule {}
