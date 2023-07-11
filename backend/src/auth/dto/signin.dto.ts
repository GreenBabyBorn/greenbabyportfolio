import { User } from "@prisma/client";
import { IsBoolean, IsString } from "class-validator";

export class SignIntDto implements Omit<User, "id"> {
  @IsString()
  username: string;

  @IsString()
  password: string;

  // @IsBoolean()
  // published: boolean;

  // @IsString()
  // photo: string;
}
