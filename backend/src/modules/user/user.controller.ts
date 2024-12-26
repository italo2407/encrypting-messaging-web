import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequest } from './request/user.request';
import { User } from 'src/domain/entities/user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: UserRequest) {
    const userEntity = new User(user);

    return this.userService.create(userEntity);
  }

  @Get()
  get() {
    //const userEntity = new User(user);

    return this.userService.findAll();
  }
}
