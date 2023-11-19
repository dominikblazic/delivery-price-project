import { Test, TestingModule } from '@nestjs/testing';
import { Decimal } from '@prisma/client/runtime/library';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { DeliveryController } from 'src/models/deliveries/delivery.controller';
import { DeliveryService } from 'src/models/deliveries/delivery.service';
import { createMockDeliveryRequestDto } from './mocks/delivery.mock';
import { DeliveryServiceMock } from './mocks/delivery.service.mock';

describe('DeliveryController', () => {
  let controller: DeliveryController;
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
            provide: DeliveryService,
            useValue: DeliveryServiceMock,
        },
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
    service = module.get<DeliveryService>(DeliveryService);
  });

  describe('createDeliveryRequest', () => {
    it('should create a delivery request successfully', async () => {
      const mockDeliveryRequest = createMockDeliveryRequestDto();

      jest.spyOn(service, 'createDeliveryRequest').mockResolvedValue(new Decimal(10));

      const result = await controller.createDeliveryRequest(mockDeliveryRequest);

      expect(result).toEqual(new Decimal(10));
      expect(service.createDeliveryRequest).toHaveBeenCalledWith(mockDeliveryRequest);
    });

    it('should handle validation errors', async () => {
      const mockDeliveryRequest = createMockDeliveryRequestDto("123");

      DeliveryServiceMock.createDeliveryRequest.mockRejectedValue(new HttpException('Validation failed', HttpStatus.BAD_REQUEST));

      await expect(controller.createDeliveryRequest(mockDeliveryRequest)).rejects.toThrow(HttpException);
    });
  });
});