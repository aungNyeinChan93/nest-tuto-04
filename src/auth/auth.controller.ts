/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body(ValidationPipe) registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }
}
