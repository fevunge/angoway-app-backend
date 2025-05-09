import { Injectable } from '@nestjs/common';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';

@Injectable()
export class TimeslotService {
  create(createTimeslotDto: CreateTimeslotDto) {
    return 'This action adds a new timeslot';
  }

  findAll() {
    return `This action returns all timeslot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} timeslot`;
  }

  update(id: number, updateTimeslotDto: UpdateTimeslotDto) {
    return `This action updates a #${id} timeslot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeslot`;
  }
}
