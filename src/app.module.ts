import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        synchronize: configService.get('database.synchronize'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
