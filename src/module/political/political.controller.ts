import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoliticalService } from './political.service';
import { CreatePoliticalDto } from './dto/create-political.dto';
import { UpdatePoliticalDto } from './dto/update-political.dto';

@Controller('political')
export class PoliticalController {
  constructor(private readonly politicalService: PoliticalService) {}

  @Post()
  create(@Body() createPoliticalDto: CreatePoliticalDto) {
    return this.politicalService.create(createPoliticalDto);
  }

  @Get()
  findAll() {
    return this.politicalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.politicalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoliticalDto: UpdatePoliticalDto) {
    return this.politicalService.update(+id, updatePoliticalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.politicalService.remove(+id);
  }
}
