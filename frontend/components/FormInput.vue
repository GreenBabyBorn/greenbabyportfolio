<template>
  <label :for="props.forid">
    {{ props.label }}
    <!-- @input="(event: any) => emits('update:modelValue', event.target.value)" -->
    <input
      :value="inputValue"
      :id="props.forid"
      :type="props.type"
      :name="props.name"
      :autofocus="props.autofocus"
      :placeholder="props.placeholder"
      :class="{ error: errorMessage }"
      :maxlength="props.maxlength"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p
      :class="{ error: errorMessage }"
      v-show="errorMessage || (meta.valid && meta.dirty)"
    >
      {{ errorMessage || successMessage }}
    </p>
  </label>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
// interface Props {
//   modelValue: string | null;
//   label?: string;
//   type: string;
//   forid?: string;
//   name?: string;
//   autofocus?: boolean;
//   placeholder?: string;
//   error?: boolean | string;
// }
interface Props {
  value?: string | null;
  label?: string;
  type: string;
  forid?: string;
  name: string;
  autofocus?: boolean;
  placeholder?: string;
  successMessage?: string;
  maxlength?: number;
}
const props = defineProps<Props>();
// const emits = defineEmits(["update:modelValue"]);
const name = toRef(props.name);
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});

// const props = defineProps({
//   label: { type: String, required: false },
//   type: { type: String, required: true },
//   name: { type: String, required: false },
// });
// console.log(props.label);
</script>

<style scoped lang="scss">
p {
  position: absolute;
  bottom: 5px;
  left: 0;
  color: var(--main-color);
  &.error {
    color: red;
  }
}

label {
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: relative;
  padding-bottom: 1.5rem;

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
    &.error {
      box-shadow: 0 0 10px 2px red !important;
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
