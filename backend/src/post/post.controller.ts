import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { AtGuard, RtGuard } from "src/auth/guards";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(AtGuard)
  @Delete("/:slug")
  deletePost(@Param("slug") slug) {
    return this.postService.deletePost(slug);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }
  @Get("/:slug")
  getBySlug(@Param("slug") slug) {
    return this.postService.getBySlug(slug);
  }
  @UseGuards(AtGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("photo", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  create(@UploadedFile() file, @Body() createPostDto: CreatePostDto) {
    // console.log(file);
    return this.postService.create(createPostDto, file);
  }
}
