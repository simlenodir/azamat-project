import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
// import { Matchs } from 'src/entities/matchs.entity';
// import { LigaEntity } from 'src/entities/liga.entity';

@Injectable()
export class MatchesService {
  async create(body: CreateMatchDto): Promise<void> {
    // const active = body.result !== '0:0' ? true : false;
    // if (!body.result.split(':').map((e) => Number(e))) {
    //   throw new HttpException('Bad Request in Result', HttpStatus.NOT_FOUND);
    // }

    // await Matchs.createQueryBuilder()
    //   .insert()
    //   .into(Matchs)
    //   .values({
    //     match_time: body.match_time,
    //     active: active,
    //     result: body.result,
    //     host_club: body.host_club as any,
    //     guesst_club: body.guess_club as any,
    //   })
    //   .execute()
    //   .catch(() => {
    //     throw new HttpException('Bad Request in catch', HttpStatus.NOT_FOUND);
    //   });
  }

  async findAll(){
    // return await Matchs.find({
    //   relations: { guesst_club: true, host_club: true },
    // }).catch(() => {
    //   throw new HttpException('Internal Server Error', HttpStatus.NOT_FOUND);
    // });
  }

  async findOne(id: string){
    // const findLiga: any = await LigaEntity.findOneBy({ id }).catch(() => {
    //   throw new HttpException('Bad Request in id', HttpStatus.NOT_FOUND);
    // });

    // return await Matchs.find({
    //   relations: {
    //     host_club: true,
    //     guesst_club: true,
    //   },
    //   where: {
    //     host_club: {
    //       liga_id: findLiga,
    //     },
    //   },
    // }).catch(() => {
    //   throw new HttpException('Bad Request in id', HttpStatus.NOT_FOUND);
    // });
  }

  async update(id: string, dto: UpdateMatchDto): Promise<void> {
    // const foundMatch = await Matchs.findOne({ where: { id } });
    // const active = dto.result !== '' ? true : null;

    // if (foundMatch) {
    //   await Matchs.createQueryBuilder()
    //     .update()
    //     .set({
    //       active: active || foundMatch.active,
    //       guesst_club: dto.guess_club || (foundMatch.guesst_club as any),
    //       host_club: dto.host_club || (foundMatch.host_club as any),
    //       result: dto.result || foundMatch.result,
    //       match_time: dto.match_time || foundMatch.match_time,
    //     })
    //     .where({ id })
    //     .execute()
    //     .catch(() => {
    //       throw new HttpException(
    //         'Internal Server Error',
    //         HttpStatus.NOT_FOUND,
    //       );
    //     });
    // }
  }

  async remove(id: string): Promise<void> {
    // const foundMatch = await Matchs.findOne({ where: { id } });
    // if (foundMatch) {
    //   await Matchs.delete(id);
    // } else {
    //   throw new HttpException('Match is not found', HttpStatus.NOT_FOUND);
    // }
  }
}
