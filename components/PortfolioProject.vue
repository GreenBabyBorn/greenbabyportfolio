<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifications";
import { useProjectsStore } from "~/stores/projects";
interface Props {
  title: string;
  link: string;
  date: string;
  text: string;
  git: string;
  imgSrc: string;
  imgAlt?: string;
  slug?: string;
  published: boolean;
  project?: object;
}

const props = defineProps<Props>();

const notificationStore = useNotificationStore();
const projectsStore = useProjectsStore();
const emits = defineEmits(["updatePublished"]);

const user = useUser();

const deleteProject = async () => {
  const res = await $fetch(`/api/projects/` + props.slug, {
    method: "DELETE",
    body: {
      slug: props.slug,
    },
  });
  projectsStore.removeProject(props.project as any);
  notificationStore.pushNotification({
    title: "Успешно!",
    status: true,
    text: "Пост успешно удален!",
  });
};

const handleEdit = () => {
  useRouter().push({ path: "/blog/edit/" + props.slug });
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
    <a :href="props.link" target="_blank" class="project__url">
      <div class="project__img">
        <img :src="props.imgSrc" :alt="props.imgAlt" />
      </div>
      <div class="project__info">Подробнее</div>
    </a>
    <div class="project__description">
      <span class="project__text">{{ props.title }}</span>
      <p>{{ props.text }}</p>
      <a target="_blank" class="project__github" :href="props.git">github</a>
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
  &__url {
    &:hover img {
      filter: brightness(0.5);
    }
    &:hover .project__info {
      font-size: 1.2rem;
      opacity: 1;
    }
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
  &__description {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
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
