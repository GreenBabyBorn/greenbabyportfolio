<template>
  <div class="post">
    <div class="post__body">
      <div class="post__content">
        <NuxtLink class="post__title" :to="props.link">{{
          props.title
        }}</NuxtLink>
        <div class="post__text">{{ rawContent }}</div>
        <div v-if="props.isAuth" class="post__manage">
          <FormCheckBox
            :value="props.published"
            :name="props.slug + 'CheckBox'"
            :forid="props.slug + 'CheckBox'"
            @input="handlePublished()"
          />
          <FormButton class="post__edit" @click="handleEdit()"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="yellow"
              height="30px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </FormButton>
          <FormButton class="post__remove" @click="deletePost()"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              height="30px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </FormButton>
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
  notificationStore.pushNotification({
    title: "Ок!",
    status: true,
    text: `Статус поста изменен на: ${
      !props.published ? "'опубликовано'" : "'в черновике'"
    }`,
  });
  if (error.value) {
    notificationStore.pushNotification({
      title: "Опаньки!",
      status: false,
      text: `Ошибка: ${error}`,
    });
  }
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
    grid-template-rows: auto 1fr auto;
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
  &__edit {
    background: none;
  }
  &__remove {
    background: none;
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
