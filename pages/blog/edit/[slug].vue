<script setup lang="ts">
import type { Post } from "@prisma/client";
import hljs from "highlight.js";
import "highlight.js/styles/base16/material.css";
import Markdown from "markdown-it";
import slugify from "slugify";
import { useNotificationStore } from "~/stores/notifications";

useHead({
  title: "greenbabydashboard",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

definePageMeta({
  layout: "admin",
  middleware: "protected",
});

let fileInput = ref<HTMLInputElement>();
let fileImg = ref();

const route = useRoute();

const notificationStore = useNotificationStore();

const createPostFormSchema = {
  postTitle: (value: string) => {
    if (!value) return "❌ пост без заголовка?";
    return true;
  },
  postSlug: (value: string) => {
    if (!value) return "❌ подумай над слагом, бро";
    return true;
  },
  postMd: (value: string) => {
    if (!value) return "❌ no way";
    return true;
  },
  postDescription: (value: string) => {
    if (!value) return "❌ это поле обязательно";
    return true;
  },
};

const { data: post } = await useFetch<any>(`/api/posts/${route.params.slug}`);

const { meta, defineField, resetForm } = useForm({
  validationSchema: createPostFormSchema,

  initialValues: {
    postTitle: post.value.title,
    postSlug: post.value.slug,
    postMd: post.value.md,
    postDescription: post.value.description,
    postImg: post.value.img,
  },
});

const [postTitle, postTitleAttrs] = defineField("postTitle");
const [postSlug, postSlugAttrs] = defineField("postSlug");
const [postMd, postMdAttrs] = defineField("postMd");
const [postDescription, postDescriptionAttrs] = defineField("postDescription");
const [postImg] = defineField("postImg");

const { handleFileInput, files } = useFileStorage();

const submitHandle = async () => {
  try {
    await $fetch(`/api/posts/` + post.value.slug, {
      method: "PATCH",
      body: {
        title: postTitle.value,
        slug: postSlug.value,
        description: postDescription.value,
        md: postMd.value,
        img: files.value.length > 0 ? files.value : post.value.img,
      },
    });
    notificationStore.pushNotification({
      title: "Великолепно!",
      status: true,
      text: "Пост успешно обновлен",
    });
    navigateTo(`/blog/${postSlug.value}`);
    clearForm();
  } catch (e) {
    console.log(e);
  }
};

const parser = new Markdown({
  // html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
});

const postContent = computed(() => {
  return parser.render(postMd.value);
});

watch(postTitle, () => {
  postSlug.value = slugify(postTitle.value, { strict: true });
});

let changeFileInput = (event: any) => {
  let files = Array.from(!event.target?.files ? event : event.target.files);
  files.forEach((file: any) => {
    if (!file.type.match("image")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      postImg.value = ev.target.result;
    };
    reader.readAsDataURL(file);
    fileImg.value = file;
  });
};

const clearForm = () => {
  resetForm();
};

const clearSrcImg = () => {
  postImg.value = "";
  if (fileInput.value) fileInput.value!.value = "";
};
</script>

<template>
  <div class="dash">
    <div class="dash__container">
      <div class="dash__left">
        <h2 class="dash__title">Редактирование</h2>
        <form class="dash__form post-form">
          <FormInput
            class="post-form__title"
            v-model="postTitle"
            v-bind="postTitleAttrs"
            name="postTitle"
            forid="title"
            type="text"
            placeholder="Заголовок"
            :autofocus="true"
            success-message="✔️ топовый заголовок"
          />

          <client-only>
            <FormTextarea
              v-model="postMd"
              v-bind="postMdAttrs"
              forid="postMd"
              name="postMd"
              placeholder="Содержание поста (MarkDown)"
              class="post-form__textarea"
              rows="8"
              success-message="✔️ ниче такой пост"
            ></FormTextarea>

            <FormTextarea
              v-model="postDescription"
              v-bind="postDescriptionAttrs"
              forid="postDescription"
              name="postDescription"
              placeholder="Краткое описание"
              class="post-form__textarea"
              success-message="✔️ краткость сестра таланта"
            ></FormTextarea>
          </client-only>
          <FormInput
            class="post-form__slug"
            v-model="postSlug"
            v-bind="postSlugAttrs"
            name="postSlug"
            placeholder="Слаг"
            forid="slug"
            type="text"
            success-message="✔️ звучит красиво"
          />
          <div class="post-form__photo">
            <input
              @change="changeFileInput"
              name="selectFile"
              type="file"
              @input="handleFileInput"
            />
          </div>
          <div class="post-form__btns">
            <FormButton
              type="submit"
              @click.prevent="submitHandle"
              class="post-form__btn"
              :disabled="!meta.dirty || !meta.valid"
              >Обновить</FormButton
            >
            <FormButton class="post-form__clear-btn" @click.prevent="clearForm"
              >Очистить форму</FormButton
            >
          </div>
        </form>
      </div>
      <div class="dash__right">
        <h2 class="dash__title">Предпросмотр:</h2>
        <div v-if="postImg" class="post-form__preview post-preview">
          <h2 v-if="postTitle" class="post-preview__title">
            {{ postTitle }}
          </h2>
          <Transition>
            <div class="post-form__photo-preview">
              <div class="preview-remove">
                <p>{{ fileImg?.name }}</p>
                <span @click="clearSrcImg">&times;</span>
              </div>
              <img :src="postImg" />
            </div>
          </Transition>
          <client-only>
            <div
              v-show="postContent"
              class="post-preview__content markdown-body"
              v-html="postContent"
            ></div>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.dash {
  &__container {
    // max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    //   margin-top: 20px;
    // margin-bottom: 20px;
    // @media screen and (max-width: 767px) {
    //   flex-direction: column;
    // }
  }
  &__left {
    flex: 0 0 50%;
  }
  &__right {
    flex: 0 0 50%;
  }

  &__title {
    font-size: 40px;
    font-weight: 800;
    text-align: left;
    margin-bottom: 30px;
    // font-size: rem(48);
  }
}
.post-form {
  display: flex;
  flex-direction: column;
  // gap: 20px;
  &__btn {
  }
  &__clear-btn {
    // background: rgb(225, 106, 106);
    color: var(--text-color);
    background: transparent;
    &:hover:enabled,
    &:focus {
      transition: all 0.3s ease 0s;
      background: var(--bg-color);
      color: var(--text-color);
      // border: 2px var(--main-color) solid;
      box-shadow: 0 0 0px 2px var(--main-color);
      // outline: 1px black solid;
    }
  }
  &__btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  &__photo-preview {
    position: relative;
    margin-top: 20px;
    transition: all 0.5s ease 0s;
    &:hover .preview-remove {
      opacity: 1;
    }
    img {
      // margin-top: 20px;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .preview-remove {
      transition: opacity 0.2s ease;
      opacity: 0;
      background: var(--bg-color);
      pointer-events: none;
      position: absolute;
      width: 100%;
      // text-overflow: "...";
      // height: 100%;
      color: var(--text-color);
      top: 0;
      left: 0;
      z-index: 6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      p {
        text-overflow: ellipsis;
        /* width: 100%; */
        white-space: nowrap;
        overflow: hidden;
      }
      span {
        &:hover {
          cursor: pointer;
        }
        pointer-events: all;
        font-size: 30px;
      }
    }
  }
  &__photo {
  }
  &__title {
    input {
      margin-top: 10px;
      padding: 0.375rem 0.75rem;
      border-radius: 5px;
      outline: 1px solid black;
      &:focus {
        outline: 3px solid #00a550;
      }
    }
    display: flex;
    flex-direction: column;
  }
  &__slug {
    input {
      margin-top: 10px;
      padding: 0.375rem 0.75rem;
      border-radius: 5px;
      outline: 1px solid black;
      &:focus {
        outline: 3px solid #00a550;
      }
    }
    display: flex;
    flex-direction: column;
  }
}
.post-preview {
  &__title {
    text-align: center;
    font-weight: bold;
    // @include adaptiveValue("font-size", 48, 40);
    font-size: 48px;
    // padding: 20px 0;
  }
  &__content {
    margin: 2rem auto 1rem;
  }
}
</style>
