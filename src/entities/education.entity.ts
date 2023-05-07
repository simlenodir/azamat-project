import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub_category.entity';

@Entity({ name: 'education' })
export class Education extends BaseEntity {
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
  description: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  link: string;

  @CreateDateColumn()
  create_date: Date;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.id ,{
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'sub_id'})
  sub_id: SubCategory
}
