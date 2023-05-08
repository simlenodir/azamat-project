import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events } from 'src/entities/events.entity';

@Injectable()
export class EventsService {
  async oneEvents(id: string): Promise<Events> {
    const foundEvent = await Events.findOne({
      where: { id },
    }).catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
    if (!foundEvent) {
      throw new HttpException('Event is not found', HttpStatus.NOT_FOUND);
    }
    return foundEvent;
  }

  async create(dto: CreateEventDto, file: string): Promise<void> {
    await Events.createQueryBuilder()
      .insert()
      .into(Events)
      .values({
        description: dto.description,
        sub_id: dto.sub_id as any,
        title: dto.title, 
        link: file,
      })
      .execute()
      .catch(() => {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }
 
  async findAll(): Promise<Events[]> {
    return await Events.find()
    .catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async findOne(id: string): Promise<Events> {
    return await this.oneEvents(id)
    .catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });
  }

  async update(id: string, dto: UpdateEventDto, file: string): Promise<void> {
    const foundEvent = await this.oneEvents(id)

    await Events.createQueryBuilder()
    .update(Events)
    .set({
      title: dto.title  || foundEvent.title,
      description: dto.description  || foundEvent.description,
      sub_id: dto.sub_id as any  || foundEvent.sub_id,
      link: file || foundEvent.link
    })
    .where({id})
    .execute().catch(() => {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    });

  }

  async remove(id: string): Promise<void> {
    await this.oneEvents(id)
    await Events.delete(id)
  }
}
