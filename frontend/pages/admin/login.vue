<template>
  <div class="login">
    <div class="login__container">
      <div class="login__body">
        <!-- {{ status }} -->
        <h2 class="login__title">ВХОД</h2>
        <!-- {{ user.data.value ? "auth" : "not auth" }} -->
        <form class="login__form">
          <FormInput
            v-model="username"
            name="username"
            type="text"
            placeholder="логин"
          />
          <FormInput
            v-model="password"
            name="password"
            type="password"
            placeholder="пароль"
          />
          <!-- <button @click.prevent="logout">выйти</button> -->
          <FormButton
            type="submit"
            @click.prevent="submit"
            class="login__button"
            >авторизоваться</FormButton
          >
        </form>
        <ColorToggle class="footer__color"></ColorToggle>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/admin/dashboard",
  },
  // @ts-ignore
  middleware: "auth",
  layout: "empty",
});
useHead({
  title: "greenbabylogin",
});

const username = ref("");
const password = ref("");

const { status, signIn } = useAuth();

const submit = async () => {
  const { error, url } = await signIn("credentials", {
    username: username.value,
    password: password.value,
    callbackUrl: "/admin/dashboard",
    redirect: false,
  });
  if (error) {
    // Do your custom error handling here
    alert("You have made a terrible mistake while entering your credentials");
  } else {
    // No error, continue with the sign in, e.g., by following the returned redirect:
    console.log(url);
    return navigateTo(url, { external: true });
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
    gap: 1rem;
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
    margin-top: 0.6em;
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
</style>
