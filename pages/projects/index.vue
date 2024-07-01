<script setup lang="ts">
import { TransitionGroup } from "vue";
import { useProjectsStore } from "~/stores/projects";
import noImage from "assets/img/no-image.jpg";
import { storeToRefs } from "pinia";

useHead({
  title: "greenbabyblog",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

const user = useUser();
const projectStore = useProjectsStore();
const { getProjects } = projectStore

const { projects } = storeToRefs(projectStore);
await getProjects();


// const { data: projects } = await useFetch("/api/projects");
// projectsStore.projects = projects.value as any;
// await useAsyncData('projects', () => projectsStore.getProjects())

// onServerPrefetch(async () => await projectsStore.getProjects());
// onBeforeMount(async () => {
//     await projectsStore.getProjects();
// });

const updatePublished = (project: any) => {
  project.published = !project.published;
};
</script>

<template>
  <div>
    <CreateProject v-if="user"></CreateProject>
    <div class="blog">
      <TransitionGroup tag="div" name="fade" class="blog__container">
        <PortfolioProject
          v-for="project in projects"
          :key="project.id"
          :title="project.title"
          :link="project.link"
          :date="project.createdAt"
          :imgSrc="project.img || noImage"
          :text="project.content"
          :git="project.git"
          :slug="project.slug"
          :published="project.published"
          :project="project"
          @updatePublished="updatePublished"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped lang="scss">
.blog {
  font-size: 1rem;
  margin: 50px 0px 50px 0px;
  :deep(.blog__container) {
    display: flex;
    flex-direction: column;
    gap: 80px;
    position: relative;
  }
}
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
// .fade-leave-active {
//   position: absolute;
// }
</style>
