import { Module } from '@nestjs/common';
import { TimeslotService } from './timeslot.service';
import { TimeslotController } from './timeslot.controller';

@Module({
  controllers: [TimeslotController],
  providers: [TimeslotService],
})
export class TimeslotModule {}
