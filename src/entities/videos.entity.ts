import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub_category.entity';
import { SubjectInfo } from './subject_info.entity';

@Entity({ name: 'videos' })
export class Videos extends BaseEntity {
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
    length: 80,
    nullable: false,
  })
  duration: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  link: string;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne(() => SubjectInfo, (sub_info) => sub_info.id ,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'info_id'})
  info_id: SubjectInfo
}
