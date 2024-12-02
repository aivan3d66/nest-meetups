import * as Joi from 'joi';

const defaultRequiredString = Joi.string().min(4).max(100).required();

export const meetupSchema = Joi.object().keys({
  title: Joi.string().min(10).max(500).required(),
  description: Joi.string().min(100).max(3000).required(),
  tags: defaultRequiredString,
  date_time: defaultRequiredString,
  location: defaultRequiredString,
  user_id: Joi.string().required(),
});

export class MeetupDto {
  readonly title: string;
  readonly description: string;
  readonly tags: string;
  readonly date_time: string;
  readonly location: string;
  readonly user_id: string;
}
