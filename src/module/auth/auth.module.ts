import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenMiddleware } from 'src/middleware/middleware.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenMiddleware],
})
export class AuthModule {}
