import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV || 'default';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [
        () => {
          return require(`../config/${environment}`).default;
        },
      ],
    }),
    // TypeOrmModule.forRoot({...require(`../config/${process.env.NODE_ENV || 'default'}`),}),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
