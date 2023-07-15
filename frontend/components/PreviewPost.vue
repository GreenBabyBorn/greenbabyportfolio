<template>
  <div class="post">
    <div class="post__body">
      <div class="post__content">
        <NuxtLink class="post__title" :to="props.link">{{
          props.title
        }}</NuxtLink>
        <div class="post__text">{{ rawContent }}</div>
        <div v-if="props.isAuth" class="post__manage">
          <input
            type="checkbox"
            v-model="published"
            @input="handlePublished()"
          />
          <FormButton class="post__edit" @click="handleEdit()">✏️</FormButton>
          <FormButton class="post__remove" @click="deletePost()">❌</FormButton>
        </div>

        <!-- <span class="post__date">{{ props.date }}</span> -->
      </div>
      <NuxtLink :to="props.link" class="post__img">
        <img :src="props.imgsrc" :alt="props.imgalt" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifications";
import { usePostsStore, Post } from "~/stores/posts";

interface Props {
  title: string;
  mdContent: string;
  rawContent: string;
  date: string;
  imgsrc: string;
  imgalt?: string;
  link: string;
  isAuth?: boolean;
  slug?: string;
  post?: object;
  published: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(["updatePublished"]);
// definePageMeta({
//   // layout: "admin",
//   // @ts-ignore
//   // middleware: "auth",
// });

const published = ref(props.published);

const config = useRuntimeConfig();

const notificationStore = useNotificationStore();
const postsStore = usePostsStore();

const { getSession } = useAuth();

const deletePost = async () => {
  const { data, error }: any = await useFetch(
    `${config.public.restApiUrl}/posts/` + props.slug,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + ((await getSession()) as any).user.accessToken,
      },
    }
  );
  postsStore.removePost(props.post as Post);
  notificationStore.pushNotification({
    title: "Ок!",
    status: true,
    text: "Пост успешно удален!",
  });
};

const handleEdit = () => {
  useRouter().push({ path: "/blog/edit/" + props.slug });
};

const handlePublished = async () => {
  const { data, error }: any = await useFetch(
    `${config.public.restApiUrl}/posts/` + props.slug,
    {
      method: "PATCH",
      body: {
        published: !props.published,
      },
      headers: {
        Authorization:
          "Bearer " + ((await getSession()) as any).user.accessToken,
      },
    }
  );
  emits("updatePublished", props.post);
  // console.log(published.value);
};
</script>

<style scoped lang="scss">
.post {
  border-radius: 1.25rem;
  &__body {
    display: flex;
    @media (max-width: 720px) {
      flex-direction: column-reverse;
    }
  }
  &__content {
    display: grid;
    grid-template-rows: 1fr 1fr auto;
    flex: 0 0 50%;
    padding: 30px 30px 30px 30px;
    gap: 20px;
  }
  &__title {
    font-weight: bold;
    font-size: 42px;
    word-break: break-all;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
  &__manage {
    display: flex;
    justify-content: space-around;
  }
  &__text {
    line-height: normal;
    color: #888;
    word-break: break-all;
  }
  &__date {
    color: #888;
    font-size: 16px;
    margin-top: auto;
    align-self: flex-end;
    justify-self: flex-end;
  }
  &__remove {
  }
  &__img {
    flex: 1 0 50%;
    & img {
      object-fit: cover;
      border-bottom-right-radius: 1.25rem;
      border-top-right-radius: 1.25rem;
      width: 100%;
      height: 100%;
      @media (max-width: 720px) {
        border-bottom-right-radius: 0px;
        border-top-left-radius: 1.25rem;
      }
    }
  }
}
</style>
