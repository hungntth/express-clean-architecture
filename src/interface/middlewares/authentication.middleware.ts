import * as express from 'express';
import { container } from 'tsyringe';

import { AuthenticatedContext } from '@core/ports/api.port';
import { ExistingUser, NotExistingUser } from '@core/entities/user.entity';

import { UnauthorizedError } from '../../infrastructure/api/error-handler';
import { IUserRepository } from 'domain/repositories/iUserRepository';

export type AuthenticatedRequest = Express.Request & {
  user: AuthenticatedContext;
};

const extractTokenFromRequest = (
  request: express.Request,
): 'TOKEN_NOT_FOUND' | string =>
  (request.header('authorization') ?? '').replace('Bearer ', '') ||
  'TOKEN_NOT_FOUND';

const verifyAndDecodeJwtToken = (
  token: string,
): 'INVALID_JWT_TOKEN' | { id: string } => {
  try {
    const notExistingUser = new NotExistingUser();
    return notExistingUser.verifyAndDecodeToken(token);
  } catch {
    return 'INVALID_JWT_TOKEN';
  }
};

const retrieveUserFromId = async (
  userRepository: IUserRepository,
  id: string,
): Promise<'UNKNOWN_USER' | ExistingUser> =>
  (await userRepository.findById(id)) || 'UNKNOWN_USER';

const getUserFromJwt = async (
  userRepository: IUserRepository,
  token: string,
): Promise<'INVALID_JWT_TOKEN' | 'UNKNOWN_USER' | { userId: string }> => {
  const payload = verifyAndDecodeJwtToken(token);
  if (payload === 'INVALID_JWT_TOKEN') {
    return payload;
  }
  const user = await retrieveUserFromId(userRepository, payload.id);
  if (user === 'UNKNOWN_USER') {
    return user;
  }
  return {
    userId: user.id,
  };
};

export async function expressAuthentication(
  request: express.Request,
  _securityName: string,
  _scopes: string[],
): Promise<AuthenticatedContext> {
  const userRepository = container.resolve<IUserRepository>('IUserRepository');
  const token = extractTokenFromRequest(request);
  if (token === 'TOKEN_NOT_FOUND') {
    return Promise.reject(new UnauthorizedError('MISSING_AUTHENTICATION'));
  }

  const user = await getUserFromJwt(userRepository, token);
  if (user === 'INVALID_JWT_TOKEN' || user === 'UNKNOWN_USER') {
    return Promise.reject(new UnauthorizedError('INVALID_TOKEN'));
  }
  return Promise.resolve(user);
}
