import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Videos } from 'src/entities/videos.entity';

@Injectable()
export class VideosService {
  async foundVideo(id: string): Promise<Videos> {
    const oneVideo = await Videos.findOne({
      where: { id },
    });
    if (!oneVideo) {
      throw new HttpException('Video is not found', HttpStatus.NOT_FOUND);
    }
    return oneVideo;
  }

  async create(dto: CreateVideoDto, file: string): Promise<void> {
    await Videos.createQueryBuilder()
      .insert()
      .into(Videos)
      .values({
        duration: dto.duration,
        img: file,
        subject_id: dto.subject_id as any,
        title: dto.title,
        link: dto.link_video,
      })
      .execute()
      .catch((): unknown => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async findAll(): Promise<Videos[]> {
    return await Videos.find();
  }

  async findOne(id: string): Promise<Videos> {
    return await this.foundVideo(id);
  }

  async update(id: string, dto: UpdateVideoDto, file: any): Promise<void> {
    const foundVideo = await this.foundVideo(id);
    await Videos.createQueryBuilder()
      .update(Videos)
      .set({
        duration: dto.duration || foundVideo.duration,
        title: dto.title || foundVideo.title,
        subject_id: dto.subject_id || (foundVideo.subject_id as any),
        link: dto.link_video || foundVideo.link,
        img: file,
      })
      .where({ id })
      .execute()
      .catch((): unknown => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async remove(id: string): Promise<void> {
    await this.foundVideo(id);
    await Videos.delete(id);
  }
}
