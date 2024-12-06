import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role, ROLES_GUARD_KEY } from '../../constants';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UsersService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const roles = this.reflector.get<string[]>(
    //   ROLES_GUARD_KEY,
    //   context.getHandler(),
    // );

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_GUARD_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user_id = request.get('user_id');

    return this.validateRequest(user_id, requiredRoles);
  }

  async validateRequest(user_id, roles) {
    const userFromDb = await this.userService.findOne(user_id);
    console.log('userFromDb', userFromDb);
    return roles.some((role) => userFromDb.roles.includes(role));
  }
}
