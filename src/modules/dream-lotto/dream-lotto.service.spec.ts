import { Test, TestingModule } from '@nestjs/testing';
import { DreamLottoService } from './dream-lotto.service';

describe('DreamLottoService', () => {
  let service: DreamLottoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DreamLottoService],
    }).compile();

    service = module.get<DreamLottoService>(DreamLottoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
