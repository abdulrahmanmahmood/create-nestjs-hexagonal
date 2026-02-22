import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user/application/ports/user.repository.ports';
import { User } from 'src/user/domain/entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  constructor() {}

  private readonly users: Map<string, User> = new Map();

  save(user: User): Promise<User> {
    this.users.set(user.getId().getValue(), user);
    return Promise.resolve(user);
  }
  findById(id: string): Promise<User | null> {
    const user = this.users.get(id) || null;
    return Promise.resolve(user);
  }
  findByEmail(email: string): Promise<User | null> {
    const user =
      Array.from(this.users.values()).find(
        (u) => u.getEmail().getValue() === email,
      ) || null;
    return Promise.resolve(user);
  }
  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }
  delete(id: string): Promise<void> {
    this.users.delete(id);
    return Promise.resolve();
  }
}
