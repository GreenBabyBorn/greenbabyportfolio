<template>
  <div class="post">
    <div class="post__body">
      <div class="post__content">
        <NuxtLink class="post__title" :to="props.link">{{
          props.title
        }}</NuxtLink>
        <!-- <a :href="" class="post__title"></a> -->
        <div class="post__text">{{ rawContent }}</div>
        <div v-if="props.isAuth" class="post__manage">
          <FormButton class="post__edit" @click="handleEdit">✏️</FormButton>
          <FormButton class="post__remove" @click="deletePost()">❌</FormButton>
          <!-- <button class="post__edit" v-if="props.isAuth" @click=""></button> -->
          <!-- <button
            class="post__remove"
            v-if="props.isAuth"
            @click="deletePost()"
          >
            ❌
          </button> -->
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
}

definePageMeta({
  // layout: "admin",
  // @ts-ignore
  middleware: "auth",
});

const props = defineProps<Props>();
// console.log(props.isAuth);
// const { useUser, getUser } = useAuth();
// await useUser().execute();
// const user = await getUser();
// user.execute();
// const user = await getUser();
// console.log(user);

import { usePostsStore } from "~/stores/posts";

const postsStore = usePostsStore();

const { getSession } = useAuth();
const deletePost = async () => {
  const { data, error }: any = await useFetch(
    "http://localhost:3001/api/posts/" + props.slug,
    {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer " + ((await getSession()) as any).user.accessToken,
      },
    }
  );
  postsStore.removePost(props.post);
};
const handleEdit = () => {
  useRouter().push({ path: "/blog/edit/" + props.slug });
};
</script>

<style scoped lang="scss">
// @use "@/assets/scss/mixins" as *;
.post {
  // box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.5),
  //   10px 10px 15px rgba(112, 172, 134, 0.12);
  // padding: 50px 40px;
  //   border: 1px solid green;
  //  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
  border-radius: 1.25rem;
  // border: 2px solid var(--text-color);
  // box-shadow: 0px 0px 30px 1px #3c3939;
  &__body {
    display: flex;

    // gap: 20px;
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

    // word-wrap: break-word;
    // overflow-wrap: break-word;
    word-break: break-all;
    // hyphens: auto;
    // overflow-wrap: anywhere;
    a {
      // hyphens: auto;
      // overflow-wrap: break-word;
    }
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
    // font-family: Consolas;
  }
  &__date {
    // font-style: italic;
    color: #888;
    font-size: 16px;
    margin-top: auto;
    align-self: flex-end;
    justify-self: flex-end;
  }
  &__remove {
    // align-self: flex-start;
    // padding: 10px 15px;
    // border-radius: 10px;
    // transition: all 0.3s ease 0s;
    // color: red;
    // box-shadow: 0 0 1px 2px red;
    // background: transparent;
  }
  &__img {
    flex: 1 0 50%;

    // height: 250px;
    // width: 250px;
    & img {
      object-fit: cover;
      // border-radius: 25px;
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
