import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { userSchema } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiUserValidationPipe } from '../../core/validation/user-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiUserValidationPipe(userSchema))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
