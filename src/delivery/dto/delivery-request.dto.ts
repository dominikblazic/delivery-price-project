import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateDeliveryRequestDto {
  @ApiProperty()
  readonly deliveryDistanceInKm: number;

  @ApiProperty()
  readonly deliveryDate: Date;

  @ApiProperty()
  readonly numberOfPackages: number;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phoneNumber: string;
}