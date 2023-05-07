import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { SubjectAdditionalService } from './subject_additional.service';
import { CreateSubjectAdditionalDto } from './dto/create-subject_additional.dto';
import { UpdateSubjectAdditionalDto } from './dto/update-subject_additional.dto';
import { TokenMiddleware } from 'src/middleware/middleware.service';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/utils/upload';

@Controller('subject-additional')
@ApiTags('Subject Additional')
export class SubjectAdditionalController {
  constructor(
    private readonly subjectAdditionalService: SubjectAdditionalService,
    private readonly verifyAdmin: TokenMiddleware
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'file', 'subject_id'],
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
        subject_id: {
          type: 'string',
          default: '37cd327f-7c54-45e8-b6d4-c67f2f99eec3',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Autharization',
    required: true,
  })
  @UseInterceptors(FileInterceptor('file', upload))
  async createLecture(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: CreateSubjectAdditionalDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.subjectAdditionalService.create(createNewsDto, file.originalname);
    }
  }

  @Get('list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.subjectAdditionalService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string) {
    return this.subjectAdditionalService.findOne(id);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: 'Real Madrid',
        },
        subject_id: {
          type: 'string',
          default: 'uuid',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Attendance Punch In' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('image', upload))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateSubjectAdditionalDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.subjectAdditionalService.update(id, body, file.originalname);
    }
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
  @ApiForbiddenResponse()
  async remove(@Param('id') id: string, @Headers() header: string) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.subjectAdditionalService.remove(id);
    }
  }
}
