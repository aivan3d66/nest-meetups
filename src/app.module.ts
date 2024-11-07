import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './core/db/db.module';
import { AuthModule } from './modules/auth/auth.module';
import { MeetupsModule } from './modules/meetups/meetups.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    MeetupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
