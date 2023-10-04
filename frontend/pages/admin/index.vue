<template>
  <div class="admin">
    <div class="admin__container">
      <section class="admin__ password-manage password-manage">
        <h2 class="password-manage__title">Изменить пароль</h2>
        <div class="password-manage__body"></div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
</script>

<style lang="scss"></style>
