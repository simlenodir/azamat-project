import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub_category.entity';

@Entity({ name: 'categories' })
export class Category extends BaseEntity {
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

  @OneToMany(() => SubCategory, (sub_category) => sub_category.category_id)
  sub_category: SubCategory[]
}
