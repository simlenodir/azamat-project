import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { random } from 'src/utils/random';
import senMail from 'src/utils/node_mailer';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import jwt from 'src/utils/jwt';

@Injectable()
export class AuthService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async admin_login(body: CreateAuthDto) {
    const randomSon = random();
    console.log(body.email);
    
    const adminEmail = 'nodirsmailov0@gmail.com';
    if (adminEmail === body.email) {
      await senMail(body.email, randomSon);
    }

    const newObj = {
      email: body.email,
      password: body.password,
      random: randomSon,
    };

    await this.redis.set(randomSon, JSON.stringify(newObj));

    return {
      message: 'Code send Email',
      status: 200,
    };
  }

  async admin_login_email(random: string) {
    const result: any = await this.redis.get(random);
    const redis = JSON.parse(result);

    if (!redis || redis.random != random) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign({
      email: redis.email,
      password: redis.password,
    });

    this.redis.del(random);
    return {
      token,
      status: 200,
    };
  }
}
