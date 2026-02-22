
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../ports/user.repository.ports';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(updateUserDto: { userId: string; name?: string; email?: string }) {
    const { userId, ...userData } = updateUserDto;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
if(userData.name) {
    user.updateName(userData.name);
}
if(userData.email) {
    user.updateEmail(userData.email);
}
    return await this.userRepository.save(user);
  }
}
