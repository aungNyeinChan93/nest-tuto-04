/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { type User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
    test(): string {
        return ' tests ... ';
    }
    create(user: User) {
        return user;
    }
}
