<template>
  <div class="admin">
    <div class="admin__container">
      <section class="admin__password-manage password-manage">
        <h2 class="password-manage__title">Изменить пароль</h2>
        <div class="password-manage__body">
          <FormInput
            class="password-manage__old-password"
            name="oldPassword"
            placeholder="Старый пароль"
            forid="oldPassword"
            type="text"
            success-message="звучит красиво"
          />
          <FormInput
            class="password-manage__new-password"
            name="newPassword"
            placeholder="Новый пароль"
            forid="newPassword"
            type="text"
            success-message="добро"
          />
          <FormButton
            type="submit"
            @click.prevent="changePassword"
            class="password-manage__btn"
            :disabled="!meta.dirty || !meta.valid"
            >Изменить пароль</FormButton
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

import {
  useField,
  useIsFieldValid,
  useForm,
  useIsFieldDirty,
  useFieldValue,
} from "vee-validate";
let password = ref("");
const createPasswordFormSchema = {
  oldPassword(value: string) {
    if (!value) return "без пароля никак";
    if (value.length < 8) return "нужно больше 8 символов";
    password.value = value;
    return true;
  },
  newPassword(value: string) {
    if (!value) return "нужно убедиться что всё хорошо";
    if (password.value !== value) return "не совпадают(";
    return true;
  },
};

const {
  errors,
  useFieldModel,
  meta,
  validate,
  setErrors,
  setFieldError,
  resetForm,
} = useForm({
  validationSchema: createPasswordFormSchema,

  initialValues: {
    oldPassword: "",
    newPassword: "",
  },
});
const [oldPassword, newPassword] = useFieldModel([
  "oldPassword",
  "newPassword",
]);

import { useNotificationStore } from "~/stores/notifications";

const notificationStore = useNotificationStore();

const changePassword = () => {
  notificationStore.pushNotification({
    title: "Пароль изменен",
    status: true,
    text: "Нужно заново авторизоваться",
  });
  resetForm();
  logoutHandle();
};
const { signOut } = useAuth();
const logoutHandle = async () => {
  await signOut({ callbackUrl: "/admin/login" });
};
</script>

<style lang="scss">
.admin {
  &__container {
  }
  &__password-manage {
  }
}
.password-manage {
  &__title {
    font-size: 40px;
    font-weight: 800;
    text-align: left;
    margin-bottom: 30px;
  }
  &__body {
  }
  &__old-password {
  }
  &__new-password {
  }
  &__btn {
  }
}
</style>
