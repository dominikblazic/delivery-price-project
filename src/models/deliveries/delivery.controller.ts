import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryRequestDto } from './dtos';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiTags } from '@nestjs/swagger';
import { DeliveryRequestValidationPipe } from './pipes/delivery-request.pipe';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private deliveryService: DeliveryService) {}

    @Post()
    @UsePipes(new DeliveryRequestValidationPipe())
    async createDeliveryRequest(@Body() deliveryRequestData: CreateDeliveryRequestDto): Promise<Decimal> {
      return this.deliveryService.createDeliveryRequest(deliveryRequestData);
    }
}
