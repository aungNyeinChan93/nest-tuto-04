/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async register(registerDto: RegisterDto) {
    const user = this.UserRepo.create({
      ...registerDto,
      created_at: new Date(),
    });
    return this.UserRepo.save(user);
  }
}
