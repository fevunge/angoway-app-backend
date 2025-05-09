import { Test, TestingModule } from '@nestjs/testing';
import { TimeslotService } from './timeslot.service';

describe('TimeslotService', () => {
  let service: TimeslotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeslotService],
    }).compile();

    service = module.get<TimeslotService>(TimeslotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
