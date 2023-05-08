import { Injectable } from '@nestjs/common';
import { CreateAdminInfoDto } from './dto/create-admin_info.dto';
import { UpdateAdminInfoDto } from './dto/update-admin_info.dto';

@Injectable()
export class AdminInfoService {
  create(createAdminInfoDto: CreateAdminInfoDto) {
    return 'This action adds a new adminInfo';
  }

  findAll() {
    return `This action returns all adminInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminInfo`;
  }

  update(id: number, updateAdminInfoDto: UpdateAdminInfoDto) {
    return `This action updates a #${id} adminInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminInfo`;
  }
}
