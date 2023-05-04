import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Delete,
} from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto } from './dto/create-workbook_open.dto';
import { UpdateClubDto } from './dto/update-workbook_open.dto';
import { TokenMiddleware } from 'src/middleware/middleware.service';
import { upload } from 'src/utils/upload';
import { FileInterceptor } from '@nestjs/platform-express';
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

@Controller('club')
@ApiTags('Clubs')
export class ClubController {
  constructor(
    private readonly ClubService: ClubService,
    private readonly veridfyToken: TokenMiddleware,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: 'Real Madrid',
        },
        liga_id: {
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
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @UseInterceptors(FileInterceptor('logo', upload))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateClubDto,
    @Headers() header: any,
  ) {
    const userId = await this.veridfyToken.verify(header);
    if (userId) {
      await this.ClubService.create(body, file.originalname);
    }
  }

  @Get('/reyting/:id')
  @ApiOkResponse()
  async reyting(@Param('id') liga: string) {
    return await this.ClubService.reyting(liga);
  }

  @Patch('/update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        logo: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          default: 'Real Madrid',
        },
        point: {
          type: 'number',
          default: '3',
        },
        goals: {
          type: 'number',
          default: '1',
        },
        liga_id: {
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
  @UseInterceptors(FileInterceptor('logo', upload))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateClubDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    const adminId = await this.veridfyToken.verify(header);
    if (adminId) {
      if (file) {
        await this.ClubService.update(id, body, file.originalname);
      } else {
        await this.ClubService.update(id, body, false);
      }
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
  async delete(@Param('id') id: string, @Headers() header: any) {
    const adminId = await this.veridfyToken.verify(header);
    if (adminId) {
      await this.ClubService.delete(id);
    }
  }
}
