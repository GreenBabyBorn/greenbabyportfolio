<template>
  <section class="post">
    <div class="post__container">
      <div class="post__top">
        <div class="post__body">
          <h1 class="post__title">{{ post?.title }}</h1>
        </div>
        <div class="post__img">
          <img
            :src="`${config.public.restApiUrl}/` + post?.photo"
            alt="Картинка поста"
          />
        </div>
      </div>
      <div class="post__bottom">
        <div id="post__content" class="post__content" v-html="mdContent"></div>
        <span class="post__date">{{ getDate(post?.createdAt) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Markdown from "markdown-it";

const config = useRuntimeConfig();
const { getDate } = dateFormatInit();

const route = useRoute();
const { data: post, error }: any = await useFetch(
  `${config.public.restApiUrl}/posts/` + route.params?.slug
);
if (error.value) {
  throw showError({
    statusCode: 404,
    statusMessage: "Post not found",
    message: "Пост не найден",
  });
}

const parser = new Markdown({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});
const mdContent = parser.render(post.value?.mdContent);
useHead({
  title: `greenbabypost - ${post.value.title}`,
  meta: [{ name: "description", content: "зёленый родился блог" }],
});
</script>

<style scoped lang="scss">
.post {
  &__container {
    margin-bottom: 50px;
  }
  &__top {
  }
  &__img {
    // height: 80%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.3rem;
    }
  }
  &__body {
    padding: 20px 0;
  }
  &__title {
    text-align: center;
    font-weight: bold;
    font-size: 48px;
  }
  &__date {
    color: #888;
    padding: 20px 0;
    font-size: 16px;
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    line-height: normal;
    width: 100%;
    line-height: 1.45;
    margin: 2rem auto 1rem;
    padding: 0.25rem;
    font-size: 18px;
    min-height: 100%;
  }
}
</style>
