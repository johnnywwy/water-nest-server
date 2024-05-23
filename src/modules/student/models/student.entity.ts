// @Entity()
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    comment: '学生姓名',
    default: '',
  })
  @IsNotEmpty()
  name: string;
}
