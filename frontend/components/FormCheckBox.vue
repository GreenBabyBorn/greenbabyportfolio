<template>
  <label class="checkbox" :for="props.forid">
    <span v-if="props.label" class="checkbox__label">{{ props.label }}</span>

    <input
      class="checkbox__input"
      :id="props.forid"
      :checked="props.value"
      :name="props.name"
      @input="handleChange"
      type="checkbox"
    />
    <svg
      class="checkbox__icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
    >
      <rect
        width="21"
        height="21"
        x=".5"
        y=".5"
        fill="none"
        stroke="var(--main-color)"
        rx="3"
      />
      <path
        class="tick"
        stroke="var(--main-color)"
        fill="none"
        stroke-linecap="round"
        stroke-width="4"
        d="M4 10l5 5 9-9"
      />
    </svg>
  </label>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
interface Props {
  label?: string;
  value?: boolean;
  forid?: string;
  name: string;
  //   modelValue: boolean;
}
//   modelValue: boolean;
// const emit = defineEmits(["update:modelValue"]);
const props = defineProps<Props>();

const { name } = toRefs(props);
const { checked, checkedValue, errorMessage, handleChange, meta } = useField(
  name,
  undefined,
  {
    type: "checkbox",
    checkedValue: props.value,
    //   syncVModel: "checkedValue",
  }
);
</script>

<style lang="scss">
input[type="checkbox"]:checked {
  counter-increment: checked;
}
.checkbox {
  display: flex;
  gap: 10px;
  //   justify-content: center;
  align-items: center;

  counter-reset: total;
  counter-increment: total;
  cursor: pointer;

  &__label {
    user-select: none;
    font-size: 1.1rem;
  }
  &__input {
    position: absolute;
    width: 1.375em;
    height: 1.375em;
    opacity: 0;
    cursor: pointer;

    &:checked + .checkbox__icon .tick {
      stroke-dashoffset: 0;
    }
    &:focus + .checkbox__icon rect {
      stroke-width: 3px;
    }
  }
  &__icon {
    width: 1.375em;
    height: 1.375em;
    flex-shrink: 0;
    overflow: visible;
    rect {
      transition: all 0.3s ease 0s;
    }
    .tick {
      stroke-dasharray: 20px;
      stroke-dashoffset: 20px;
      transition: stroke-dashoffset 0.2s ease-out;
    }
  }
}
</style>
