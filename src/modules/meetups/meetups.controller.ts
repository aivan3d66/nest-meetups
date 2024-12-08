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
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { JoiMeetupValidationPipe } from '../../core/validation/meetup-validation.pipe';
import { meetupSchema, SearchMeetParams } from './dto/meetup.dto';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../constants';
import { RolesGuard } from '../../core/guards/roles.guard';
@Controller('meetups')
@UseGuards(AuthGuard)
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @Post()
  @ApiExcludeEndpoint()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UsePipes(new JoiMeetupValidationPipe(meetupSchema))
  create(@Body() createMeetupDto: CreateMeetupDto) {
    return this.meetupsService.create(createMeetupDto);
  }
  @Get()
  @ApiExcludeEndpoint()
  findAll(@Body() searchMeetParams: SearchMeetParams) {
    return this.meetupsService.findAll(searchMeetParams);
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.meetupsService.findOne(id);
  }

  @Put()
  @ApiExcludeEndpoint()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  update(@Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupsService.update(updateMeetupDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.meetupsService.remove(id);
  }
}
