import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './models/users/users.module';
import { ConfigModule} from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CalculatorModule } from './models/calculators/calculator.module';
import { DeliveryModule } from './models/deliveries/delivery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        () => {
          return require(`../config/configuration`).default;
        },
      ],
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    CalculatorModule,
    DeliveryModule,
  ],
})
export class AppModule {}
