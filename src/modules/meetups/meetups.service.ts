import { Inject, Injectable } from '@nestjs/common';
import { MEETUP_REPOSITORY } from '../../constants';
import { Meetup } from './entities/meetup.entity';
import { MeetupDto } from './dto/meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject(MEETUP_REPOSITORY)
    private readonly meetupRepository: typeof Meetup,
  ) {}

  async create(meetup: Partial<MeetupDto>) {
    return this.meetupRepository.create(meetup);
  }

  async findAll() {
    return this.meetupRepository.findAll();
  }

  async findOne(id: string) {
    return this.meetupRepository.findOne({
      where: { id },
    });
  }

  async update(meetup: UpdateMeetupDto) {
    return this.meetupRepository.update(meetup, {
      where: { id: meetup.id },
      returning: true,
    });
  }

  async remove(id: string): Promise<void> {
    const meetup = await this.findOne(id);
    await meetup.destroy();
  }
}
