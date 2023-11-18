import { Injectable } from '@nestjs/common';
import { CalculatorService } from 'src/models/calculators/calculator.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryRequestDto } from './dtos';
import { Decimal } from '@prisma/client/runtime/library';
import { EmailService } from 'src/common/services/email.service';
import { DeliveryRequest } from '@prisma/client';

@Injectable()
export class DeliveryService {
    constructor(
        private calculatorService: CalculatorService,
        private prisma: PrismaService,
        private emailService: EmailService,
    ){}

    async createDeliveryRequest(deliveryRequestData: CreateDeliveryRequestDto): Promise<Decimal> {
        const deliveryPrice = await this.calculateDeliveryPrice(deliveryRequestData);

        const deliveryRequest = await this.prisma.deliveryRequest.create({
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

        await this.sendDeliveryRequestConfirmationEmail(deliveryRequest);

        return deliveryPrice;
    }
    
    async sendDeliveryRequestConfirmationEmail(deliveryRequest: DeliveryRequest) {
      const subject = 'We have recieved your delivery request';
      const text = `
        Dear ${deliveryRequest.firstName} ${deliveryRequest.lastName},

        We have received your delivery request. Here are the details:

        Delivery Distance: ${deliveryRequest.deliveryDistance} km
        Delivery Date: ${deliveryRequest.deliveryDate}
        Number of Packages: ${deliveryRequest.numberOfPackages}
        ---------------------------------------------------------
        Total price: ${deliveryRequest.totalPrice}

        Thank you for choosing our delivery service. We will process your request promptly.

        Best regards,
        Your Delivery Service Team
      `;

      await this.emailService.sendEmail(
        deliveryRequest.email,
        subject,
        text)
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
        
        if (this.isWeekend(new Date(deliveryRequestData.deliveryDate))) {
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
