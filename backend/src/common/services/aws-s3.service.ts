import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsS3Service {
  private s3Client: S3Client;
  private bucketName: string;
  private prefix: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this.bucketName = 'encrypting-messaging-bucket';
  }

  async uploadMessage(userId: string, encryptedMessage: Buffer): Promise<string> {
    const fileId = uuidv4();
    const objectKey = `${userId}/messages/${fileId}.txt`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: objectKey,
      Body: encryptedMessage,
    });

    await this.s3Client.send(command);
    return objectKey;
  }

  async getMessage(key: string): Promise<Buffer> {
    const getObjectParams = {
      Bucket: this.bucketName,
      Key: key,
    };

    try {
      const command = new GetObjectCommand(getObjectParams);
      const data = await this.s3Client.send(command);
      const streamToBuffer = (stream): Promise<Buffer> =>
        new Promise((resolve, reject) => {
          const chunks = [];
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.on('error', reject);
          stream.on('end', () => resolve(Buffer.concat(chunks)));
        });

      return await streamToBuffer(data.Body);
    } catch (error) {
      throw new Error(`File retrieval failed: ${error.message}`);
    }
  }
}
