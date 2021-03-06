import { createHash } from "crypto";
import { Repository, FindOptionsWhere } from "typeorm";

import { Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserEntity } from "./user.entity";
import { IUserCreateDto } from "./interfaces";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public findOne(where: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({ where });
  }

  public findAndCount(): Promise<[Array<UserEntity>, number]> {
    return this.userEntityRepository.findAndCount();
  }

  public async getByCredentials(email: string, password: string): Promise<UserEntity | null> {
    return this.userEntityRepository.findOne({
      where: {
        email,
        password: this.createPasswordHash(password, email),
      },
    });
  }

  public async create(dto: IUserCreateDto): Promise<UserEntity> {
    const userEntity = await this.findOne({ email: dto.email });

    if (userEntity) {
      throw new ConflictException();
    }

    return this.userEntityRepository
      .create({
        ...dto,
        password: this.createPasswordHash(dto.password, dto.email),
      })
      .save();
  }

  public createPasswordHash(password: string, salt: string): string {
    return createHash("sha256").update(password).update(salt).digest("hex");
  }
}
