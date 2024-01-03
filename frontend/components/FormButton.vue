<template>
  <button @click="handleClick" class="form-btn"><slot /></button>
</template>

<script setup lang="ts">
const emits = defineEmits(["onClick"]);
function handleClick(event: Event) {
  emits("onClick", event);
}
</script>

<style scoped lang="scss">
.form-btn {
  font-size: 1rem;
  background: var(--text-color);
  color: var(--bg-color);
  padding: 0.5em 0.75em;
  border-radius: 70px;
  font-weight: bold;
  transition: all 0.3s ease 0s;

  &:disabled {
    opacity: 0.2;
  }
  &:hover:enabled,
  &:focus {
    transition: all 0.3s ease 0s;
    background: var(--bg-color);
    color: var(--text-color);
    box-shadow: 0 0 0px 2px var(--main-color);
  }

  @media (max-width: 320px) {
    width: 100%;
  }
}
</style>
