import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto, userSchema } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JoiUserValidationPipe } from '../../core/validation/user-validation.pipe';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiUserValidationPipe(userSchema))
  create(@Body() user: UserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne('id', id);
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
