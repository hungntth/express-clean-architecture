import { container } from 'tsyringe';
import { IUserRepository } from '@ports/iRepository/iUserRepository';
import Logger from '@ports/logger.port';
import { NotExistingUser } from '../../core/entities/user.entity';


type SignUpUserInput = {
  login: string;
  password: string;
};

class SignUpUserUseCase {
  private userRepository: IUserRepository;
  private logger: Logger;

  constructor() {
    this.userRepository = container.resolve<IUserRepository>('UserRepository');
    this.logger = container.resolve<Logger>('Logger');
  }

  async execute({
    login,
    password,
  }: SignUpUserInput): Promise<
    { accessToken: string } | 'USER_ALREADY_EXISTS'
  > {
    this.logger.debug('[Create-user usecase] Start');

    const notExistingUser = new NotExistingUser();
    const existingUser = await this.userRepository.create({
      login,
      password: notExistingUser.hashPassword(password),
    });
    if (existingUser === 'USER_ALREADY_EXISTS') {
      return existingUser;
    }
    return {
      accessToken: existingUser.signAndEncodeAccessToken(),
    };
  }
}

export default SignUpUserUseCase;
