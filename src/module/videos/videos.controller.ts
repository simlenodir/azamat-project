import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Headers,
  HttpCode,
  HttpStatus,
  Query,
  Header,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/utils/upload';
import { TokenMiddleware } from 'src/middleware/middleware.service';
import { Videos } from 'src/entities/videos.entity';

@Controller('videos')
@ApiTags('Videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly varifyAdmin: TokenMiddleware,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'subject_id', 'image', 'duration', 'link_video'],
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        },
        duration: {
          type: 'string',
          default: '5:57 min',
        },
        link_video: {
          type: 'string',
          default: '5:57 min',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        subject_id: {
          type: 'string',
          default: 'c4adaf55-feec-4c85-8d34-67c3cd1f2d14',
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
  @UseInterceptors(FileInterceptor('image', upload))
  async create(
    @Body() createVideoDto: CreateVideoDto,
    @Headers() header: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const adminId = await this.varifyAdmin.verify(header);
    if (adminId) {
      return this.videosService.create(createVideoDto, file.originalname);
    }
  }

  @Get('/list')
  @ApiOkResponse()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        },
        duration: {
          type: 'string',
          default: '5:57 min',
        },
        link_video: {
          type: 'string',
          default: '5:57 min',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        subject_id: {
          type: 'string',
          default: 'c4adaf55-feec-4c85-8d34-67c3cd1f2d14',
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
  @UseInterceptors(FileInterceptor('image', upload))
  async update(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: string,
  ) {
    const adminId = await this.varifyAdmin.verify(header);
    if (adminId) {
      return this.videosService.update(id, updateVideoDto, file.originalname );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
