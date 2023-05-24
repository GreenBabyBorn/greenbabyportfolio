import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private prisma: PrismaService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>("AT_SECRET"),
    });
  }

  async validate(payload: any) {
    // const jti = this.prisma.refreshToken.findUnique({
    //   where: {
    //     jti: payload.jti,
    //   },
    // });
    // if (!jti) {
    //   return;
    // }
    return {
      userId: payload.sub,
      username: payload.username,
      jti: payload.jti,
    };
  }
}
