<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/base16/material.css";
import Markdown from "markdown-it";
import noImage from "assets/img/no-image.jpg";

const route = useRoute();
const { data: post, error }: any = await useFetch(
  `/api/posts/${route.params?.slug}`
);

if (!post.value) {
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
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
});
const mdContent = parser.render(post.value?.md);


useSeoMeta({
  title: `greenbabypost - ${post.value.title}`,
  ogTitle: post.value.title ,
  description: "зёленый блог",
  ogDescription: post.value.rawContent,
  ogImage: post.value.photo,
});
</script>

<template>
  <section class="post">
    <div class="post__container">
      <div class="post__top">
        <div class="post__body">
          <h1 class="post__title">{{ post?.title }}</h1>
        </div>
        <div class="post__img">
          <img :src="post?.img || noImage" alt="Картинка поста" />
        </div>
      </div>
      <div class="post__bottom">
        <client-only>
          <div class="post__content markdown-body" v-html="mdContent"></div>
        </client-only>
        <span class="post__date">{{
          dateFormat.format(new Date(post?.createdAt))
        }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.post {
  &__container {
    margin-bottom: 50px;
  }
  &__top {
  }
  &__img {
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
    // text-align: center;
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
