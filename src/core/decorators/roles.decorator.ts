import { SetMetadata } from '@nestjs/common';
import { Role, ROLES_GUARD_KEY } from '../../constants';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_GUARD_KEY, roles);
