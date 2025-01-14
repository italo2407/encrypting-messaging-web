import { User } from '@prisma/client';
import { User as UserEntity } from 'src/domain/entities/user';

export class PrismaUserMapper {
  static toEntity(model: Partial<User>) {
    if (!model) {
      return null;
    }

    return new UserEntity({
      id: model.id,
      email: model.email,
      name: model.name,
      password: model.password,
      publicKey: model.publicKey,
      privateKey: model.privateKey,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toEntities(models: Partial<User>[]) {
    if (!models) {
      return [];
    }

    return models.map((model) => PrismaUserMapper.toEntity(model));
  }
}
