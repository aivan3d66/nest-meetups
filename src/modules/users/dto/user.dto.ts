import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export const userSchema = Joi.object().keys({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().max(40).required(),
  password: Joi.string().min(8).max(10).required(),
  roles: Joi.array().items(Joi.string().required(), Joi.string()).required(),
});

export class UserDto {
  @ApiProperty({
    description: 'User unique name',
    default: 'grzheshko_borodzich',
    type: String,
  })
  readonly username: string;
  @ApiProperty({
    description: 'User email',
    default: 'grzheshko_borodzich@gmail.com',
    type: String,
  })
  readonly email: string;
  @ApiProperty({
    description: 'User password',
    default: '111111',
    type: String,
  })
  readonly password: string;
  @ApiProperty({
    description: 'User refresh_token',
    default: null,
    type: String,
  })
  readonly refresh_token: string | null;
  @ApiProperty({
    description: 'User access groups',
    default: ['user'],
    enum: ['admin', 'user'],
  })
  readonly roles: string[];
}
