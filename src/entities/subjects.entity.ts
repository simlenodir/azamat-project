import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Videos } from './videos.entity';
import { Lectures } from './lectures.entity';
import { Practices } from './practices.entity';

@Entity({ name: 'subjects' })
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 80,
    unique: true,
    nullable: false,
  })
  title: string;

  @CreateDateColumn()
  create_date: Date;

  @OneToMany(() => Lectures, (lectures) => lectures.subject_id)
  subject_info: Lectures[]

  @OneToMany(() => Videos, (video) => video.subject_id)
  video: Videos[]

  @OneToMany(() => Practices, (practice) => practice.subject_id)
  practices: Practices[]
}
