<template>
  <label :for="props.forid">
    {{ props.label }}
    <input
      :value="props.modelValue"
      @input="(event: any) => emits('update:modelValue', event.target.value)"
      :id="props.forid"
      :type="props.type"
      :name="props.name"
      :autofocus="props.autofocus"
      :placeholder="props.placeholder"
    />
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | null;
  label?: string;
  type: string;
  forid?: string;
  name?: string;
  autofocus?: boolean;
  placeholder?: string;
}
const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);
// const props = defineProps({
//   label: { type: String, required: false },
//   type: { type: String, required: true },
//   name: { type: String, required: false },
// });
// console.log(props.label);
</script>

<style scoped lang="scss">
label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  input {
    // background: var(--text-color);
    // color: var(--bg-color);
    &:focus {
      // border: 2px solid var(--main-color);
      box-shadow: 0 0 10px 2px var(--main-color);
      // outline: 3px solid #00a550;
    }
    &:disabled {
      // border: 2px solid gray;
    }
    // background: none;
    margin-top: 3px;
    padding: 0.375rem 0.75rem;
    background: #f7fff7;
    box-shadow: 0 0 0px 2px var(--text-color);
    // border: 2px solid black;
    //  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
    border-radius: 0.25rem;
    transition: box-shadow 0.3s ease 0s;
    @media (max-width: 320px) {
      width: 100%;
    }
  }
}
</style>
