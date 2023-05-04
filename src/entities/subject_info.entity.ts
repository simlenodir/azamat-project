import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subjects.entity';
import { Videos } from './videos.entity';

@Entity({ name: 'sub_info' })
export class SubjectInfo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  lecture: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  labaratories: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  add: string;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne(() => Subject, (subject) => subject.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject_id: Subject;

  @OneToMany(() => Videos, (video) => video.info_id)
  video: Videos[]
}
