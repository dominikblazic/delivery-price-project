import * as libphonenumber from 'google-libphonenumber';
import { CreateDeliveryRequestDto } from '../dto';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
const PhoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();

@Injectable()
export class DeliveryRequestValidationPipe implements PipeTransform<CreateDeliveryRequestDto> {
  transform(dto: CreateDeliveryRequestDto): CreateDeliveryRequestDto {
    const errors: string[] = [];
    
    if (!dto || typeof dto !== 'object') {
        errors.push('Invalid DTO');
    }

    if ((!Number.isInteger(dto.deliveryDistanceInKm) && typeof dto.deliveryDistanceInKm !== 'number') || dto.deliveryDistanceInKm <= 0) {
        errors.push('Invalid delivery distance');
    }

    if (!Number.isInteger(dto.numberOfPackages) || dto.numberOfPackages < 1) {
        errors.push('Invalid number of packages');
    }

    if (!dto.deliveryDate || isNaN(Date.parse(dto.deliveryDate))) {
        errors.push('Invalid delivery date');
    } 
    else {
        if (new Date(dto.deliveryDate) < new Date()) {
            errors.push('Delivery date cannot be in the past');
        }
    }

    if (typeof dto.firstName !== 'string' || dto.firstName.trim() === '') {
        errors.push('Invalid first name');
    }

    if (typeof dto.lastName !== 'string' || dto.lastName.trim() === '') {
        errors.push('Invalid last name');
    }

    if (!this.isValidEmail(dto.email)) {
        errors.push('Invalid email');
    }

    if (!this.isValidPhoneNumber(dto.phoneNumber)) {
        errors.push('Invalid phone number');
    }

    if (errors.length > 0) {
        throw new BadRequestException(errors);
    }
    
    return dto;
  }

  private isValidEmail(email: string) : boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  }

  private isValidPhoneNumber(value: string): boolean {
    try {
      const parsedPhoneNumber = PhoneNumberUtil.parse(value, 'any');
      return PhoneNumberUtil.isValidNumber(parsedPhoneNumber);
    } catch (error) {
      return false;
    }
  }
}