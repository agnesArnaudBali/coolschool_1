
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        console.log('pas de TOKEN !')
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: process.env.SECRET_KEY,
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
        console.log("🚀 ~ AuthGuard ~ canActivate ~ payload:", payload)
        //request.user = payload;
      
      } catch(error) {
        console.log("🚀 ~ AuthGuard ~ canActivate ~ error:", error)
        throw new UnauthorizedException(error);
      }
      return true;
    }
  // PRIVATE Function !!!
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      console.log("🚀 ~ AuthGuard ~ extractTokenFromHeader ~ [type, token, index3]:", [type, token])
      return type === 'Bearer' ? token : undefined;
    }
  }
  