import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from "fs";
import { sep, posix } from "path";

@Injectable()
export class PhotoPostService {
  constructor(private prisma: PrismaService) {}
  async getPhotoFromSlug(slug) {
    const photo = await this.prisma.post.findFirst({
      select: {
        photo: true,
      },
      where: {
        slug: slug,
      },
    });
    if (!photo) {
      throw new NotFoundException();
    }
    return photo;
  }
  async addPhotoOnPost(slug, body, file) {
    try {
      return this.prisma.post.update({
        where: {
          slug: slug,
        },
        data: {
          photo: process.env.BASE_URL + file.path.split(sep).join(posix.sep),
        },
      });
    } catch (e) {
      if (!file) {
        throw new BadRequestException("Photo is required");
      }
    }
  }
  async deletePhotoOnPost(slug) {
    const photo = this.prisma.post.update({
      where: {
        slug,
      },
      data: {
        photo: "",
      },
      select: {
        photo: true,
      },
    });
    return photo;
  }
}
