<template>
  <label :for="props.forid">
    <span v-if="props.label">{{ props.label }}</span>

    <!-- @input="(event: any) => emits('update:modelValue', event.target.value)" -->
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
// interface Props {
//   modelValue: string | number | string[] | undefined;
//   label?: string;
//   name: string;
//   forid: string;
//   rows?: string;
// }
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

// const emits = defineEmits(["update:modelValue"]);
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
    // margin: 2px;
    // border: 2px solid black;
    font-family: inherit;
    //   outline: 1px solid black;
    // margin-top: 10px;
    resize: vertical;
    width: 100%;
    border-radius: 15px;
    padding: 10px;
    transition: box-shadow 0.3s ease 0s;
    background: #f7fff7;
    box-shadow: 0 0 0px 2px var(--text-color);

    // box-shadow: 0 0 1px 2px var(--main-color);
    &:focus {
      // border: 2px solid var(--main-color);
      box-shadow: 0 0 0px 2px var(--main-color);
      //  outline: 3px solid #00a550;
    }
    &.error {
      box-shadow: 0 0 0px 2px red !important;
      background: #ffecec;
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
