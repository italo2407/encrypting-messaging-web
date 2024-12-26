import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get('search')
  search(@Query('q') search: string) {
    if (!search) {
      return [];
    }
    return this.userService.findContainEmail(search);
  }
}
