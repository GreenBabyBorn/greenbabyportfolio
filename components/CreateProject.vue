<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/base16/material.css";
import Markdown from "markdown-it";
import slugify from "slugify";
import { useNotificationStore } from "~/stores/notifications";
import { useProjectsStore } from "~/stores/projects";

const projectsStore = useProjectsStore();
const notificationStore = useNotificationStore();

let fileInput = ref<HTMLInputElement>();
// let projectImg = ref();
let fileImg = ref();

const createProjectFormSchema = {
  projectTitle: (value: string) => {
    if (!value) return "❌ проект без заголовка?";
    return true;
  },
  projectSlug: (value: string) => {
    if (!value) return "❌ подумай над слагом";
    return true;
  },
  projectContent: (value: string) => {
    if (!value) return "❌ no way";
    return true;
  },
  projectLink: (value: string) => {
    if (!value) return "❌ это поле обязательно";
    return true;
  },
  projectGit: (value: string) => {
    if (!value) return "❌ это поле обязательно";
    return true;
  },
  projectImg: (value: string) => {
    if (!value) return "❌ это поле обязательно";
    return true;
  },
};

const { meta, defineField, resetForm } = useForm({
  validationSchema: createProjectFormSchema,

  initialValues: {
    projectTitle: "",
    projectSlug: "",
    projectContent: "",
    projectGit: "",
    projectLink: "",
    projectImg: "",
  },
});

const [projectTitle, projectTitleAttrs] = defineField("projectTitle");
const [projectSlug, projectSlugAttrs] = defineField("projectSlug");
const [projectContent, projectContentAttrs] = defineField("projectContent");
const [projectGit, projectGitAttrs] = defineField("projectGit");
const [projectLink, projectLinkAttrs] = defineField("projectLink");

const [projectImg] = defineField("projectImg");

const { handleFileInput, files } = useFileStorage();

const submitHandle = async () => {
  try {
    const project = await $fetch("/api/projects", {
      method: "POST",
      body: {
        title: projectTitle.value,
        slug: projectSlug.value,
        git: projectGit.value,
        link: projectLink.value,
        content: projectContent.value,
        img: files.value,
      },
    });
    notificationStore.pushNotification({
      title: "Успешно!",
      status: true,
      text: "Проект успешно добавлен",
    });
    projectsStore.projects.unshift(project as any);
    clearForm();
  } catch (e) {
    console.log(e);
  }
};

watch(projectTitle, () => {
  projectSlug.value = slugify(projectTitle.value, { strict: true });
});

const clearForm = () => {
  resetForm();
  fileInput.value!.value = "";
  projectImg.value = "";
};

let changeFileInput = (event: any) => {
  let files = Array.from(!event.target?.files ? event : event.target.files);
  files.forEach((file: any) => {
    if (!file.type.match("image")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      projectImg.value = ev.target.result;
    };
    reader.readAsDataURL(file);
    fileImg.value = file;
  });
};

const clearSrcImg = () => {
  projectImg.value = "";
  fileInput.value!.value = "";
};
</script>

<template>
  <div class="dash">
    <div class="dash__container">
      <div class="dash__left">
        <h2 class="dash__title">Добавить проект</h2>
        <form class="dash__form project-form">
          <FormInput
            class="project-form__title"
            v-model="projectTitle"
            v-bind="projectTitleAttrs"
            name="projectTitle"
            forid="title"
            type="text"
            placeholder="Заголовок"
            :autofocus="true"
            success-message="✔️ топовый заголовок"
          />
          <FormInput
            class="project-form__title"
            v-model="projectLink"
            v-bind="projectLinkAttrs"
            name="projectLink"
            forid="title"
            type="text"
            placeholder="Ссылка на дэмо"
            :autofocus="true"
            success-message="✔️топ"
          />
          <FormInput
            class="project-form__title"
            v-model="projectGit"
            v-bind="projectGitAttrs"
            name="projectGit"
            forid="title"
            type="text"
            placeholder="GitHub"
            :autofocus="true"
            success-message="✔️ топ"
          />
          <!-- label="Заголовок" -->
          <client-only>
            <FormTextarea
              v-model="projectContent"
              v-bind="projectContentAttrs"
              forid="projectContent"
              name="projectContent"
              placeholder="Описание проекта"
              class="project-form__textarea"
              rows="8"
              success-message="✔️ ниче такой пост"
            ></FormTextarea>
          </client-only>
          <FormInput
            class="project-form__slug"
            v-model="projectSlug"
            v-bind="projectSlugAttrs"
            name="projectSlug"
            placeholder="Слаг"
            forid="slug"
            type="text"
            success-message="✔️ звучит красиво"
          />
          <!-- label="Слаг" -->
          <div class="project-form__photo">
            <input
              ref="fileInput"
              @change="changeFileInput"
              name="fileInput"
              type="file"
              @input="handleFileInput"
              accept=".jpg, .jpeg, .png, .gif"
            />
            <!-- <SelectFile
              @file-photo="(e) => (filePhoto = e)"
              @src-photo="(e) => (srcPhoto = e)"
              @drag-and-drop="(e) => (dragAndDrop = e)"
              @drag-leave="(e) => (dragLeave = e)"
              @drag-over="(e) => (dragOver = e)"
              @remove-photo="(e) => (removePhoto = e)"
              @drag-btn-text="(e) => (dragBtnText = e)"
              name="selectFile"
              success-message="✔️ фото успешно выбрано"
            ></SelectFile> -->
          </div>
          <div class="project-form__btns">
            <FormButton
              type="submit"
              @click.prevent="submitHandle"
              class="project-form__btn"
              :disabled="!meta.dirty || !meta.valid"
              >Создать</FormButton
            >
            <FormButton
              class="project-form__clear-btn"
              @click.prevent="clearForm"
              >Очистить форму</FormButton
            >
          </div>
        </form>
      </div>
      <div class="dash__right">
        <h2 class="dash__title">Предпросмотр:</h2>
        <div class="project-form__preview project-preview">
          <h2 v-if="projectTitle" class="project-preview__title">
            {{ projectTitle }}
          </h2>
          <Transition>
            <div v-if="projectImg" class="project-form__photo-preview">
              <div class="preview-remove">
                <p>{{ fileImg?.name }}</p>
                <span @click="clearSrcImg">&times;</span>
              </div>
              <img :src="projectImg" />
            </div>
          </Transition>
          <client-only>
            <div
              v-show="projectContent"
              class="project-preview__content markdown-body"
              v-html="projectContent"
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
.project-form {
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
.project-preview {
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
