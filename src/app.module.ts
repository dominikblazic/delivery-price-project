import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule} from '@nestjs/config';

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
  ],
})
export class AppModule {}
