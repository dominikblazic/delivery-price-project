import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Pricing } from './calculator.entity';

@Entity()
export class DistanceInterval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  distanceFromKm: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  distanceToKm: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  pricePerKm: number;

  @ManyToOne(() => Pricing, pricing => pricing.distanceIntervals)
  pricing: Pricing;
}