import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PhotoPostModule } from "./photo-post/photo-post.module";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PostModule,
    AuthModule,
    PhotoPostModule,
  ],
})
export class AppModule {}
