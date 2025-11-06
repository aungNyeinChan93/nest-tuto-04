/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Please provide valid email!' })
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
