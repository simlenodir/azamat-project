import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubjectAdditionalService } from './subject_additional.service';
import { CreateSubjectAdditionalDto } from './dto/create-subject_additional.dto';
import { UpdateSubjectAdditionalDto } from './dto/update-subject_additional.dto';

@Controller('subject-additional')
export class SubjectAdditionalController {
  constructor(private readonly subjectAdditionalService: SubjectAdditionalService) {}

  @Post()
  create(@Body() createSubjectAdditionalDto: CreateSubjectAdditionalDto) {
    return this.subjectAdditionalService.create(createSubjectAdditionalDto);
  }

  @Get()
  findAll() {
    return this.subjectAdditionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectAdditionalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectAdditionalDto: UpdateSubjectAdditionalDto) {
    return this.subjectAdditionalService.update(+id, updateSubjectAdditionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectAdditionalService.remove(+id);
  }
}
