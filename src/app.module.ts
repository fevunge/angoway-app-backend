import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { RoutesModule } from './routes/routes.module';
import { StopesModule } from './stopes/stopes.module';
import { DriverModule } from './driver/driver.module';
import { TimeslotModule } from './timeslot/timeslot.module';


@Module({
  imports: [AuthModule, UserModule,DatabaseModule, RoutesModule, StopesModule, DriverModule, TimeslotModule]
})
export class AppModule {}
