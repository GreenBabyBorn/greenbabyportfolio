<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "protected",
});

import {
  useField,
  useIsFieldValid,
  useForm,
  useIsFieldDirty,
  useFieldValue,
} from "vee-validate";


const createPasswordFormSchema = {
  oldPassword(value: string) {
    if (!value) return "без пароля никак";
    return true;
  },
  newPassword(value: string) {
    if (!value) return "нужно убедиться что всё хорошо";
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

const user = useUser();

const changePassword = async () => {
  try {
  const res =  await $fetch("/api/auth/user", {
      method: "PATCH",
      body: {
        username: user.value.username,
        password: oldPassword.value,
        newPassword: newPassword.value,
      },
    });
    console.log('Data:', res)
    notificationStore.pushNotification({
      title: "Пароль изменен",
      status: true,
      text: "Нужно заново авторизоваться",
    });
    resetForm();
    logoutHandle();
  } catch (e) {
    setErrors({
      oldPassword: "Неверный пароль",
    });
    console.log(e)
  }
  
};

const logoutHandle = async () => {
  await $fetch("/api/auth/logout", {
    method: "POST",
  });
  navigateTo("/admin/login");
  user.value = "";
};
</script>

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
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
  &__old-password {
  }
  &__new-password {
  }
  &__btn {
  }
}
</style>
