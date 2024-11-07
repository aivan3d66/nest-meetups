import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { meetupsProviders } from './meetups.providers';

@Module({
  controllers: [MeetupsController],
  exports: [MeetupsService],
  providers: [MeetupsService, ...meetupsProviders],
})
export class MeetupsModule {}
