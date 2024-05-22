import {
  Resolver,
  // Query,
  Mutation,
  Args,
  // Int
} from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './models/student.entity';
import { StudentResult, StudentResults } from './dto/result-student.output';
import { StudentInput } from './dto/student.input';
import { STUDENT_NOT_EXIST, SUCCESS } from '@/common/constants/code';
import { CurUserId } from '@/common/decorators/current-user.decorator';
import { Result } from '@/common/dto/result.type';
// import { UpdateStudentInput } from './dto/update-student.input';

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentResult)
  async commitStudentInfo(
    @Args('params') params: StudentInput,
    @CurUserId() userId: string,
  ): Promise<Result> {
    const student = await this.studentService.findById(userId);
    if (student) {
      const res = await this.studentService.updateById(student.id, params);
      if (res) {
        return {
          code: SUCCESS,
          message: '更新成功',
        };
      }
    }
    return {
      code: STUDENT_NOT_EXIST,
      message: '用户信息不存在',
    };
  }
}
