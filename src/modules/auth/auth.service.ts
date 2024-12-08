import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(createUserDto: UserDto): Promise<any> {
    const userExists = await this.userService.findOne(
      'username',
      createUserDto.username,
    );

    if (userExists) {
      throw new ForbiddenException(
        `User "${createUserDto.username}" already exist`,
      );
    }

    const hashPassword = await this.hashPassword(createUserDto.password);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    const user = newUser['dataValues'];

    const tokens = await this.getTokens(user.id, newUser.username);

    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    return {
      ...user,
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  public async signIn(authDto: AuthDto) {
    const userData = await this.userService.findOne(
      'username',
      authDto.username,
    );
    const user = userData['dataValues'];

    const tokens = await this.getTokens(userData.id, userData.username);

    await this.updateRefreshToken(userData.id, tokens.refreshToken);

    return {
      ...user,
      refresh_token: tokens.refreshToken,
      access_token: tokens.accessToken,
    };
  }

  public async logout(user_id: string) {
    await this.userService.update({ id: user_id, refresh_token: null });

    return { userId: user_id };
  }

  public async refreshTokens(data: { id: string; refreshToken: string }) {
    const user = await this.userService.findOne('id', data.id);

    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await this.jwtService.verify(
      data.refreshToken,
      { secret: process.env.JWT_REFRESH_SECRET },
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.username);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      prevToken: user.refresh_token,
      tokens: tokens,
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.userService.update({ id: userId, refresh_token: refreshToken });
  }

  private async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '15m',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
