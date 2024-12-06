import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user?.password);

    if (!match) {
      return null;
    }

    return user['dataValues'];
  }

  public async login(user) {
    const token = await this.generateToken(user);

    return { user, token };
  }

  public async create(user: UserDto) {
    const pass = await this.hashPassword(user.password);

    const newUser = await this.userService.create({ ...user, password: pass });

    const result = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  private async generateToken(user) {
    return await this.jwtService.signAsync(user);
  }

  private async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }
}
