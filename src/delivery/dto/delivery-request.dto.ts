import { ApiProperty } from '@nestjs/swagger';

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