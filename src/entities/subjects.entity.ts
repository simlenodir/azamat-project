import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectInfo } from './subject_info.entity';

@Entity({ name: 'subjects' })
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 80,
    nullable: false,
  })
  title: string;

  @CreateDateColumn()
  create_date: Date;

  @OneToMany(() => SubjectInfo, (subject_info) => subject_info.subject_id)
  subject_info: SubjectInfo[]
}
