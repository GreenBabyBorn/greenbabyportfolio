import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PhotoPostModule } from "./photo-post/photo-post.module";
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';

@Module({
  controllers: [AppController, ProjectController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PostModule,
    AuthModule,
    PhotoPostModule,
    ProjectModule,
  ],
  providers: [ProjectService],
})
export class AppModule {}
