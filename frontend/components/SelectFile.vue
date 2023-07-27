<template>
  <div class="select-file">
    <button
      @drop.prevent="dragAndDrop"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
      @click.prevent="openFile"
      class="select-file__btn"
      :class="{ active: dragActive, error: errorMessage }"
    >
      <span>Выберите файл</span>
      <p>{{ dragBtnText }}</p>
      <p
        :class="{ error: errorMessage }"
        v-show="errorMessage || (meta.valid && meta.dirty)"
      >
        {{ errorMessage || successMessage }}
      </p>
    </button>

    <input
      @change.prevent="changeInput"
      hidden
      ref="fileInput"
      @input="handleChange"
      @blur="handleBlur"
      :name="props.name"
      type="file"
      id="file"
      accept=".jpg, .jpeg, .png, .gif"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
interface Props {
  name: string;
  successMessage?: string;
}
const props = defineProps<Props>();

let emits = defineEmits([
  "srcPhoto",
  "filePhoto",
  "dragAndDrop",
  "dragOver",
  "dragLeave",
  "removePhoto",
  "dragBtnText",
]);

const fileInput = ref<HTMLInputElement | null>(null);
let srcPhoto = useState<string | null>("srcPhoto");
let filePhoto = useState<any>();

const name = toRef(props.name);
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,

  meta,
} = useField(name, undefined, {
  initialValue: srcPhoto.value,
});

let dragActive = ref(false);
let dragBtnText = ref("... или перетащите файл");
const dragOver = () => {
  dragActive.value = true;
  dragBtnText.value = "Отпустите";
};
const dragLeave = () => {
  dragActive.value = false;
  dragBtnText.value = "... или перетащите файл";
};

const dragAndDrop = (e: DragEvent) => {
  changeInput(e.dataTransfer?.files);
};

const openFile = () => {
  fileInput.value?.click();
};

let changeInput = (event: any) => {
  let files = Array.from(!event.target?.files ? event : event.target.files);
  files.forEach((file: any) => {
    if (!file.type.match("image")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev: any) => {
      srcPhoto.value = ev.target.result;
      inputValue.value = srcPhoto.value;
      emits("srcPhoto", srcPhoto.value);
    };
    reader.readAsDataURL(file);
    filePhoto.value = file;
    emits("filePhoto", filePhoto.value);
  });
  dragBtnText.value = filePhoto.value?.name;
  dragActive.value = false;
};

let removePhoto = () => {
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  dragBtnText.value = "... или перетащите файл";
  srcPhoto.value = null;
  emits("srcPhoto", srcPhoto.value);
  inputValue.value = srcPhoto.value;
};

emits("dragAndDrop", dragAndDrop);
emits("dragOver", dragOver);
emits("dragLeave", dragLeave);
emits("removePhoto", removePhoto);
</script>

<style scoped lang="scss">
.select-file {
  text-overflow: ellipsis;
  overflow: hidden;
  &__btn {
    font-size: 1rem;
    display: flex;
    width: 100%;
    gap: 1em;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    border: 2px var(--text-color) dashed;
    padding: 1.8em;
    transition: background 0.3s ease 0s;
    &.error {
      border: 2px red dashed;
    }
    &:focus {
      border: 2px var(--main-color) solid;
    }
    span {
      pointer-events: none;
      padding: 0.375rem 0.75rem;
      background: var(--text-color);
      color: var(--bg-color);
      border-radius: 5px;
    }
    &.active {
      border: 2px var(--main-color) solid;
      background: #00a55042;
    }
    .error {
      color: red;
    }
  }
}
</style>
