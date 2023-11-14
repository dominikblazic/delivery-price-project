import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;
}