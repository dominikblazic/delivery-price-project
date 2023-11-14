import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type User = any;

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,
    ) {}

    private readonly users = [
      {
        userId: 1,
        username: this.configService.get<string>('admin.username'),
        password: this.configService.get<string>('admin.password'),
      },
    ];
  
    async findOne(username: string): Promise<User | undefined> {
      return this.users.find(user => user.username === username);
    }
}
