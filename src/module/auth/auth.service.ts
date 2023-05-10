import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { random } from 'src/utils/random';
import senMail from 'src/utils/node_mailer';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import jwt from 'src/utils/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/entities/admin.entity';
import { CreateAdminDto } from './dto/register-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AuthService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async admin_register(body: CreateAdminDto) {
    const randomSon = random();
    const saltOrRounds = 10;

    const adminEmail = body.email;
    const password = body.password;

    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, hash);

    if (adminEmail && password) {
      await senMail(body.email, randomSon);
      const adminId: any = await Admin.createQueryBuilder()
        .insert()
        .into(Admin)
        .values({
          email: body.email,
          password: hash,
        })
        .returning('id')
        .execute()
        .catch(() => {
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
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

  async admin_login(body: CreateAuthDto) {
    const randomSon = random();

    const password = body.password;
    const foundAdmin = await Admin.findOne({
      where: { email: body.email },
    }).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    console.log(foundAdmin.email);
    
    const isMatch = await bcrypt.compare(password, foundAdmin.password);

    const adminEmail = foundAdmin.email;

    if (adminEmail) {
      await senMail(adminEmail, randomSon);

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

  async update(email: string, dto: UpdateAdminDto, file: string): Promise<void> {
    const foundAdmin = await Admin.find()
    const found = foundAdmin[0]
     console.log(dto.email);
     
    await Admin.createQueryBuilder()
      .update(Admin)
      .set({
        email: dto.email || found.email,
        password: dto.password || found.password,
        telegram: dto.telegram  || found.telegram,
        instagram: dto.instagram || found.instagram,
        facebook: dto.facebook || found.facebook,
        twitter: dto.twitter || found.facebook,
        youtube: dto.youtube || found.youtube,
        isActive: dto.isaActive || found.isActive,
        image: file,
      })
      .where({id: found.id})
      .execute()
      .catch(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
