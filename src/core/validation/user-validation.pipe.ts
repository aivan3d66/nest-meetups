import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';

@Injectable()
export class JoiUserValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { error } = this.schema.validate(value);

      if (error) {
        throw new BadRequestException(
          `Validation error: ${error.details[0].message}`,
        );
      }

      return value;
    }
  }
}
