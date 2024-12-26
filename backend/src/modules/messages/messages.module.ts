import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { UserModule } from '../user/user.module';
import { AwsS3Service } from 'src/common/services/aws-s3.service';
import { MessagesRepository, PrismaMessagesRepository } from './messages.repository';
import { AwsKmsService } from 'src/common/services/aws-kms.service';

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesService,
    AwsS3Service,
    AwsKmsService,
    {
      provide: MessagesRepository,
      useClass: PrismaMessagesRepository,
    },
  ],
  imports: [UserModule],
})
export class MessagesModule {}
