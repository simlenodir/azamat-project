import { HttpException, HttpStatus } from '@nestjs/common';
import jwt from 'src/utils/jwt';

export class TokenMiddleware {
  async verify(headers: any) {
    if (!headers.autharization) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    const admin = jwt.verify(headers.autharization);

    if (!admin) {
      throw new HttpException('Bad Request in Token', HttpStatus.BAD_REQUEST);
    }
    return admin;
  }
}
