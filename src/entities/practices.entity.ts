import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subjects.entity';
import { SubjectDetail } from './subject_details.entity';

@Entity({ name: 'practices' })
export class Practices extends BaseEntity {
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
  file: string;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne(() => SubjectDetail, (detail) => detail.id ,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'detail_id'})
  detail_id: SubjectDetail
}
