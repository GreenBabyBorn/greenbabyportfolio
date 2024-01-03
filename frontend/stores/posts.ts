import { defineStore } from "pinia";

export interface Post {
  id: number;
  title: string;
  rawContent: string;
  mdContent: string;
  slug: string;
  published: boolean;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export const usePostsStore = defineStore("posts", {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    removePost(post: Post) {
      this.posts = this.posts.filter((el) => {
        return el !== post;
      });
    },
    updatePost(post: Post) {
      this.posts.forEach((o) => {
        if (o.slug === post.slug) {
          o = post;
        }
      });
    },
  },
});
