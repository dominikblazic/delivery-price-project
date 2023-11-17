import { Body, Controller, Post } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryRequestDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Delivery')
@Controller('delivery')
export class DeliveryController {
    constructor(private deliveryService: DeliveryService) {}

    @Post()
    async createDeliveryRequest(@Body() deliveryRequestData: CreateDeliveryRequestDto): Promise<Decimal> {
      return this.deliveryService.createDeliveryRequest(deliveryRequestData);
    }
}
