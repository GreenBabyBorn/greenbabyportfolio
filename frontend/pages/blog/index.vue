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
          :imgsrc="`${config.public.restApiUrl}/` + post.photo"
          :isAuth="status == 'authenticated' ? true : false"
          :slug="post.slug"
          :post="post"
        />
      </TransitionGroup>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { TransitionGroup } from "vue";
import { usePostsStore } from "~/stores/posts";
const config = useRuntimeConfig();
useHead({
  title: "greenbabyblog",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

const postsStore = usePostsStore();
const { status } = useAuth();

const { data: posts, error }: any = await useFetch(
  `${config.public.restApiUrl}/posts`
);
postsStore.posts = posts.value;
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
