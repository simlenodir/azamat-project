import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminInfoService } from './admin_info.service';
import { CreateAdminInfoDto } from './dto/create-admin_info.dto';
import { UpdateAdminInfoDto } from './dto/update-admin_info.dto';

@Controller('admin-info')
export class AdminInfoController {
  constructor(private readonly adminInfoService: AdminInfoService) {}

  @Post()
  create(@Body() createAdminInfoDto: CreateAdminInfoDto) {
    return this.adminInfoService.create(createAdminInfoDto);
  }

  @Get()
  findAll() {
    return this.adminInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminInfoDto: UpdateAdminInfoDto) {
    return this.adminInfoService.update(+id, updateAdminInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminInfoService.remove(+id);
  }
}
