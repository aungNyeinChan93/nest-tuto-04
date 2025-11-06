/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

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

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt?.hash(password, await bcrypt.genSalt(10));
  }

  private async comparePassword(
    plainPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashPassword);
  }
}
