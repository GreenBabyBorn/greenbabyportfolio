import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  getAllPublished(@Query("orderBy") orderBy: string) {
    return this.postService.getAllPublished(orderBy);
  }

  @UseGuards(AtGuard)
  @Get("/all")
  getAll(@Query("orderBy") orderBy: string) {
    return this.postService.getAll(orderBy);
  }
  // @UseGuards(AtGuard)
  // @Get()
  // getAll(@Query("published=false") published: boolean) {
  //   return this.postService.getAllPublished(published);
  // }

  @Get("/:slug")
  getBySlug(@Param("slug") slug) {
    return this.postService.getBySlug(slug);
  }

  @UseGuards(AtGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @UseGuards(AtGuard)
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
