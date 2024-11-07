import { Meetup } from './entities/meetup.entity';
import { MEETUP_REPOSITORY } from '../../constants';

export const meetupsProviders = [
  {
    provide: MEETUP_REPOSITORY,
    useValue: Meetup,
  },
];
