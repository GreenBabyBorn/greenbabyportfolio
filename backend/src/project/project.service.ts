import { Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  getAllProjects() {
    return this.prisma.project.findMany();
  }

  @Post()
  create(createProjectDto) {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
      },
    });
  }
}
