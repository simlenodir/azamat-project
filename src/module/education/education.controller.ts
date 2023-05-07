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
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
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

@Controller('education')
@ApiTags('Education')
export class EducationController {
  constructor(
    private readonly educationService: EducationService,
    private readonly verifyAdmin: TokenMiddleware,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'file', 'sub_id', 'description'],
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        },
        description: {
          type: 'string',
          default: 'Ronaldo futbol qiroli va nimadirlar dib yozish kere',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
        sub_id: {
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
  async createEducation(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateEducationDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      return this.educationService.create(body, file.originalname);
    }
  }

  @Get('/list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(id);
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
        description: {
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
    @Body() body: UpdateEducationDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId && file) {
      return this.educationService.update(id, body, file.originalname);
    }
    return this.educationService.update(id, body, undefined);

  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educationService.remove(id);
  }
}
