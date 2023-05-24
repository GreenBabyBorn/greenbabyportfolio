<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// definePageMeta({
//   middleware: "init-auth",
// });
// const { getUser } = useAuth();

// onServerPrefetch(() => {
//   initAuth();
// });
// onBeforeMount(async () => {
//   await getUser();
// });
</script>

<style lang="scss">
@use "@/assets/scss/null" as *;
@use "@/assets/scss/style" as *;
@use "@/assets/scss/markdown" as *;
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
