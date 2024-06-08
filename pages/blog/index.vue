<template>
  <div>
    <div class="blog">
      <!-- <div class="blog__container"> -->
      <!-- <h2>{{ !postsStore.posts.length ? "Постов нет" + "" : "" }}</h2> -->
      <TransitionGroup tag="div" name="fade" class="blog__container">
        <PreviewPost
          v-for="post in postsStore.posts"
          :key="post.id"
          :link="'/blog/' + post.slug"
          :title="post.title"
          :mdContent="post.mdContent"
          :rawContent="post.rawContent"
          :date="post.createdAt"
          :imgsrc="post.photo || noImage"
          :isAuth="status == 'authenticated' ? true : false"
          :slug="post.slug"
          :post="post"
          :published="post.published"
          @updatePublished="updatePublished"
        />
      </TransitionGroup>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { TransitionGroup } from "vue";
import { Post, usePostsStore } from "~/stores/posts";
import noImage from "assets/img/no-image.jpg";
const config = useRuntimeConfig();
useHead({
  title: "greenbabyblog",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

const postsStore = usePostsStore();
const { status, getSession } = useAuth();
let postsUrl = `${config.public.restApiUrl}/posts`;

if (status.value == "authenticated") {
  postsUrl = `${config.public.restApiUrl}/posts/all`;
}
const { data: posts, error }: any = await useFetch(postsUrl, {
  headers:
    status.value == "authenticated"
      ? {
          Authorization:
            "Bearer " + ((await getSession()) as any).user.accessToken,
        }
      : {},
});
postsStore.posts = posts.value;

const updatePublished = (post: Post) => {
  post.published = !post.published;
};
</script>

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
