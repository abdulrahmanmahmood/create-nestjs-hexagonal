import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private name: string,
    private email: Email,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(name: string, email: string): User {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    const now = new Date();
    return new User(new UserId(), name, new Email(email), now, now);
  }

  getId(): UserId {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(name: string): void {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    this.name = name;
    this.updatedAt = new Date();
  }

  updateEmail(email: string): void {
    this.email = new Email(email);
    this.updatedAt = new Date();
  }

  getAccountAge():number{
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
