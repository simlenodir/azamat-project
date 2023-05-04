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
        Image: {
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
  @UseInterceptors(FileInterceptor('file', upload))
  async createNews(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateInfoDto,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    console.log(file);
    
    if (adminId) {
      return await this.infoService.create(dto, file.originalname);
    }
  }

  @Get()
  findAll() {
    return this.infoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(+id, updateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infoService.remove(+id);
  }
}
