import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 300,
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'character varying',
    default: 'nodirsmailov0@gmail.com',
  })
  telegram: string;

  @Column({
    type: 'character varying',
    default: 'nodirsmailov0@gmail.com',
  })
  instagram: string;

  @Column({
    type: 'character varying',
    default: 'nodirsmailov0@gmail.com',
  })
  twitter: string;

  @Column({
    type: 'character varying',
    default: 'nodirsmailov0@gmail.com',
  })
  facebook: string;

  @Column({
    type: 'character varying',
    default: 'nodirsmailov0@gmail.com',
  })
  youtube: string;

  @Column({
    type: 'character varying',
    default: 'nodirsmailov0@gmail.com',
  })
  image: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  create_date: Date;
}
