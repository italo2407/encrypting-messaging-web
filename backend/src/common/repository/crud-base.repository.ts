import { exclude, removeUndefinedProps } from '../utils/objects';

export abstract class CrudBaseRepository<T> {
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string | number): Promise<T>;
  abstract create(entity: T): Promise<T>;
  abstract update(id: string | number, entity: T): Promise<T>;
  abstract delete(id: string | number): Promise<T>;
}

export abstract class PrismaCrudBaseRepository<T> {
  constructor(
    protected readonly model: any,
    protected readonly entityMapper: any,
  ) {}

  async create(entity: T): Promise<T> {
    const data = removeUndefinedProps(entity);

    const result = await this.model.create({
      data,
    });

    return this.entityMapper.toEntity(result);
  }

  async update(id: string | number, entity: T): Promise<T> {
    const data = removeUndefinedProps(exclude(entity, ['id' as keyof T]));

    const result = await this.model.update({
      where: {
        id,
      },
      data,
    });

    return this.entityMapper.toEntity(result);
  }

  async delete(id: string | number): Promise<T> {
    const result = await this.model.delete({
      where: {
        id,
      },
    });

    return this.entityMapper.toEntity(result);
  }

  async findAll(): Promise<T[]> {
    const result = await this.model.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return this.entityMapper.toEntities(result);
  }

  async findById(id: string | number): Promise<T> {
    const result = await this.model.findUnique({
      where: {
        id,
      },
    });

    return this.entityMapper.toEntity(result);
  }
}
