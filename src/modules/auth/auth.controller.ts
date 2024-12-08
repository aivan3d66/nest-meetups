import {
  Controller,
  Body,
  Post,
  UseGuards,
  UsePipes,
  Get,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto, userSchema } from '../users/dto/user.dto';
import { JoiUserValidationPipe } from '../../core/validation/user-validation.pipe';
import { AccessTokenGuard } from '../../core/guards/access-token.guard';
import { RefreshTokenGuard } from '../../core/guards/refresh-token.guard';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.signIn(authDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub']);
  }

  @Post('signup')
  @UsePipes(new JoiUserValidationPipe(userSchema))
  async signUp(@Body() user: UserDto) {
    return await this.authService.signUp(user);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const id = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens({ id, refreshToken });
  }
}
