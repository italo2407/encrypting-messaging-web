import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaUserRepository, UserRepository } from './user.repository';
import { AwsKmsService } from 'src/common/services/aws-kms.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    AwsKmsService,
  ],
  exports: [UserService],
})
export class UserModule {}
