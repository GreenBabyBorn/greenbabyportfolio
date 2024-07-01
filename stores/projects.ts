import { defineStore } from "pinia";
type Project = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  img: string;
  git: string;
  link: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: ref<Project[]>([]),
  }),
  actions: {
    async getProjects() {
      try {
        const { data } = await useFetch("/api/projects");
        if (data.value) this.projects = data.value;
      } catch (e) {
        console.log(e);
      }
    },
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
