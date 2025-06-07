import { createHmac } from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import { env } from 'process';
import { z } from 'zod';

const ConfigSchema = z.object({
  secret: z.string().min(1, 'Secret must not be empty'),
  salt: z.string().min(1, 'Salt must not be empty'),
});

type UserConfig = z.infer<typeof ConfigSchema>;

abstract class User {
  protected readonly config: UserConfig;
  constructor() {
    this.config = ConfigSchema.parse({
      secret: env['USER_SECRET'] || 'default_secret',
      salt: env['USER_SALT'] || 'default_salt',
    });
  }
}

type ExistingUserConstructorArgs = {
  id: string;
};

export class ExistingUser extends User {
  private _id: string;

  constructor(args: ExistingUserConstructorArgs) {
    super();
    this._id = args.id;
  }

  public signAndEncodeAccessToken() {
    const accessToken = sign({ sub: this._id }, this.config.secret, {
      expiresIn: 86400, // 24 hours
    });
    return accessToken;
  }

  public get id() {
    return this._id;
  }
}

export class NotExistingUser extends User {
  constructor() {
    super();
  }

  public hashPassword(password: string): string {
    const hmac = createHmac('sha512', this.config.salt);
    hmac.update(password);
    return hmac.digest('hex');
  }
  public verifyAndDecodeToken(token: string): { id: string } {
    const { sub } = verify(token, this.config.secret);
    if (sub && typeof sub === 'string') {
      return { id: sub };
    }
    throw 'INVALID_JWT_TOKEN';
  }
}
