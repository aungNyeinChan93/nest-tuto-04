/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.UserRepo.create({
      ...createUserDto,
      created_at: new Date(),
    });
    return this.UserRepo.save(user);
  }

  findAll() {
    return this.UserRepo.find();
  }

  async findOne(id: number) {
    const users = await this.UserRepo.find();
    const user = users?.find(u => u.id == id);
    if (!user) throw new NotFoundException('user is not found!')
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changeRole(id: number, role: UserRole) {
    const result = await this.UserRepo.update(id, { role });
    if (result.affected === 0) throw new NotFoundException('user not found!');
    return await this.findOne(id);
  }
}
