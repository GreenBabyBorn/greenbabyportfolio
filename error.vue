<template>
  <NuxtLayout>
    <div class="error">
      <div class="error__container">
        <h1 class="error__title">{{ props.error.statusCode }}</h1>
        <span class="error__decriprtion">{{ props.error.message }}</span>
        <FormButton class="error__button" @click="goback()"
          >вернуться назад</FormButton
        >
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: {
      message: "12312312",
    },
  },
  //   statusMessage: {
  //     type: String,
  //     default: "Not Found",
  //   },
  //   statusCode: {
  //     type: String,
  //     default: 404,
  //   },
});

// console.log(props.message);

useHead({
  title: "greenbabyerror - " + props.error.statusCode,
});

const goback = () => {
  clearError();
  useRouter().back();
};
</script>

<style lang="scss">
.error {
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //  gap: 40px;
    height: 60vh;
  }
  &__title {
    font-weight: bold;
    font-size: 48px;
    margin-bottom: 15px;
    text-align: center;
  }
  &__decriprtion {
    font-size: 32px;
    font-family: Consolas;
    margin-bottom: 20px;
  }
  &__button {
    background: var(--text-color);
    padding: 0.5rem 0.75rem;
    color: var(--bg-color);
    border-radius: 70px;
    font-weight: bold;
    transition: all 0.8s ease 0s;
    border: 1px black solid;
    &:hover {
      transition: all 0.3s ease 0s;
      background: #98fb98;
      color: black;

      // outline: 1px black solid;
    }
    @media (max-width: 320px) {
      width: 100%;
    }
  }
}
</style>
