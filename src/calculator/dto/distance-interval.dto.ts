import { ApiProperty } from "@nestjs/swagger";

export class DistanceIntervalDto {
    @ApiProperty()
    distanceFromKm: number;
  
    @ApiProperty()
    distanceToKm: number;
  
    @ApiProperty()
    pricePerKm: number;
  }