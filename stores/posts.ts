import { defineStore } from "pinia";

export interface Post {
  id: number;
  title: string;
  description: string;
  md: string;
  slug: string;
  published: boolean;
  img: string;
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
