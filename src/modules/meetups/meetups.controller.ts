import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  UsePipes,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { RolesGuard } from '../../core/guards/roles.guard';
import { JoiMeetupValidationPipe } from '../../core/validation/meetup-validation.pipe';
import { meetupSchema } from './dto/meetup.dto';
// import { Roles } from '../../core/decorators/roles.decorator';

@Controller('meetups')
@UseGuards(RolesGuard)
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Post()
  // @Roles('admin')
  @UsePipes(new JoiMeetupValidationPipe(meetupSchema))
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupsService.create(createMeetupDto);
  }

  @Get()
  findAll() {
    return this.meetupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupsService.findOne(id);
  }

  @Put()
  // @Roles('admin')
  update(@Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupsService.update(updateMeetupDto);
  }

  @Delete(':id')
  // @Roles('admin')
  remove(@Param('id') id: string) {
    return this.meetupsService.remove(id);
  }
}
