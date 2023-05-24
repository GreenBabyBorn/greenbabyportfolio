<template>
  <label :for="props.forid">
    {{ props.label }}
    <textarea
      :value="props.modelValue"
      @input="(event: any) => emits('update:modelValue', event.target.value)"
      name=""
      :id="props.forid"
      cols="30"
      :rows="props.rows"
    >
    </textarea>
  </label>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string | number | string[] | undefined;
  label?: string;
  name: string;
  forid: string;
  rows?: string;
}
const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);
</script>
<style scoped lang="scss">
label {
  font-size: 1rem;
}
textarea {
  // border: 2px solid black;
  font-family: inherit;
  //   outline: 1px solid black;
  margin-top: 10px;
  resize: vertical;
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  transition: box-shadow 0.3s ease 0s;
  background: #f7fff7;
  box-shadow: 0 0 0px 2px var(--text-color);
  // box-shadow: 0 0 1px 2px var(--main-color);
  &:focus {
    // border: 2px solid var(--main-color);
    box-shadow: 0 0 10px 2px var(--main-color);
    //  outline: 3px solid #00a550;
  }
}
</style>
