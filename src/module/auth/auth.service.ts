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
      await Admin.createQueryBuilder()
        .insert()
        .into(Admin)
        .values({
          email: body.email,
          password: hash,
        })
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
    console.log(body);

    const password = body.password;
    const foundAdmin = await Admin.findOne({
      where: { email: body.email },
    }).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

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

  async update(id: string, dto: UpdateAdminDto, file: string): Promise<void> {
    const foundAdmin = await Admin.findOne({ where: { id } });
    const foundAdmin1 = await Admin.find();
    await Admin.createQueryBuilder()
      .update(Admin)
      .set({
        email: dto.email || foundAdmin.email,
        password: dto.password || foundAdmin.password,
        telegram: (dto.telegram as any) || foundAdmin.telegram,
        instagram:
          dto.instagram || foundAdmin1[0].facebook || foundAdmin.instagram,
        facebook: dto.facebook || foundAdmin.facebook,
        twitter: dto.twitter || foundAdmin.facebook,
        youtube: dto.youtube || foundAdmin.youtube,
        isActive: dto.isaActive || foundAdmin.isActive,
        image: file,
      })
      .where({ email: dto.email })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
}
