import { ExistingUser } from '../../entities/user.entity';
import { CreateUserPayload } from '../payloads/user.payload';

export interface IUserRepository {
  create(
    payload: CreateUserPayload,
  ): Promise<ExistingUser | 'USER_ALREADY_EXISTS'>;
  findByLoginAndPassword(
    login: string,
    password: string,
  ): Promise<ExistingUser | null>;
  findById(id: string): Promise<ExistingUser | null>;
}
