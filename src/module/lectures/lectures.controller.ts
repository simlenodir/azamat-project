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
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
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

@Controller('lectures')
@ApiTags('Lectures')
export class LecturesController {
  constructor(
    private readonly lecturesService: LecturesService,
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
  async createLecture(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: CreateLectureDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return await this.lecturesService.create(createNewsDto, file.originalname);
    }
  }

  @Get('/list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.lecturesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string) {
    return this.lecturesService.findOne(id);
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
    @Body() body: UpdateLectureDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.lecturesService.update(id, body, file.originalname);
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
      return this.lecturesService.remove(id);
    }
  }
}
