import { Injectable } from '@nestjs/common';
import { CalculatorService } from 'src/calculator/calculator.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryRequestDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class DeliveryService {
    constructor(
        private calculatorService: CalculatorService,
        private prisma: PrismaService
    ){}

    async createDeliveryRequest(deliveryRequestData: CreateDeliveryRequestDto): Promise<Decimal> {
        const deliveryPrice = await this.calculateDeliveryPrice(deliveryRequestData);

        await this.prisma.deliveryRequest.create({
            data: {
              deliveryDistance: deliveryRequestData.deliveryDistanceInKm,
              deliveryDate: deliveryRequestData.deliveryDate,
              numberOfPackages: deliveryRequestData.numberOfPackages,
              firstName: deliveryRequestData.firstName,
              lastName: deliveryRequestData.lastName,
              email: deliveryRequestData.email,
              phoneNumber: deliveryRequestData.phoneNumber,
              totalPrice: deliveryPrice,
            },
          });

        return deliveryPrice;
    }

     private async calculateDeliveryPrice(deliveryRequestData: CreateDeliveryRequestDto): Promise<Decimal> {
        const calculator = await this.calculatorService.getCalculator();

        let deliveryPrice = calculator.basePrice;
        const distanceInKm = new Decimal(deliveryRequestData.deliveryDistanceInKm);

        for (const interval of calculator?.distanceIntervals) {
          if (distanceInKm.gt(interval.distanceFromKm) && distanceInKm.lte(interval.distanceToKm)) {
            deliveryPrice = deliveryPrice.add(interval.pricePerKm.mul(distanceInKm));
            break;
          }
        }

        deliveryPrice = deliveryPrice.add(calculator.additionalPackagePrice.mul(deliveryRequestData.numberOfPackages - 1))
        
        if (this.isWeekend(deliveryRequestData.deliveryDate)) {
          const weekendIncrease = deliveryPrice.mul(0.1);
          deliveryPrice = deliveryPrice.add(weekendIncrease);
        }

        return deliveryPrice;
    }

    private isWeekend(deliveryDate: Date): boolean {
      const dayOfWeek = new Date(deliveryDate).getDay();
      return dayOfWeek === 0 || dayOfWeek === 6;
    }
}
