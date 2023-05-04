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
import { MainNewsService } from './main-news.service';
import { CreateMainNewDto } from './dto/create-main-new.dto';
import { UpdateMainNewDto } from './dto/update-main-new.dto';
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
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@ApiTags('Main News')
@Controller('main-news')
export class MainNewsController {
  constructor(
    private readonly mainNewsService: MainNewsService,
    private readonly verifyToken: TokenMiddleware,
  ) {}

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: {
          type: 'string',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  create(
    @Body() createMainNewDto: CreateMainNewDto,
    @Headers() header: string,
  ) {
    const admin = this.verifyToken.verify(header);
    if (admin) {
      return this.mainNewsService.create(createMainNewDto);
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({
    description: 'Cat object',
    type: CreateMainNewDto,
    isArray: true,
  })
  findAll() {
    return this.mainNewsService.findAll();
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          default: 'Node.js',
        },
      },
    },
  })
  @ApiBadRequestResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @ApiNoContentResponse()
  update(@Param('id') id: string, @Body() updateMainNewDto: UpdateMainNewDto) {
    return this.mainNewsService.update(id, updateMainNewDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  @ApiForbiddenResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'Admin token',
    required: true,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainNewsService.remove(id);
  }
}
