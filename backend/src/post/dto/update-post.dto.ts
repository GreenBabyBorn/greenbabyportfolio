import { CreatePostDto } from "./create-post.dto";
import { PartialType, OmitType } from "@nestjs/mapped-types";

export class UpdatePostDto extends PartialType(CreatePostDto) {}
