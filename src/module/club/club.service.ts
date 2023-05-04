// import { LigaEntity } from './../../entities/liga.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClubDto } from './dto/create-workbook_open.dto';
// import { ClubsEntity } from 'src/entities/clubs.entity';
import { UpdateClubDto } from './dto/update-workbook_open.dto';

@Injectable()
export class ClubService {
  async create(payload: CreateClubDto, file: any): Promise<void> {
    // const findClub: any = await LigaEntity.findOneBy({
    //   id: payload.liga_id,
    // }).catch(() => {
    //   throw new HttpException('Club Not Found', HttpStatus.NOT_FOUND);
    // });
    // if (!findClub) {
    //   throw new HttpException('Club Not Found', HttpStatus.NOT_FOUND);
    // }

    // await ClubsEntity.createQueryBuilder()
    //   .insert()
    //   .into(ClubsEntity)
    //   .values({
    //     title: payload.title,
    //     logo: file,
    //     liga_id: findClub,
    //   })
    //   .execute()
    //   .catch((): unknown => {
    //     throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    //   });
  }

  async reyting(liga: string) {
    // const { clubs } = await LigaEntity.findOne({
    //   relations: {
    //     clubs: true,
    //   },
    //   order: {
    //     clubs: {
    //       point: 'DESC',
    //       goals: 'DESC',
    //     },
    //   },
    //   where: {
    //     id: liga,
    //   },
    // }).catch(() => {
    //   throw new HttpException('Liga Not Found', HttpStatus.NOT_FOUND);
    // });
    // if (!clubs) {
    //   throw new HttpException('Liga Not Found', HttpStatus.NOT_FOUND);
    // }

    // console.log(clubs)
    // const filterLiga = clubs.sort((a, b) => b.point - a.point);
    // const returnLiga = [];

    // for (let i = 0; i < filterLiga.length; i++) {
    //   for (let j = 0; j < filterLiga.length; j++) {
    //     if (filterLiga[i].point === filterLiga[j].point) {
    //       if (filterLiga[i].goals > filterLiga[j].goals) {
    //         returnLiga.push(filterLiga[i]);
    //       } else {
    //         if (!returnLiga.find((e) => e.id === filterLiga[i].id)) {
    //           returnLiga.push(filterLiga[i]);
    //         }
    //       }
    //     } else {
    //       if (!returnLiga.find((e) => e.id === filterLiga[i].id)) {
    //         returnLiga.push(filterLiga[i]);
    //       }
    //     }
    //   }
    // }

    // return returnLiga;
  }

  async update(
    id: string,
    payload: UpdateClubDto,
    file: string | boolean,
  ): Promise<void> {
    // if (payload?.liga_id) {
    //   const findClub = await LigaEntity.findOneBy({
    //     id: payload.liga_id,
    //   }).catch(() => {
    //     throw new HttpException('L Not Found', HttpStatus.NOT_FOUND);
    //   });
    //   if (!findClub) {
    //     throw new HttpException('Club Not Found', HttpStatus.NOT_FOUND);
    //   }
    // }

    // const findWorkbook: any = await ClubsEntity.findOneBy({
    //   id: id,
    // }).catch(() => {
    //   throw new HttpException('Workbook Not Found', HttpStatus.NOT_FOUND);
    // });
    // if (!findWorkbook) {
    //   throw new HttpException('Workbook Not Found', HttpStatus.NOT_FOUND);
    // }

    // await ClubsEntity.createQueryBuilder()
    //   .update(ClubsEntity)
    //   .set({
    //     liga_id: payload.liga_id || findWorkbook.liga_id,
    //     title: payload.title || findWorkbook.title,
    //     point: payload.point || findWorkbook.point,
    //     goals: payload.goals || findWorkbook.goals,
    //     logo: file || findWorkbook.logo,
    //   })
    //   .where({ id: id })
    //   .execute();
  }

  async delete(id: string) {
    // const findWorkbook: any = await ClubsEntity.findOneBy({
    //   id: id,
    // }).catch(() => {
    //   throw new HttpException('Club Not Found', HttpStatus.NOT_FOUND);
    // });
    // if (!findWorkbook) {
    //   throw new HttpException('Club Not Found', HttpStatus.NOT_FOUND);
    // }

    // await ClubsEntity.createQueryBuilder()
    //   .delete()
    //   .from(ClubsEntity)
    //   .where({ id: id })
    //   .execute();
  }
}
