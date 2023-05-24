import { Module } from "@nestjs/common";
// import { AuthModule } from "src/auth/auth.module";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
