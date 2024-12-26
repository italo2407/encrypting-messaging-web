import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { Messages } from 'src/domain/entities/messages';
import { AwsS3Service } from 'src/common/services/aws-s3.service';
import { decryptMessage, encryptMessage } from 'src/common/utils/crypto';
import { UserService } from '../user/user.service';
import { AwsKmsService } from 'src/common/services/aws-kms.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly awsS3Service: AwsS3Service,
    private readonly awsKmsService: AwsKmsService,
    private readonly userService: UserService,
  ) {}

  async send(message: Messages, content: string): Promise<Messages> {
    const user = await this.userService.findById(message.receiverId);
    const encryptedMessage = encryptMessage(user.publicKey, content);
    const bucketKey = await this.awsS3Service.uploadMessage(user.id, encryptedMessage);
    const result = await this.messagesRepository.create({ ...message, s3Path: bucketKey });

    return result;
  }

  async getMessagesByReceiverId(receiverId: string): Promise<Messages[]> {
    const messages = await this.messagesRepository.findByReceiverId(receiverId);
    const user = await this.userService.findById(receiverId);

    const messagesWithContent = await Promise.all(
      messages.map(async (message) => {
        const encryptedMessage = await this.awsS3Service.getMessage(message.s3Path);
        message.encryptedContent = encryptedMessage.toString('utf-8');
        const decryptedMessage = await this.decryptMessage(user.privateKey, encryptedMessage);
        message.content = decryptedMessage;

        return message;
      }),
    );

    return messagesWithContent;
  }

  private async decryptMessage(privateKey: string, encryptedMessage: Buffer): Promise<string> {
    const privateKeyArrayInt8 = await this.awsKmsService.decryptPrivateKey(
      Buffer.from(privateKey, 'base64'),
    );

    const decryptedMessage = decryptMessage(
      Buffer.from(privateKeyArrayInt8).toString('base64'),
      encryptedMessage,
    );

    return decryptedMessage;
  }
}
