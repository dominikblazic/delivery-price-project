import * as libphonenumber from 'google-libphonenumber';
import { CreateDeliveryRequestDto } from '../dto';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
const PhoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();

@Injectable()
export class DtoValidationPipe implements PipeTransform<CreateDeliveryRequestDto, CreateDeliveryRequestDto> {
  transform(dto: CreateDeliveryRequestDto, metadata: ArgumentMetadata): CreateDeliveryRequestDto {
    if (!dto || typeof dto !== 'object') {
      throw new BadRequestException('Invalid DTO');
    }

    // Validate deliveryDistance, numberOfPackages, and totalPrice as needed
    if (!Number.isInteger(dto.deliveryDistanceInKm) || dto.deliveryDistanceInKm < 0) {
      throw new BadRequestException('Invalid delivery distance');
    }

    if (!Number.isInteger(dto.numberOfPackages) || dto.numberOfPackages < 1) {
      throw new BadRequestException('Invalid number of packages');
    }

    if (!dto.deliveryDate || !(dto.deliveryDate instanceof Date)) {
      throw new BadRequestException('Invalid delivery date');
    }

    // Validate firstName, lastName, email, and phoneNumber as needed
    if (typeof dto.firstName !== 'string' || dto.firstName.trim() === '') {
      throw new BadRequestException('Invalid first name');
    }

    if (typeof dto.lastName !== 'string' || dto.lastName.trim() === '') {
      throw new BadRequestException('Invalid last name');
    }

    // if (!this.isValidEmail(dto.email)) {
    //   throw new BadRequestException('Invalid email');
    // }

    // if (!this.isValidPhoneNumber(dto.phoneNumber)) {
    //   throw new BadRequestException('Invalid phone number');
    // }

    return dto;
  }
}