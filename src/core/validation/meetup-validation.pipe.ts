import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { CreateMeetupDto } from '../../modules/meetups/dto/create-meetup.dto';

@Injectable()
export class JoiMeetupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: CreateMeetupDto, metadata: ArgumentMetadata) {
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
