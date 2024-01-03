import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AtGuard extends AuthGuard("jwt") {
  constructor(private prisma: PrismaService, private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const jti = context.switchToHttp().getRequest().user.jti;
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        jti: jti,
      },
    });
    if (!refreshToken) throw new UnauthorizedException();
    return true;
  }
  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride("isPublic", [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);

  //   if (isPublic) return true;

  //   return super.canActivate(context);
  // }
}
