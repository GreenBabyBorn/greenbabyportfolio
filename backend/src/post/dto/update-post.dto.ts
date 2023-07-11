import { CreatePostDto } from "./create-post.dto";
import { PartialType, OmitType } from "@nestjs/swagger";

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ["title", "mdContent", "rawContent", "slug"] as const)
) {}
