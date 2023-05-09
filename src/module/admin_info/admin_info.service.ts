import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminInfoDto } from './dto/create-admin_info.dto';
import { UpdateAdminInfoDto } from './dto/update-admin_info.dto';
import { AdminInfo } from 'src/entities/admin_info.entity';
import { Admin } from 'typeorm';

@Injectable()
export class AdminInfoService {
  async oneAdminInfo (id: string): Promise<AdminInfo>{
    const foundAdminInfo = await AdminInfo.findOne({
      where: {id}
    })
    if (!foundAdminInfo) {
      throw new HttpException(
        'Admin Info not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return foundAdminInfo
  }

  async create(dto: CreateAdminInfoDto, file: string): Promise<void> {
    await AdminInfo.createQueryBuilder()
      .insert()
      .into(AdminInfo)
      .values({
        description: dto.description,
        title: dto.title,
        img: file,
      })
      .execute();
  }

  async findAll(): Promise<AdminInfo[]> {
    return AdminInfo.find().catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async findOne(id: string): Promise<AdminInfo> {
    return await this.oneAdminInfo(id)
  }

  async update(id: string, dto: UpdateAdminInfoDto, file: string): Promise<void> {
    const foundInfo = await this.oneAdminInfo(id)

    await AdminInfo.createQueryBuilder()
    .update(AdminInfo)
    .set({
      title: dto.title,
      description: dto.description,
      img: file
    })
    .where({id})
    .execute()
    .catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async remove(id: string): Promise<void> {
    await this.oneAdminInfo(id)
    await AdminInfo.delete(id)
  }
}
