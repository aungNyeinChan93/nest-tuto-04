/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */


import { LoginDto } from './dto/login.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private UserRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.UserRepo.findOne({
            where: { email: registerDto?.email },
        });
        if (existingUser) throw new ConflictException('Email is already used');

        const hashPassword = await this.hashPassword(registerDto.password);
        const newUser = this.UserRepo.create({
            ...registerDto,
            password: hashPassword,
            created_at: new Date(),
        });
        const saveUser = await this.UserRepo.save(newUser);
        const { password, ...result } = saveUser;
        return { user: result, password };
    }


    async login(loginDto: LoginDto) {
        const user = await this.UserRepo.findOne({ where: { email: loginDto?.email } })
        if (!user || !(await this.comparePassword(loginDto?.password, user?.password))) {
            throw new UnauthorizedException('this user can not auth!')
        };

        const { accessToken, refreshToken } = await this.generateToken(user);
        const { password, ...result } = user;
        return {
            user: result,
            accessToken,
            refreshToken,
            password
        }
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt?.hash(password, await bcrypt.genSalt(10));
    }

    async comparePassword(
        plainPassword: string,
        hashPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashPassword);
    }

    async generateToken(user: User) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user)
        };
    }

    private generateAccessToken(user: User): string {
        const payload = {
            email: user?.email,
            sub: user?.id,
            role: user?.role
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: 'JWT_SECRET',
            expiresIn: '15m'
        })
        return accessToken;
    }

    private generateRefreshToken(user: User): string {
        const payload = {
            sub: user?.id,
        };
        const refreshToken = this.jwtService.sign(payload, {
            secret: 'JWT_SECRET',
            expiresIn: '7d'
        })
        return refreshToken;
    }
}


