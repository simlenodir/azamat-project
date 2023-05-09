import { Controller, Post, Body } from '@nestjs/common';
import {
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common/enums';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { log } from 'console';
import { CreateAdminDto } from './dto/register-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { TokenMiddleware } from 'src/middleware/middleware.service';
import { upload } from 'src/utils/upload';

@Controller('auth')
@ApiTags('Admin Auth')
export class AuthController {
  constructor(
    private readonly usersService: AuthService,
    private readonly verifyAdmin: TokenMiddleware,
  ) {}

  @Post('/register')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async adminRegister(@Body() body: CreateAdminDto) {
    return await this.usersService.admin_register(body);
  }

  @Post('/login')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() body: CreateAuthDto) {
    return await this.usersService.admin_login(body);
  }

  @Get('/login/email/:id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async adminLoginEmail(@Param('id') params: string) {
    return await this.usersService.admin_login_email(params);
  }

  @Patch('admin')
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
        email: {
          type: 'string',
          default: 'nodirsmailov0@gmail.com',
        },
        password: {
          type: 'string',
          default: '1q2w3e',
        },
        telegram: {
          type: 'string',
          default: 'nodirsmailov0@gmail.com',
        },
        instagram: {
          type: 'string',
          default: 'nodirsmailov0@gmail.com',
        },
        facebook: {
          type: 'string',
          default: 'nodirsmailov0@gmail.com',
        },
        youtube: {
          type: 'string',
          default: 'nodirsmailov0@gmail.com',
        },
        isActive: {
          type: 'boolean',
          default: true,
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
    description: 'Admin id',
    required: true,
  })
  @UseInterceptors(FileInterceptor('image', upload))
  async update(
    // @Param('email') email: string,
    @Body() body: UpdateAdminDto,
    @UploadedFile() file: Express.Multer.File,
    @Headers() header: any,
  ) {
    const adminId = await this.verifyAdmin.verify(header);
    const email = adminId.email
    console.log(email);
    
    if (adminId && file) {
      return this.usersService.update(email, body, file.originalname);
    }
    return this.usersService.update(email, body, undefined);
  }
}
