<template>
  <label :for="props.forid">
    <span v-if="props.label">{{ props.label }}</span>
    <textarea
      :value="inputValue"
      :name="props.name"
      :id="props.forid"
      cols="30"
      :rows="props.rows"
      :class="{ error: errorMessage }"
      @input="handleChange"
      @blur="handleBlur"
      :placeholder="props.placeholder"
    >
    </textarea>
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
interface Props {
  value?: string | number | string[] | undefined;
  label?: string;
  name: string;
  forid: string;
  rows?: string;
  placeholder?: string;
  successMessage?: string;
}
const props = defineProps<Props>();

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
</script>
<style scoped lang="scss">
label {
  font-size: 1rem;
  position: relative;
  padding-bottom: 32px;

  span {
    margin-bottom: 10px;
  }

  textarea {
    font-family: inherit;
    resize: vertical;
    width: 100%;
    border-radius: 15px;
    padding: 10px;
    transition: box-shadow 0.3s ease 0s;
    // background: #f7fff7;
    background: var(--bg-color);
    color: var(--text-color);
    box-shadow: 0 0 0px 2px var(--text-color);
    &:focus {
      box-shadow: 0 0 0px 2px var(--main-color);
    }
    &.error {
      box-shadow: 0 0 0px 2px red !important;
      // background: #ffecec;
    }
  }

  p {
    position: absolute;
    bottom: 0px;
    left: 0;
    display: inline-block;
    padding: 8px 0;
    color: var(--main-color);

    &.error {
      color: red;
    }
  }
}
</style>
