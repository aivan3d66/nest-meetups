import { Inject, Injectable } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../constants';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto) {
    return this.userRepository.create(user);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findOne(fieldName: 'id' | 'username', value: string) {
    return this.userRepository.findOne({
      where: { [fieldName]: value },
    });
  }

  async update(user: UpdateUserDto) {
    return this.userRepository.update(user, {
      where: { id: user.id },
      returning: true,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne('id', id);
    await user.destroy();
  }
}
