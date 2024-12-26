import { Messages } from '@prisma/client';
import { Messages as MessagesEntity } from 'src/domain/entities/messages';

export class PrismaMessagesMapper {
  static toEntity(model: Partial<Messages>) {
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
    });
  }

  static toEntities(models: Partial<Messages>[]) {
    if (!models) {
      return [];
    }

    return models.map((model) => PrismaMessagesMapper.toEntity(model));
  }
}
