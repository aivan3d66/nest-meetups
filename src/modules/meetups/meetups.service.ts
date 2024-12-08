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
    const {
      searchString,
      sort,
      tagFilter,
      page = 0,
      perPage = 10,
    } = searchMeetParams;

    const paginationData = {
      limit: perPage,
      offset: page === 0 ? page : page * 2,
    };

    if (searchString) {
      const str = `${searchString}%`;

      return this.meetupRepository.findAndCountAll({
        where: { title: { [Op.substring]: str } },
        ...paginationData,
      });
    } else if (sort === 'date-asc') {
      return this.meetupRepository.findAndCountAll({
        order: [['date_time', 'ASC']],
        ...paginationData,
      });
    } else if (sort === 'date-desc') {
      return this.meetupRepository.findAndCountAll({
        order: [['date_time', 'DESC']],
        ...paginationData,
      });
    } else if (tagFilter) {
      const str = `%${tagFilter}%`;

      return this.meetupRepository.findAndCountAll({
        where: { ['tags']: { [Op.substring]: str } },
        ...paginationData,
      });
    } else {
      return this.meetupRepository.findAndCountAll({ ...paginationData });
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
