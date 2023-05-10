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
  Headers,
} from '@nestjs/common';
import { SubjectDetailsService } from './subject_details.service';
import { CreateSubjectDetailDto } from './dto/create-subject_detail.dto';
import { UpdateSubjectDetailDto } from './dto/update-subject_detail.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Controller('subject-details')
@ApiTags('Subject Details')
export class SubjectDetailsController {
  constructor(
    private readonly subjectDetailsService: SubjectDetailsService,
    private readonly verifyAdmin: TokenMiddleware,
  ) {}
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'subject_id'],
      properties: {
        title: {
          type: 'string',
          default: 'Real Madrid',
        },
        subject_id: {
          type: 'string',
          default: '8f37580f-9c29-4e7c-ad85-75eee14e6f61',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  async create(@Body() createSubCategoryDto: CreateSubjectDetailDto, @Headers() header:string) {
    const admin = await this.verifyAdmin.verify(header)
    if (admin) {
      return this.subjectDetailsService.create(createSubCategoryDto);
    }
  }

  @Get()
  findAll() {
    return this.subjectDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectDetailsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectDetailDto: UpdateSubjectDetailDto,
  ) {
    return this.subjectDetailsService.update(id, updateSubjectDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectDetailsService.remove(id);
  }
}
