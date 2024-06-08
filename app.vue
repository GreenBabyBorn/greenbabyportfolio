<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <AppNotification> </AppNotification>
</template>

<script setup lang="ts"></script>

<style lang="scss">
@use "@/assets/scss/null" as *;
@use "@/assets/scss/style" as *;
@use "@/assets/scss/markdown" as *;
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
  // transform: rotate3d(1, 1, 1, 10deg);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
