import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";
import { AtGuard, RtGuard } from "src/auth/guards";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

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
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Patch("/:slug")
  update(@Body() updatePostDto: UpdatePostDto, @Param("slug") slug: string) {
    return this.postService.update(updatePostDto, slug);
  }

  @UseGuards(AtGuard)
  @Delete("/:slug")
  deletePost(@Param("slug") slug) {
    return this.postService.deletePost(slug);
  }
}
