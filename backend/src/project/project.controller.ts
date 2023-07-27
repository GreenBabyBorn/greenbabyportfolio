import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Get()
  getAllProjects() {
    return this.projectService.getAllProjects();
  }
  @Post()
  create(@Body() createProjectDto) {
    return this.projectService.create(createProjectDto);
  }
}
