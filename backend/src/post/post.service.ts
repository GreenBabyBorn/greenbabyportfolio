import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { sep, posix } from "path";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import * as fs from "fs";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.post.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
  }

  async getBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        slug,
      },
    });
    if (!post) {
      throw new NotFoundException(`Post ${slug} does not exits`);
    }
    return post;
  }
  async deletePost(slug: string) {
    const post: any = await this.prisma.post
      .delete({
        where: {
          slug: slug,
        },
      })
      .catch((e) => {
        // console.log(e.code);
        if (e.code === "P2025")
          throw new NotFoundException(`Post ${slug} does not exits`);
      });
    await fs.unlink(`./${post.photo}`, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
    // console.log(post.photo);
    return;
  }

  async create(createPostDto: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: {
          ...createPostDto,
          published: false,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new BadRequestException(
            "There is a unique constraint violation, a new post cannot be created with this slug"
          );
        }
      }
    }
  }

  async update(updatePostDto: UpdatePostDto, slug: string) {
    try {
      return await this.prisma.post.update({
        where: {
          slug: slug,
        },
        data: {
          ...updatePostDto,
          published: false,
        },
      });
      // data: {
      //   ...createPostDto,
      //   published: false,
      // },
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new BadRequestException(
            "There is a unique constraint violation, a new post cannot be created with this slug"
          );
        }
      }
    }
  }
}
