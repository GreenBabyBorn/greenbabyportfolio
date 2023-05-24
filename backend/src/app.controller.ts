import { Controller, Get, Param, Res } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";
import type { Response } from "express";

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return "greenbabyapi";
  }

  @Get("/uploads/:name")
  getFile(@Param("name") name, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), "uploads", name));
    // console.log(name, file);
    return file.pipe(res);
  }
}
