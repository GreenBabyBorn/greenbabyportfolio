<template>
  <div class="dash">
    <div class="dash__container">
      <div class="dash__left">
        <h2 class="dash__title">Редкатировать пост:</h2>
        <form class="dash__form post-form" action="#">
          <FormInput
            class="post-form__title"
            v-model="postTitle"
            name="postTitle"
            forid="title"
            type="text"
            placeholder="Заголовок"
            :autofocus="true"
            success-message="✔️ топовый заголовок"
          />
          <!-- label="Заголовок" -->
          <client-only>
            <FormTextarea
              v-model="previewMD"
              forid="previewMD"
              name="previewMD"
              placeholder="Содержание поста (MarkDown)"
              class="post-form__textarea"
              rows="8"
              success-message="✔️ ниче такой пост"
            ></FormTextarea>
            <!-- label="Содержание поста" -->

            <FormTextarea
              v-model="rawContent"
              forid="rawContent"
              name="rawContent"
              placeholder="Краткое описание"
              class="post-form__textarea"
              success-message="✔️ краткость сестра таланта"
            ></FormTextarea>
            <!-- label="Краткое описание" -->
          </client-only>
          <FormInput
            class="post-form__slug"
            v-model="postSlug"
            name="postSlug"
            placeholder="Слаг"
            forid="slug"
            type="text"
            success-message="✔️ звучит красиво"
          />
          <!-- label="Слаг" -->
          <div class="post-form__photo">
            <SelectFile
              @file-photo="(e) => (filePhoto = e)"
              @src-photo="(e) => (srcPhoto = e)"
              @drag-and-drop="(e) => (dragAndDrop = e)"
              @drag-leave="(e) => (dragLeave = e)"
              @drag-over="(e) => (dragOver = e)"
              @remove-photo="(e) => (removePhoto = e)"
              @drag-btn-text="(e) => (dragBtnText = e)"
              name="selectFile"
              success-message="✔️ фото успешно выбрано"
            ></SelectFile>
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
        <div class="post-form__preview post-preview">
          <h2 v-if="postTitle" class="post-preview__title">
            {{ postTitle }}
          </h2>
          <img :src="`${config.public.restApiUrl}/` + post.photo" alt="" />
          <Transition>
            <div v-if="srcPhoto" class="post-form__photo-preview">
              <div class="preview-remove">
                <p>{{ filePhoto.name }}</p>
                <span @click="removePhoto">&times;</span>
              </div>

              <img
                @drop.prevent="dragAndDrop"
                @dragover.prevent="dragOver"
                @dragleave="dragLeave"
                :src="srcPhoto"
                :alt="filePhoto.name"
              />
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

<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/base16/material.css";
import Markdown from "markdown-it";
import { ref, watch } from "vue";
import slugify from "slugify";
import { useNotificationStore } from "~/stores/notifications";

import {
  useField,
  useIsFieldValid,
  useForm,
  useIsFieldDirty,
  useFieldValue,
} from "vee-validate";

const config = useRuntimeConfig();

useHead({
  title: "greenbabydashboard",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const route = useRoute();
const { data: post, error }: any = await useFetch(
  `${config.public.restApiUrl}/posts/` + route.params?.slug
);

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

const notificationStore = useNotificationStore();

const createPostFormSchema = {
  postTitle(value: string) {
    if (!value) return "❌ пост без заголовка?";

    return true;
  },
  postSlug(value: string) {
    if (!value) return "❌ подумай над слагом, бро";

    return true;
  },
  previewMD(value: string) {
    if (!value) return "❌ no way";

    return true;
  },
  rawContent(value: string) {
    if (!value) return "❌ это поле обязательно";

    return true;
  },
  selectFile(value: string) {
    if (!value) return "❌ фото обязательно";

    return true;
  },
};
const { errors, useFieldModel, meta, validate, setErrors, resetForm } = useForm(
  {
    validationSchema: createPostFormSchema,

    initialValues: {
      postTitle: post.value.title,
      postSlug: post.value.slug,
      previewMD: post.value.mdContent,
      rawContent: post.value.rawContent,
      selectFile: "",
    },
  }
);
const [postTitle, postSlug, previewMD, rawContent, selectFile] = useFieldModel([
  "postTitle",
  "postSlug",
  "previewMD",
  "rawContent",
  "selectFile",
]);

let srcPhoto = useState<string | null>("srcPhoto");

let filePhoto = useState<any>();
let dragAndDrop = () => {};
let dragLeave = () => {};
let dragOver = () => {};
let removePhoto = () => {};
let dragBtnText = useState<any>();
const { getSession } = useAuth();

const submitHandle = async () => {
  const { data: postData }: any = await useFetch(
    `${config.public.restApiUrl}/posts`,
    {
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer " + ((await getSession()) as any).user.accessToken,
      },
      body: {
        title: postTitle.value,
        slug: postSlug.value,
        rawContent: rawContent.value,
        mdContent: postContent.value,
        published: true, // TODO:
      },
    }
  );
  let formData = new FormData();
  formData.append("photo", filePhoto.value);
  const { data, error }: any = await useFetch(
    `${config.public.restApiUrl}/posts/${postData.value.slug}/photo`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "Bearer " + ((await getSession()) as any).user.accessToken,
      },
    }
  );

  if (data) {
    useRouter().push({ path: "/blog/" + data.value?.slug });
    notificationStore.pushNotification({
      title: "Великолепно!",
      status: true,
      text: "Пост успешно добавлен 👌",
    });
    clearForm();
  }
};

const postContent = computed(() => {
  return parser.render(previewMD.value);
});
// watch(previewMD, () => {
//   postContent.value = parser.render(previewMD.value);
// });

watch(postTitle, () => {
  postSlug.value = slugify(postTitle.value, { strict: true });
});

// const generateSlug = () => {
//   if (postTitle.value) {
//     postSlug.value = slugify(postTitle.value, { strict: true });
//   }
//   return;
// };
const clearForm = () => {
  resetForm();
  srcPhoto.value = null;
  dragLeave();
};
</script>

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
  margin-top: 20px;
  margin-bottom: 20px;
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

<!-- <template>
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
        <div class="post__content markdown-body" v-html="mdContent"></div>
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
</style> -->
