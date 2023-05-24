<template>
  <section class="post">
    <div class="post__container">
      <div class="post__top">
        <div class="post__body">
          <h1 class="post__title">{{ post?.title }}</h1>
        </div>
        <div class="post__img">
          <img
            :src="'http://localhost:3001/api/' + post?.photo"
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
// import dateFormat, { masks } from "dateformat";

import Markdown from "markdown-it";

// const config = useRuntimeConfig();

// console.log("API secret:", config.restApi);

// console.log();

const { getDate } = dateFormatInit();

const route = useRoute();
const { data: post, error }: any = await useFetch(
  "http://localhost:3001/api/posts/" + route.params?.slug
);
if (error.value) {
  throw showError({
    statusCode: 404,
    statusMessage: "Post not found",
    message: "Пост не найден",
  });
}
useHead({
  title: `greenbabypost - ${post.value.title}`,
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

const parser = new Markdown({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});
const mdContent = parser.render(post.value?.mdContent);
</script>

<style scoped lang="scss">
// @use "@/assets/scss/mixins" as *;

.post {
  &__container {
    margin-bottom: 50px;
  }
  &__top {
    // display: flex;

    // flex-direction: column;
    // align-items: center;
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
    // @include adaptiveValue("font-size", 48, 40);
    font-size: 48px;
  }
  &__date {
    color: #888;
    // align-self: flex-end;
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
    // display: inline-block;
    // text-indent: 20px;
    line-height: normal;
    width: 100%;
    // text-align: justify;
    // color: #888;
    // color: #fafafa;
    // font-family: "Courier New";
    line-height: 1.45;
    margin: 2rem auto 1rem;
    // max-width: 48rem;
    padding: 0.25rem;
    font-size: 18px;
    min-height: 100%;
  }
}
</style>
