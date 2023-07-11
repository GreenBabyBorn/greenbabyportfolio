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
import { PhotoPostService } from "./photo-post.service";
import { AtGuard } from "src/auth/guards/at.guard";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("")
export class PhotoPostController {
  constructor(private readonly photoPostService: PhotoPostService) {}

  @Get("/posts/:slug/photo")
  getPhotoFromSlug(@Param("slug") slug: string) {
    return this.photoPostService.getPhotoFromSlug(slug);
  }

  @UseGuards(AtGuard)
  @Post("/posts/:slug/photo")
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
  addPhotoOnPost(
    @Param("slug") slug: string,
    @UploadedFile() file,
    @Body() body
  ) {
    return this.photoPostService.addPhotoOnPost(slug, body, file);
  }

  @UseGuards(AtGuard)
  @Delete("/posts/:slug/photo")
  deletePhotoOnPost(@Param("slug") slug: string) {
    return this.photoPostService.deletePhotoOnPost(slug);
  }
}
