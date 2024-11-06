import * as Joi from 'joi';

export const userSchema = Joi.object().keys({
  username: Joi.string().min(4).max(20).required(),
  email: Joi.string().email().max(40).required(),
  password: Joi.string().min(8).max(10).required(),
  roles: Joi.array().items(Joi.string().required(), Joi.string()).required(),
});

export class UserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string[];
}
