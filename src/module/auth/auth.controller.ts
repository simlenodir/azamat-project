import { Controller, Post, Body } from '@nestjs/common';
import { Get, HttpCode, Param } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { log } from 'console';

@Controller('auth')
@ApiTags('Admin Auth')
export class AuthController {
  constructor(private readonly usersService: AuthService) {}

  @Post('/login')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @HttpCode(HttpStatus.OK)
  async adminLogin(@Body() body: CreateAuthDto) {
    console.log(body);
    return await this.usersService.admin_login(body);
  }

  @Get('/login/email/:id')
  @ApiNotFoundResponse()
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  async adminLoginEmail(@Param('id') params: string) {
    return await this.usersService.admin_login_email(params);
  }
}
