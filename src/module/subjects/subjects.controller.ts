import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { TokenMiddleware } from 'src/middleware/middleware.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('subjects')
@ApiTags('Subjects')
export class SubjectsController {
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly verifyAdmin: TokenMiddleware,
  ) {}

  @Post('/create')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'sub_id', 'image', 'description'],
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        }
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get('/list')
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get('subject/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        }
      },
    },
  })
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Autharization',
    required: true,
  })
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete('/delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiCreatedResponse()
  @ApiUnprocessableEntityResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
