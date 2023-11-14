import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JWTAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      request.token = token;
    }
    return super.canActivate(context);
  }

  handleRequest(error, user, info) {
    if (error || !user) {
      throw error || new UnauthorizedException();
    }
    return user;
  }
}
