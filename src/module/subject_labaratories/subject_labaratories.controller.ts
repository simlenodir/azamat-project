import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectLabaratoriesService } from './subject_labaratories.service';
import { CreateSubjectLabaratoryDto } from './dto/create-subject_labaratory.dto';
import { UpdateSubjectLabaratoryDto } from './dto/update-subject_labaratory.dto';

@Controller('subject-labaratories')
export class SubjectLabaratoriesController {
  constructor(private readonly subjectLabaratoriesService: SubjectLabaratoriesService) {}

  @Post()
  create(@Body() createSubjectLabaratoryDto: CreateSubjectLabaratoryDto) {
    return this.subjectLabaratoriesService.create(createSubjectLabaratoryDto);
  }

  @Get()
  findAll() {
    return this.subjectLabaratoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectLabaratoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectLabaratoryDto: UpdateSubjectLabaratoryDto) {
    return this.subjectLabaratoriesService.update(+id, updateSubjectLabaratoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectLabaratoriesService.remove(+id);
  }
}
