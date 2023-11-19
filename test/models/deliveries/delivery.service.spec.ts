import { Test, TestingModule } from "@nestjs/testing";
import { EmailService } from "src/common/services/email.service";
import { CalculatorService } from "src/models/calculators/calculator.service";
import { DeliveryService } from "src/models/deliveries/delivery.service";
import { PrismaService } from "src/prisma/prisma.service";
import { mockedCalculator } from "../calculators/mocks/calculator.mock";
import { createMockDeliveryRequestDto, mockedDeliveryRequest, mockedDeliveryRequestWithWeekendDelivery } from "./mocks/delivery.mock";
import { Decimal } from "@prisma/client/runtime/library";

jest.mock('src/models/calculators/calculator.service');
jest.mock('src/common/services/email.service');

describe('DeliveryService', () => {
    let service: DeliveryService;
    let calculatorService: CalculatorService;
    let prismaService: PrismaService;
    let emailService: EmailService;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          DeliveryService,
          CalculatorService,
          PrismaService,
          EmailService,
        ],
      }).compile();
  
      service = module.get<DeliveryService>(DeliveryService);
      calculatorService = module.get<CalculatorService>(CalculatorService);
      prismaService = module.get<PrismaService>(PrismaService);
      emailService = module.get<EmailService>(EmailService);
    });
  
    describe('createDeliveryRequest', () => {
      it('should create a delivery request and send confirmation email', async () => {
        const mockDeliveryRequestData = createMockDeliveryRequestDto();
  
        jest.spyOn(calculatorService, 'getCalculator').mockResolvedValue(mockedCalculator);
        jest.spyOn(prismaService.deliveryRequest, 'create').mockResolvedValue(mockedDeliveryRequest);
        jest.spyOn(service, 'sendDeliveryRequestConfirmationEmail').mockResolvedValue();
  
        const result = await service.createDeliveryRequest(mockDeliveryRequestData);
  
        expect(result).toStrictEqual(new Decimal(25))
        expect(calculatorService.getCalculator).toHaveBeenCalled();
        expect(prismaService.deliveryRequest.create).toHaveBeenCalledWith(
        {
            data: {
                deliveryDistance: mockDeliveryRequestData.deliveryDistanceInKm,
                deliveryDate: mockDeliveryRequestData.deliveryDate,
                numberOfPackages: mockDeliveryRequestData.numberOfPackages,
                firstName: mockDeliveryRequestData.firstName,
                lastName: mockDeliveryRequestData.lastName,
                email: mockDeliveryRequestData.email,
                phoneNumber: mockDeliveryRequestData.phoneNumber,
                totalPrice: new Decimal(25)
            }
        }),
        
        expect(service.sendDeliveryRequestConfirmationEmail).toHaveBeenCalledWith(mockedDeliveryRequest);
      });
    });
  });