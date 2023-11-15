import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DistanceInterval } from './distance-interval.entity';

@Entity()
export class Pricing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  basePrice: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  additionalPackagePrice: number;

  @OneToMany(() => DistanceInterval, distanceInterval => distanceInterval.pricing, {
    cascade: true,
    eager: true,
  })
  distanceIntervals: DistanceInterval[];
}