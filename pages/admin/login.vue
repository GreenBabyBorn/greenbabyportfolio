<template>
  <div class="login">
    <div class="login__container">
      <div class="login__body">
        <!-- {{ status }} -->
        <!-- <h2 class="login__title">вход</h2> -->
        <!-- {{ user.data.value ? "auth" : "not auth" }} -->
        <form class="login__form">
          <input name="csrfToken" type="hidden" :value="CSRF">
          <FormInput
            name="username"
            type="text"
            placeholder="логин"
            success-message="✔️ вроде, всё правильно"
            :maxlength="10"
            autofocus
          />

          <!-- <span>{{ errors.username }}</span> -->
          <FormInput
            name="password"
            type="password"
            placeholder="пароль"
            success-message="✔️ надеюсь не ошибся"
          />
          <!-- <span>{{ errors.password }}</span> -->
          <!-- <button @click.prevent="logout">выйти</button> -->
          <FormButton
            @click.prevent="submitHandle"
            class="login__button"
            :disabled="!meta.dirty || !meta.valid"
            >войти</FormButton
          >
          <div class="login__divider"></div>
        <button @click.prevent="signIn('github')" class="login__github">
          <span>GitHub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <path
                d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"
              fill="var(--text-color)" ></path>
            </svg>
          </button>
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

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifications";
definePageMeta({
  layout: "empty",
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/admin/dashboard",
  },
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
      return "❌ мало букав";
    }
    if (value.length > 10) {
      return "❌ многа букав";
    }
    return true;
  },
  password(value: string) {
    if (!value) {
      return "❌ без пароля никак";
    }
    return true;
  },
};

const { errors, defineField,  meta, validate, setErrors } = useForm({
  validationSchema: loginFormSchema,

  initialValues: {
    username: "",
    password: "",
  },
});
const [username] = defineField("username");
const [password] = defineField("password");

const { status, signIn, getCsrfToken   } = useAuth();
const CSRF = await getCsrfToken()
const { pushNotification } = useNotificationStore();
const submitHandle = async () => {
  if ((await validate()).valid) {
    const { status, ok, error, errors, url} = await signIn("credentials", {
      username: username.value,
      password: password.value,
      callbackUrl: "/admin/dashboard",
      redirect: false,
    });
    if (error) {
      console.log(errors);
      pushNotification({
        status: false,
        text: error,
        title: "Ошибка",
      });

      setErrors({
        username: "бро,",
        password: "надо тренироваться",
      });
    } else {
      return navigateTo(url, { external: true });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  // background: rgb(174, 238, 186);
  // background: radial-gradient(
  //   circle,
  //   var(--main-color) 0%,
  //   var(--bg-color) 100%
  // );
  &__divider{
    margin: 2rem 0;
    width: 100%;
    height: 1px;
    background: var(--text-color);
    overflow: visible;
    text-align: center;
    &::before{
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
