import { Controller, Get, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async createUser() {
    const user = await this.createUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    return user;
  }

  @Get(':id')
  async getUser(id: string) {
    return await this.getUserUseCase.execute(id);
  }

  @Get()
  async listUsers() {
    return await this.listUsersUseCase.execute();
  }

  @Post(':id/delete')
  async deleteUser(id: string) {
    return await this.deleteUserUseCase.execute(id);
  }

  @Post(':id/update')
  async updateUser(id: string, userData: any) {
    return await this.updateUserUseCase.execute({ userId: id, ...userData });
  }
}
