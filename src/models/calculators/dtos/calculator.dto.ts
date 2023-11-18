import { ApiProperty } from '@nestjs/swagger';
import { DistanceIntervalDto } from './distance-interval.dto';

export class CalculatorDto {
    @ApiProperty()
    readonly basePrice: number;

    @ApiProperty()
    readonly additionalPackagePrice: number;

    @ApiProperty({ type: [DistanceIntervalDto] })
    readonly distanceIntervals: DistanceIntervalDto[];
}