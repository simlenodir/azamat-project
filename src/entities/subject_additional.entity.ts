import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subjects.entity';

@Entity({ name: 'subject_additional' })
export class SubjectAdditional extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 300,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  link: string;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne(() => Subject, (subject) => subject.id ,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'subject_id'})
  subject_id: Subject
}
