<template>
  <div class="dash">
    <div class="dash__container">
      <div class="dash__left">
        <h2 class="dash__title">Написать пост:</h2>
        <form class="dash__form post-form" action="#">
          <FormInput
            class="post-form__title"
            v-model="postTitle"
            name="title"
            forid="title"
            type="text"
            label="Заголовок"
            :autofocus="true"
          />
          <client-only>
            <FormTextarea
              v-model="previewMD"
              forid="textarea"
              name="textarea"
              label="Содержание поста"
              class="post-form__textarea"
              rows="8"
            ></FormTextarea>

            <FormTextarea
              v-model="rawContent"
              forid="textarea"
              name="textarea"
              label="Краткое описание"
              class="post-form__textarea"
            ></FormTextarea>
          </client-only>
          <FormInput
            class="post-form__slug"
            v-model="postSlug"
            name="slug"
            forid="slug"
            type="text"
            label="Слаг"
          />
          <div class="post-form__photo">
            <SelectFile
              @file-photo="(e) => (filePhoto = e)"
              @src-photo="(e) => (srcPhoto = e)"
              @drag-and-drop="(e) => (dragAndDrop = e)"
              @drag-leave="(e) => (dragLeave = e)"
              @drag-over="(e) => (dragOver = e)"
              @remove-photo="(e) => (removePhoto = e)"
            ></SelectFile>
          </div>
          <FormButton @click.prevent="submit" class="post-form__btn"
            >Создать</FormButton
          >
        </form>
      </div>
      <div class="dash__right">
        <h2 class="dash__title">Предпросмотр:</h2>
        <div class="post-form__preview post-preview">
          <h2 v-if="postTitle" class="post-preview__title">
            {{ postTitle }}
          </h2>
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
          <div
            v-if="postContent"
            class="post-preview__content"
            v-html="postContent"
            id="post__content"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Markdown from "markdown-it";
import { ref, watch } from "vue";
import slugify from "slugify";

useHead({
  title: "greenbabydashboard",
  meta: [{ name: "description", content: "зёленый родился блог" }],
});
definePageMeta({
  layout: "admin",
  // @ts-ignore
  middleware: "auth",
});

const postTitle = ref("");
const postSlug = ref("");
const postContent = ref("");
const rawContent = ref("");
const previewMD = ref("");

let srcPhoto = useState<string | null>("srcPhoto");
let filePhoto = useState<any>();
let dragAndDrop = () => {};
let dragLeave = () => {};
let dragOver = () => {};
let removePhoto = () => {};
const { getSession } = useAuth();
// console.log(await getSession());
const submit = async () => {
  let formData = new FormData();

  formData.append("photo", filePhoto.value);
  formData.append("title", postTitle.value);
  formData.append("slug", postSlug.value);
  formData.append("rawContent", rawContent.value);
  formData.append("mdContent", postContent.value);
  const { data, error }: any = await useFetch(
    "http://localhost:3001/api/posts",
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
  }
};

const parser = new Markdown({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

watch(previewMD, () => {
  postContent.value = parser.render(previewMD.value);
});

watch(postTitle, () => {
  postSlug.value = slugify(postTitle.value, { strict: true });
});

// const generateSlug = () => {
//   if (postTitle.value) {
//     postSlug.value = slugify(postTitle.value, { strict: true });
//   }
//   return;
// };
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
    max-width: 1200px;
    display: flex;
    gap: 3rem;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
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
  gap: 20px;

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
      text-overflow: "...";
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
