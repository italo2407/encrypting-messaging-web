import { Messages } from '@prisma/client';
import { Messages as MessagesEntity } from 'src/domain/entities/messages';
import { PrismaUserMapper } from './user.mapper';

export class PrismaMessagesMapper {
  static toEntity(
    model: Partial<
      Messages & {
        sender: {
          id: string;
          name: string;
          email: string;
        };
      }
    >,
  ) {
    if (!model) {
      return null;
    }

    return new MessagesEntity({
      id: model.id,
      title: model.title,
      s3Path: model.s3Path,
      senderId: model.senderId,
      receiverId: model.receiverId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      sender: PrismaUserMapper.toEntity({
        id: model.sender?.id,
        name: model.sender?.name,
        email: model.sender?.email,
      }),
      isRead: model.isRead
    });
  }

  static toEntities(models: Partial<Messages>[]) {
    if (!models) {
      return [];
    }

    return models.map((model) => PrismaMessagesMapper.toEntity(model));
  }
}
