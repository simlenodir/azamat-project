import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
import { CreateNewsDto } from './dto/create-news.dto';
import { upload } from 'src/utils/upload';
import { NewsServise } from './news.service';
import { UpdateNewsDto } from './dto/update-news.dto';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Controller('news')
@ApiTags('News')
export class NewsController {
  readonly #_servise: NewsServise;

  constructor(
    service: NewsServise,
    private readonly veridfyToken: TokenMiddleware,
  ) {
    this.#_servise = service;
  }

  @Get('')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async getNews(@Query('ofset') ofset: number, @Query('limit') limit: number) {
    return this.#_servise.news(ofset, limit);
  }

  @Get('/:id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async getOne(@Param('id') id: string) {
    return this.#_servise.one(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'file', 'description'],
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
  async createNews(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNewsDto: CreateNewsDto,
    @Headers() header: any,
  ) {
    const adminId = await this.veridfyToken.verify(header);
    if (adminId) {
      return await this.#_servise.create(createNewsDto, file.originalname);
    }
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
    @Body() updateNewsDto: UpdateNewsDto,
    @Headers() header: any,
  ) {
    const adminId = await this.veridfyToken.verify(header);
    if (adminId) {
      if (file) {
        return await this.#_servise.update(
          id,
          updateNewsDto,
          file.originalname,
        );
      } else {
        return await this.#_servise.update(id, updateNewsDto, false);
      }
    }
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Autharization',
    required: true,
  })
  async deleleNews(@Param('id') id: string, @Headers() header: any) {
    const adminId = await this.veridfyToken.verify(header);
    if (adminId) {
      return this.#_servise.delete(id);
    }
  }
}
