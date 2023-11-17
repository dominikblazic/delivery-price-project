import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty()
    readonly username: string;

    @ApiProperty()
    readonly password: string;
}