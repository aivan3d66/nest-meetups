import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class UserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.userService.findOne(
      'username',
      request.body.username,
    );

    if (userExist) {
      throw new ForbiddenException(
        `User "${request.body.username}" already exist`,
      );
    }

    return true;
  }
}
