import { Post } from "@prisma/client";
import { IsBoolean, IsBooleanString, IsString } from "class-validator";

export class CreatePostDto
  implements Omit<Post, "id" | "photo" | "createdAt" | "updatedAt">
{
  @IsString()
  title: string;

  @IsString()
  rawContent: string;

  @IsString()
  mdContent: string;

  @IsString()
  slug: string;

  @IsBoolean()
  published: boolean;
}
