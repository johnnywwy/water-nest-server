import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './models/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(entity: DeepPartial<Student>): Promise<boolean> {
    const res = await this.studentRepository.save(
      this.studentRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  findAll() {
    return `This action returns all student`;
  }

  async findById(id: string): Promise<Student> {
    return this.studentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<Student>): Promise<boolean> {
    const res = await this.studentRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
