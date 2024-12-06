import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserDto, userSchema } from '../users/dto/user.dto';
import { JoiUserValidationPipe } from '../../core/validation/user-validation.pipe';
import { UserExist } from '../../core/guards/user-exist.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(UserExist)
  @Post('signup')
  @UsePipes(new JoiUserValidationPipe(userSchema))
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
