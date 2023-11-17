import { ApiProperty } from '@nestjs/swagger';
import { DistanceIntervalDto } from './distance-interval.dto';

export class CalculatorDto {
    @ApiProperty()
    basePrice: number;

    @ApiProperty()
    additionalPackagePrice: number;

    @ApiProperty({ type: [DistanceIntervalDto] })
    distanceIntervals: DistanceIntervalDto[];
}