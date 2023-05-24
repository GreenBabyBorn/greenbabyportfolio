import { Post } from "@prisma/client";
import { IsBoolean, IsString } from "class-validator";

export class CreatePostDto
  implements
    Omit<Post, "id" | "photo" | "createdAt" | "updatedAt" | "published">
{
  @IsString()
  title: string;

  @IsString()
  rawContent: string;

  @IsString()
  mdContent: string;

  @IsString()
  slug: string;

  // @IsBoolean()
  // published: boolean;

  // @IsString()
  // photo: string;
}
