<script setup lang="ts">
import { TransitionGroup } from "vue";
import { usePostsStore } from "~/stores/posts";
import noImage from "assets/img/no-image.jpg";

useHead({
  title: "greenbabyblog",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

const postsStore = usePostsStore();

const { data: posts, error }: any = await useFetch("/api/posts");
postsStore.posts = posts.value;

const updatePublished = (post: any) => {
  post.published = !post.published;
};

const user = useUser();
</script>

<template>
  <div>
    <CreatePost v-if="user"></CreatePost>
    <div class="blog">
      
      <TransitionGroup tag="div" name="fade" class="blog__container">
        <h1 class="blog__empty" v-if="!postsStore.posts?.length">Постов пока нет..</h1>
        <PreviewPost
          v-for="post in postsStore.posts"
          :key="post.id"
          :link="'/blog/' + post.slug"
          :title="post.title"
          :mdContent="post.md"
          :rawContent="post.description"
          :date="post.createdAt"
          :imgsrc="post.img || noImage"
          :isAuth="true"
          :slug="post.slug"
          :post="post"
          :published="post.published"
          @updatePublished="updatePublished"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

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
  &__empty  {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary);

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
