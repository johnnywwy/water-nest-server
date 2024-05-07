import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { EmailService } from './email.service';
import { v4 as uuidv4 } from 'uuid';

@Resolver()
export class EmailResolver {
  constructor(private readonly emailService: EmailService) {}

  @Mutation(() => Boolean)
  async sendVerificationEmail(@Args('mail') email: string) {
    try {
      const verificationCode = uuidv4();
      await this.emailService.sendVerificationEmail(email, verificationCode);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
