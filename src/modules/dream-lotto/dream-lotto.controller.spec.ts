import { Test, TestingModule } from '@nestjs/testing';
import { DreamLottoController } from './dream-lotto.controller';
import { DreamLottoService } from './dream-lotto.service';

describe('DreamLottoController', () => {
  let controller: DreamLottoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DreamLottoController],
      providers: [DreamLottoService],
    }).compile();

    controller = module.get<DreamLottoController>(DreamLottoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
