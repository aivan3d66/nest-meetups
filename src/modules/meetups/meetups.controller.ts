import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { JoiMeetupValidationPipe } from '../../core/validation/meetup-validation.pipe';
import { meetupSchema, SearchMeetParams } from './dto/meetup.dto';
import { AuthGuard } from '../../core/guards/auth.guard';

@Controller('meetups')
// @UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Post()
  // @Roles(Role.Admin)
  @UsePipes(new JoiMeetupValidationPipe(meetupSchema))
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupsService.create(createMeetupDto);
  }
  @Get()
  findAll(@Body() searchMeetParams: SearchMeetParams) {
    return this.meetupsService.findAll(searchMeetParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupsService.findOne(id);
  }

  @Put()
  // @Roles(Role.Admin)
  update(@Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupsService.update(updateMeetupDto);
  }

  @Delete(':id')
  // @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.meetupsService.remove(id);
  }
}
