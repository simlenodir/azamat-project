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
import { SubjectLabaratoriesService } from './subject_labaratories.service';
import { CreateSubjectLabaratoryDto } from './dto/create-subject_labaratory.dto';
import { UpdateSubjectLabaratoryDto } from './dto/update-subject_labaratory.dto';
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
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/utils/upload';
@Controller('subject-labaratories')
@ApiTags('Labaratories')
export class SubjectLabaratoriesController {
  constructor(
    private readonly subjectLabaratoriesService: SubjectLabaratoriesService,
    private readonly verifyAdmin: TokenMiddleware,
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
  async createLabaratories(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateSubjectLabaratoryDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.subjectLabaratoriesService.create(body, file.originalname);
    }
  }

  @Get('list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.subjectLabaratoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string){
    return this.subjectLabaratoriesService.findOne(id);
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
    @Body() body: UpdateSubjectLabaratoryDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.subjectLabaratoriesService.update(id, body, file.originalname);
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
      return this.subjectLabaratoriesService.remove(id);
    }
  }
}

