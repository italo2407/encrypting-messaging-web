import { Injectable } from '@nestjs/common';
import {
  CrudBaseRepository,
  PrismaCrudBaseRepository,
} from 'src/common/repository/crud-base.repository';
import { PrismaMessagesMapper } from 'src/database/prisma/mappers/messages.mapper';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Messages } from 'src/domain/entities/messages';

export abstract class MessagesRepository extends CrudBaseRepository<Messages> {
  abstract findByReceiverId(receiverId: string): Promise<Messages[]>;
}

@Injectable()
export class PrismaMessagesRepository
  extends PrismaCrudBaseRepository<Messages>
  implements MessagesRepository
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma.messages, PrismaMessagesMapper);
  }

  async findByReceiverId(receiverId: string): Promise<Messages[]> {
    const messages = await this.prisma.messages.findMany({
      where: {
        receiverId,
      },
    });

    return PrismaMessagesMapper.toEntities(messages);
  }
}
