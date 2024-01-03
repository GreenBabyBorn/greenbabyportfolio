<template>
  <div class="notification">
    <TransitionGroup tag="ul" name="fade" class="notification__list">
      <li
        v-for="item in notificationStore.getNotifications"
        :key="item.id"
        class="notification__item"
        :class="{
          notification__item_error: !item.status,
          notification__item_success: item.status,
        }"
      >
        <h6 class="notification__title">{{ item.title }}</h6>
        <p class="notification__text">{{ item.text }}</p>
        <span
          @click="notificationStore.removeNotification(item)"
          class="notification__remove"
          >&times;</span
        >
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notifications";
// Pinia не работает с диструктуризацией
// const { notifications, removeNotification, getNotifications } = useNotificationStore();

// Работает только так
const notificationStore = useNotificationStore();
</script>

<style scoped lang="scss">
.notification {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 55;
  margin: 20px;
  // :deep это костыль для того, чтобы работали стили для этого класса, который присваивается с помощью тега TransitionGroup
  :deep(.notification__list) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  &__item {
    padding: 1rem;
    backdrop-filter: blur(10px);
    display: grid;
    grid-template-areas: "title remove" "text remove";
    align-items: center;
    justify-content: space-between;
    column-gap: 20px;
    row-gap: 10px;
    border-radius: 15px;
  }
  &__item_success {
    background: #21ff8c4a;
  }
  &__title {
    font-size: 1rem;
    font-weight: 700;
    position: relative;
    grid-area: title;
    .notification__item_success & {
      color: var(--main-color);
    }
    .notification__item_error & {
      color: red;
    }
  }
  &__text {
    grid-area: text;
    font-size: 1rem;
  }
  &__remove {
    font-size: 2rem;
    cursor: pointer;
    grid-area: remove;
  }
  &__item_error {
    position: relative;
    background: rgba(255, 92, 92, 0.196);
  }
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}
</style>
