import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin_info' })
export class AdminInfo extends BaseEntity {
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
    length: 300,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  img: string;

  @CreateDateColumn()
  create_date: Date;
}
