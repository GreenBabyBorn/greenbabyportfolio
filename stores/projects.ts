import type { Project } from "@prisma/client";
import { defineStore } from "pinia";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    removeProject(project: Project) {
      this.projects = this.projects.filter((el) => {
        return el !== project;
      });
    },
    updateProject(project: Project) {
      this.projects.forEach((o) => {
        if (o.slug === project.slug) {
          o = project;
        }
      });
    },
  },
});
