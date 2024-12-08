import { Module } from '@nestjs/common';
import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { meetupsProviders } from './meetups.providers';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [MeetupsController],
  exports: [MeetupsService],
  providers: [MeetupsService, ...meetupsProviders],
})
export class MeetupsModule {}
