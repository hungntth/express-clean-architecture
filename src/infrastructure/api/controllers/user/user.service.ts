import SignInUserUseCase from '../../../../use-cases/user/sign-in-user.use-case';
import SignUpUserUseCase from '../../../../use-cases/user/sign-up-user.use-case';
import { PostUsersInputDto, PostUsersOutputDto } from './dto';

export const signin = (
  login: string,
  password: string,
): Promise<PostUsersOutputDto | 'USER_NOT_FOUND'> =>
  new SignInUserUseCase().execute(login, password);

export const signup = (
  data: PostUsersInputDto,
): Promise<PostUsersOutputDto | 'USER_ALREADY_EXISTS'> =>
  new SignUpUserUseCase().execute(data);
