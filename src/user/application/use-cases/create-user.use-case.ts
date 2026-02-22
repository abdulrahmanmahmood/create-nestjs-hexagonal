import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../ports/user.repository.ports';
import { InMemoryUserRepository } from 'src/user/infrastructure/adapters/in-memory-user.repository';

export interface CreateUserDto {
  name: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = User.create(dto.name, dto.email);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
}
