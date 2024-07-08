<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifications";
definePageMeta({
  layout: "empty",
  middleware: "guest",
});
useHead({
  title: "greenbabylogin",
});

import {
  useField,
  useIsFieldValid,
  useForm,
  useIsFieldDirty,
  useFieldValue,
} from "vee-validate";

const loginFormSchema = {
  username(value: string) {
    if (!value) {
      return "мало букав";
    }
    if (value.length > 10) {
      return "многа букав";
    }
    return true;
  },
  password(value: string) {
    if (!value) {
      return " без пароля никак";
    }
    return true;
  },
};

const { errors, defineField, meta, validate, setErrors  } = useForm({
  validationSchema: loginFormSchema,

  initialValues: {
    username: "",
    password: "",
  },
});
const [username] = defineField("username");
const [password] = defineField("password");

const { pushNotification } = useNotificationStore();

const error = ref<string | null>(null);
async function login(e: Event) {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        username: username.value,
        password: password.value,
      },
    });
    navigateTo("/");
  } catch (err: any) {
    setErrors({username: 'Что-то не так', password: 'Не повезло('});
    error.value = err.data?.message ?? null;
  }
}
</script>

<template>
  <div class="login">
    <div class="login__container">
      <div class="login__body">
        <!-- {{ status }} -->
        <!-- <h2 class="login__title">вход</h2> -->
        <!-- {{ user.data.value ? "auth" : "not auth" }} -->
        <form class="login__form" @submit.prevent="login">
          <FormInput
            name="username"
            type="text"
            placeholder="логин"
            success-message="вроде, всё правильно"
            :maxlength="10"
            autofocus
          />

          <!-- <span>{{ errors.username }}</span> -->
          <FormInput
            name="password"
            type="password"
            placeholder="пароль"
            success-message="надеюсь не ошибся"
          />
          <!-- <span>{{ errors.password }}</span> -->
          <!-- <button @click.prevent="logout">выйти</button> -->
          <FormButton
            class="login__button"
            :disabled="!meta.dirty || !meta.valid"
            >войти</FormButton
          >

          <NuxtLink class="login__return" to="/"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            на главную</NuxtLink
          >
        </form>

        <!-- <ColorToggle class="footer__color"></ColorToggle> -->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login {
  // background: rgb(174, 238, 186);
  // background: radial-gradient(
  //   circle,
  //   var(--main-color) 0%,
  //   var(--bg-color) 100%
  // );
  &__divider {
    margin: 2rem 0;
    width: 100%;
    height: 1px;
    background: var(--text-color);
    overflow: visible;
    text-align: center;
    &::before {
      font-size: 1rem;
      content: "или";
      position: relative;
      background: var(--bg-color);
      padding: 0 0.4rem;
      top: -0.7rem;
    }
  }
  &__github {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
  }
  &__container {
  }
  &__title {
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 65px;
  }
  &__body {
    display: flex;

    align-items: center;
    justify-content: center;
    height: 100vh;
    flex-direction: column;
  }
  &__form {
    // background: #b1b1b13f;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    display: flex;
    // gap: 0.3rem;
    flex-direction: column;
    // border: 1px solid black;
    // padding: 20px;
    border-radius: 0.25rem;
  }
  &__button {
    // box-shadow: 0 25px 50px -12px rgba(255, 255, 255, 0.25);
  }
  &__return {
    font-size: 1rem;
    &:focus {
      outline: 3px solid var(--main-color);
    }
    margin-top: 3rem;
    display: flex;
    align-items: center;
    align-self: self-start;
    gap: 5px;
  }
}
</style>
