/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Scope } from '@nestjs/common';
import { UsersService } from './users.service';
import { type User } from './interfaces/users.interface';

@Controller({ path: 'users', scope: Scope.DEFAULT })
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('test')
    test() {
        return this.usersService.test();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() user: User) {
        return this.usersService.create(user);
    }


}

