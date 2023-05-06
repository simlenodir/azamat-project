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
} from '@nestjs/common';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
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
import { TokenMiddleware } from 'src/middleware/middleware.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { upload } from 'src/utils/upload';
// import { upload } from '';

@Controller('info')
@ApiTags('SubCategoriesInfo')
export class InfoController {
  constructor(
    private readonly infoService: InfoService,
    private readonly verifyAdmin: TokenMiddleware,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'sub_id', 'image', 'description'],
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
          default: 'The times xabar beradi',
        },
        sub_id: {
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
  async createNews(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CreateInfoDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    console.log(image);

    if (adminId) {
      return await this.infoService.create(dto, image.originalname);
    }
  }

  @Get('list')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async findAll(@Query('ofset') ofset: number, @Query('limit') limit: number) {
    return this.infoService.findAll(ofset, limit);
  }

  @Get('info/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id') id: string) {
    return this.infoService.findOne(id);
  }

  @Patch('update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Ronaldo futbol qiroli',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
          default: 'The times xabar beradi',
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
  async updateNews(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateInfoDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    if (adminId) {
      if (file) {
        return await this.infoService.update(
          id,
          dto,
          file.originalname,
        );
      } else {
        return await this.infoService.update(id, dto, false);
      }
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(id);
  }
}
