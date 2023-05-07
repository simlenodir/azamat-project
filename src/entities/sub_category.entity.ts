import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './categories.entity';
import { SubCategoryInfo } from './category_info.entity';
import { Education } from './education.entity';

@Entity({ name: 'sub_category' })
export class SubCategory extends BaseEntity {
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

  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category_id: Category;

  @OneToMany(() => SubCategoryInfo, (info) => info.sub_id)
  info: SubCategoryInfo[]

  @OneToMany(() => Education, (education) => education.sub_id)
  education: Education[]
}
