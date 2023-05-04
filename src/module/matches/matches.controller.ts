import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Headers,
  HttpStatus,
} from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
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

@Controller('matches')
@ApiTags('Matches')
export class MatchesController {
  constructor(
    private readonly matchesService: MatchesService,
    private readonly verifyToken: TokenMiddleware,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    schema: {
      type: 'object',
      required: ['match_time', 'host_club', 'guess_club', 'result'],
      properties: {
        match_time: {
          type: 'string',
          default: '01.01.2023.22:00',
        },
        host_club: {
          type: 'string',
          default: 'uuid',
        },
        guess_club: {
          type: 'string',
          default: 'uuid',
        },
        result: {
          type: 'string',
          default: '0:0',
        },
      },
    },
  })
  @ApiConsumes('application/json')
  @ApiOperation({ summary: 'Attendance in Punch In' })
  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiHeader({
    name: 'autharization',
    description: 'token',
    required: true,
  })
  create(@Body() createMatchDto: CreateMatchDto, @Headers() header: any) {
    const admin = this.verifyToken.verify(header);
    if (admin) {
      return this.matchesService.create(createMatchDto) as any;
    }
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({
    description: 'Cat object',
    type: CreateMatchDto,
    isArray: true,
  })
  findAll() {
    return this.matchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['match_time', 'host_club', 'guess_club', 'result'],
      properties: {
        match_time: {
          type: 'string',
          default: '01.01.2023.22:00',
        },
        host_club: {
          type: 'string',
          default: 'uuid',
        },
        guess_club: {
          type: 'string',
          default: 'uuid',
        },
        result: {
          type: 'string',
          default: '0:0',
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
  update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto,
    @Headers() header: any,
  ) {
    const admin = this.verifyToken.verify(header);
    if (admin) {
      return this.matchesService.update(id, updateMatchDto);
    }
  }

  @Delete(':id')
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
  remove(@Param('id') id: string, @Headers() header: any) {
    const admin = this.verifyToken.verify(header);
    if (admin) {
      return this.matchesService.remove(id);
    }
  }
}
