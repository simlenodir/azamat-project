import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './categories.entity';
import { SubCategoryInfo } from './category_info.entity';
import { Subject } from './subjects.entity';
import { Practices } from './practices.entity';

@Entity({ name: 'subject_details' })
export class SubjectDetail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 250,
    nullable: false,
  })
  title: string;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne(() => Subject, (subject) => subject.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subject_id' })
  subject_id: Subject;

  @OneToMany(() => Practices, (practice) => practice.detail_id)
  practice: Practices[]


}
