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
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UsePipes(new JoiUserValidationPipe(userSchema))
  create(@Body() user: UserDto) {
    return this.usersService.create(user);
  }

  @Get()
  @ApiOperation({ summary: 'Find all exist users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: Array<User>,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne('id', id);
  }

  @Put()
  @ApiOperation({ summary: 'Change user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', required: true, description: 'User identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
