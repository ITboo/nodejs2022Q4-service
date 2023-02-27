import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../auth.service';

import { ERR_TOKEN } from 'src/common/error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];
    try {
      const { data } = await this.authService.verifyAccessToken(
        authHeader.split('Bearer ')[1],
      );
      req.user = data;
      console.log(data);
      return true;
    } catch (err) {
      throw new UnauthorizedException(ERR_TOKEN);
    }
  }
}
