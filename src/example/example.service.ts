import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './entities/example.entitiy';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example) // TypeORM에서 Example 엔티티를 주입받습니다.
    private exampleRepo: Repository<Example>, // ExampleRepository를 주입받습니다.
  ) {}

  async createDummy(): Promise<Example> {
    const example = this.exampleRepo.create({
      username: 'test',
      age: 20,
    });

    return this.exampleRepo.save(example); // 엔티티를 저장합니다.
  }
}
