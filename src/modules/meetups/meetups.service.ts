import { Inject, Injectable } from '@nestjs/common';
import { MEETUP_REPOSITORY } from '../../constants';
import { Meetup } from './entities/meetup.entity';
import { MeetupDto, SearchMeetParams } from './dto/meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { Op } from 'sequelize';

@Injectable()
export class MeetupsService {
  constructor(
    @Inject(MEETUP_REPOSITORY)
    private readonly meetupRepository: typeof Meetup,
  ) {}

  async create(meetup: Partial<MeetupDto>) {
    return this.meetupRepository.create(meetup);
  }

  async findAll(searchMeetParams: SearchMeetParams) {
    const { searchString, sort, tagFilter, page, perPage } = searchMeetParams;

    if (searchString) {
      const str = `${searchString}%`;

      return this.meetupRepository.findAll({
        where: { title: { [Op.substring]: str } },
      });
    } else if (sort === 'date-asc') {
      return this.meetupRepository.findAll({
        order: [['date_time', 'ASC']],
      });
    } else if (sort === 'date-desc') {
      return this.meetupRepository.findAll({
        order: [['date_time', 'DESC']],
      });
    } else if (tagFilter) {
      const str = `%${tagFilter}%`;

      return this.meetupRepository.findAll({
        where: { tags: { [Op.substring]: str } },
      });
    } else if (perPage && (page || page === 0)) {
      return this.meetupRepository.findAll({
        limit: perPage,
        offset: page === 0 ? page : page * 2,
      });
    } else {
      return this.meetupRepository.findAll();
    }
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
