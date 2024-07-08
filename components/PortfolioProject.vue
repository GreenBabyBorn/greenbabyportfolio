<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifications";
import { useProjectsStore } from "~/stores/projects";

interface Props {
  title: string;
  link: string;
  date: string | null;
  text: string | null;
  git: string;
  imgSrc: string;
  imgAlt?: string;
  slug?: string;
  published: boolean;
  project?: object;
}

const props = defineProps<Props>();

const notificationStore = useNotificationStore();
const {removeProject} = useProjectsStore();
const emits = defineEmits(["updatePublished"]);

const user = useUser();

const deleteProject = async () => {
  const res = await $fetch(`/api/projects/` + props.slug, {
    method: "DELETE",
    body: {
      slug: props.slug,
    },
  });
  removeProject(props.project as any);
  notificationStore.pushNotification({
    title: "Успешно!",
    status: true,
    text: "Пост успешно удален!",
  });
};

const handleEdit = () => {
  navigateTo("/projects/edit/" + props.slug);
};

const handlePublished = async () => {
  try {
    const res = await $fetch("/api/projects/" + props.slug, {
      method: "PATCH",
      body: {
        published: !props.published,
      },
    });
    emits("updatePublished", props.project);
    notificationStore.pushNotification({
      title: "Успешно!",
      status: true,
      text: `Статус поста изменен на: ${
        !props.published ? "'опубликовано'" : "'в черновике'"
      }`,
    });
  } catch (e) {
    notificationStore.pushNotification({
      title: "Опаньки!",
      status: false,
      text: `Ошибка: ${e}`,
    });
  }
};
</script>

<template>
  <div class="project">
    <div class="project__body">
      <div class="project__img">
        <img :src="props.imgSrc" :alt="props.imgAlt" />
      </div>
      <div class="project__info">Результат</div>

      <div class="project__description">
        <div class="project__description-left">
          <span class="project__text">{{ props.title }}</span>
        <p>{{ props.text }}</p>
        <NuxtLink :external="true" class="project__github" :to="props.git"
          >github</NuxtLink
        >
        </div>
       
        <div class="project__description-right">
          <NuxtLink title="Дэмо" :external="true" class="project__demo" :to="props.link"
          ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg></NuxtLink
        >
        </div>
      </div>
    </div>

    <div v-if="user" class="project__manage">
      <FormCheckBox
        :value="props.published"
        :name="props.slug + 'CheckBox'"
        :forid="props.slug + 'CheckBox'"
        @input="handlePublished()"
      />
      <FormButton class="project__edit" @click="handleEdit()"
        >Редактировать
      </FormButton>
      <FormButton class="project__remove" @click="deleteProject()"
        >Удалить
      </FormButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__manage {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  &__date {
    font-family: Consolas;
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    background: rgba(22, 22, 22, 0.599);
  }
  &__body {
    display: inline-block;
    position: relative;
    z-index: 1;
  }
  &__img {
    img {
      transition: all 0.3s ease 0s;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  &__info {
    transition: all 0.3s ease 0s;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 5;
    font-size: 20px;
  }
  &__description-left  {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  &__description-right  {

  }
  &__description {
    padding: 1rem;
    position: absolute;
    z-index: 50;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(180deg, transparent, var(--bg-color));
    backdrop-filter: blur(2px);
  }
  &__text {
    font-size: 1.2rem;
  }
  &__github {
    font-size: 1.2rem;
    text-decoration: underline;
    transition: color 0.3s ease 0s;
    &:hover {
      color: #e8eaea;
    }
  }
}
</style>
