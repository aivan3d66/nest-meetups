import { JoiUserValidationPipe } from './user-validation.pipe';
import { userSchema } from '../../modules/users/dto/user.dto';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new JoiUserValidationPipe(userSchema)).toBeDefined();
  });
});
