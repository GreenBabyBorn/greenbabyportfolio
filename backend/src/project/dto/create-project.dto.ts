import { Project } from "@prisma/client";
import { IsBoolean, IsBooleanString, IsString } from "class-validator";

export class CreateProjectDto
  implements
    Omit<Project, "id" | "image" | "video" | "createdAt" | "updatedAt">
{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  previewLink: string;

  @IsString()
  gitLink: string;

  @IsString()
  slug: string;

  @IsBoolean()
  published: boolean;
}
