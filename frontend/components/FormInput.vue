<template>
  <label :for="props.forid">
    <span v-if="props.label">{{ props.label }}</span>
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
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: relative;
  padding-bottom: 35px;

  span {
    margin-bottom: 10px;
  }
  input {
    &:focus {
      box-shadow: 0 0 0px 2px var(--main-color);
    }
    &:disabled {
    }
    &.error {
      box-shadow: 0 0 0px 2px red !important;
      background: #ffecec;
    }
    padding: 0.375rem 0.75rem;
    background: #f7fff7;
    box-shadow: 0 0 0px 2px var(--text-color);
    border-radius: 15px;
    transition: box-shadow 0.3s ease 0s;
    @media (max-width: 320px) {
      width: 100%;
    }
  }
  p {
    position: absolute;
    padding: 8px 0;
    bottom: 0px;
    left: 0;
    color: var(--main-color);

    &.error {
      color: red;
    }
  }
}
</style>
