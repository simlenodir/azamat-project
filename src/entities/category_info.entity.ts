import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './sub_category.entity';

@Entity({ name: 'category_info' })
export class SubCategoryInfo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 250,
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
  image: string

  @CreateDateColumn()
  create_date: Date;

  @Column({
    type: 'integer',
    default: 0,
    nullable: false,
  })
  views: number;

  @Column({
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isPublished: boolean;

  @ManyToOne(() => SubCategory, sub_info => sub_info.id, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'sub_id'})
  sub_id: SubCategory
}
