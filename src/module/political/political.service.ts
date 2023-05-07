import { Injectable } from '@nestjs/common';
import { CreatePoliticalDto } from './dto/create-political.dto';
import { UpdatePoliticalDto } from './dto/update-political.dto';

@Injectable()
export class PoliticalService {
  create(createPoliticalDto: CreatePoliticalDto) {
    return 'This action adds a new political';
  }

  findAll() {
    return `This action returns all political`;
  }

  findOne(id: number) {
    return `This action returns a #${id} political`;
  }

  update(id: number, updatePoliticalDto: UpdatePoliticalDto) {
    return `This action updates a #${id} political`;
  }

  remove(id: number) {
    return `This action removes a #${id} political`;
  }
}
