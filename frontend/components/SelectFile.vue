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
      accept=".jpg, .jpeg, .png"
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

let emit = defineEmits([
  "srcPhoto",
  "filePhoto",
  "dragAndDrop",
  "dragOver",
  "dragLeave",
  "removePhoto",
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
let dragOver = () => {
  dragActive.value = true;
  dragBtnText.value = "Отпустите";

  // console.log(dragBtnText);
};
let dragLeave = () => {
  dragActive.value = false;
  dragBtnText.value = "... или перетащите файл";
  // console.log(2);
};

let dragAndDrop = (e: DragEvent) => {
  changeInput(e.dataTransfer?.files);
  // dragBtnText.value = filePhoto.value?.name;
  // dragActive.value = false;
  // console.log(e.dataTransfer?.files);
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
      emit("srcPhoto", srcPhoto.value);
    };
    reader.readAsDataURL(file);
    filePhoto.value = file;
    emit("filePhoto", filePhoto.value);
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
  inputValue.value = srcPhoto.value;
  emit("srcPhoto", srcPhoto.value);
};

emit("dragAndDrop", dragAndDrop);
emit("dragOver", dragOver);
emit("dragLeave", dragLeave);
emit("removePhoto", removePhoto);

// const name = toRef(props.name);
// const {
//   value: inputValue,
//   errorMessage,
//   handleBlur,
//   handleChange,
//   meta,
// } = useField(name, undefined, {
//   initialValue: props.value,
// });
</script>

<style scoped lang="scss">
.select-file {
  // width: 100%;
  text-overflow: ellipsis;
  /* width: 100%; */
  // white-space: nowrap;
  overflow: hidden;
  &__btn {
    font-size: 1rem;
    display: flex;
    width: 100%;
    gap: 1em;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    border: 2px var(--main-color) dashed;
    padding: 1.8em;
    transition: background 0.3s ease 0s;
    &.error {
      // background: #ffecec;
      border: 2px red dashed;
    }
    &:focus {
      // outline: 3px solid #00a550;
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
