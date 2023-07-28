import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }
}
