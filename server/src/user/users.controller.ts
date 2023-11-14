import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
