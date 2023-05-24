import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
// import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private config: ConfigService
  ) {}
  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.userService.findUser(username);
  //   if (user && (await bcrypt.compare(pass, user.password))) {
  //     const { password, ...result } = user;
  //     return user;
  //   }
  //   return null;
  // }

  async signup(body: any) {
    const hashedPassword = await argon.hash(body.password);

    const user = await this.prisma.user
      .create({
        data: {
          username: body.username,
          password: hashedPassword,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new ForbiddenException("Credentials incorrect");
          }
        }
        throw error;
      });

    // const tokens = await this.getTokens(user.id, user.username);
    // const hashRefreshToken = await argon.hash(tokens.refresh_token);
    // await this.prisma.refreshToken.create({
    //   data: {
    //     token: hashRefreshToken,
    //     userId: user.id,
    //   },
    // });
    // await this.updateRtHash(user.id, tokens.refresh_token);

    return {};
  }
  async signin(body: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (!user) throw new ForbiddenException("Access Denied");

    const passwordMatches = await argon.verify(user.password, body.password);
    if (!passwordMatches) throw new ForbiddenException("Access Denied");

    const jti = uuidv4();
    const tokens = await this.getTokens(user.id, user.username, jti);
    // await this.updateRtHash(user.id, tokens.refresh_token);
    // const hashRefreshToken = await argon.hash(tokens.refresh_token);
    await this.prisma.refreshToken.create({
      data: {
        jti: jti,
        iat: new Date(
          (this.jwtService.decode(tokens.refresh_token) as any).iat
        ),
        userId: user.id,
      },
    });

    return tokens;
  }

  async logout(body: any) {
    // console.log(body.refresh_token);
    const payload = this.jwtService.decode(body.refresh_token) as any;
    const refreshToken = this.prisma.refreshToken.count({
      where: {
        jti: payload.jti,
      },
    });

    if (await refreshToken) {
      await this.prisma.refreshToken.delete({
        where: {
          jti: payload.jti,
        },
      });
      return;
    }
    throw new UnauthorizedException();
  }

  async refreshTokens(user: any) {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: {
        jti: user.jti,
      },
    });
    if (!refreshToken) {
      throw new ForbiddenException();
    }
    if (user.iat !== refreshToken.iat.getTime()) {
      await this.prisma.refreshToken.delete({
        where: {
          jti: user.jti,
        },
      });

      throw new ForbiddenException();
    }
    // const jti = uuidv4();
    const tokens = await this.getTokens(user.sub, user.username, user.jti);
    await this.prisma.refreshToken.update({
      where: {
        jti: user.jti,
      },
      data: {
        iat: new Date(
          (this.jwtService.decode(tokens.refresh_token) as any).iat
        ),
        userId: user.sub,
      },
    });

    return tokens;
  }
  // async signin(user: any) {
  //   // console.log(user);
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  //   // console.log(user.username);
  // }

  // async updateRtHash(userId: number, rt: string): Promise<void> {
  //   const hashRefreshToken = await argon.hash(rt);
  //   await this.prisma.refreshToken.update({
  //     where: {
  //       token: rt,
  //     },
  //     data: {
  //       token: hashRefreshToken,
  //     },
  //   });
  // }
  async getUser(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async getTokens(userId: number, username: string, jti: string) {
    const jwtPayload = {
      sub: userId,
      username: username,
      jti: jti,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: 300,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: "7 days",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
