import { container } from 'tsyringe';
import { IUserRepository } from '../../ports/iRepository/iUserRepository';
import Logger from '../../ports/logger.port';
import { NotExistingUser } from '../../entities/user.entity';

class SignInUserUseCase {
  private userRepository: IUserRepository;
  private logger: Logger;

  constructor() {
    this.userRepository = container.resolve<IUserRepository>('UserRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute(
    login: string,
    password: string,
  ): Promise<{ accessToken: string } | 'USER_NOT_FOUND'> {
    this.logger.debug('[Get-user usecase] Start');
    const notExistingUser = new NotExistingUser();
    const user = await this.userRepository.findByLoginAndPassword(
      login,
      notExistingUser.hashPassword(password),
    );
    return user
      ? { accessToken: user.signAndEncodeAccessToken() }
      : 'USER_NOT_FOUND';
  }
}

export default SignInUserUseCase;
