import { ApiProperty } from "@nestjs/swagger";

export class DistanceIntervalDto {
    @ApiProperty()
    readonly distanceFromKm: number;
  
    @ApiProperty()
    readonly distanceToKm: number;
  
    @ApiProperty()
    readonly pricePerKm: number;
  }