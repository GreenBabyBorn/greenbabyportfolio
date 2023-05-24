<template>
  <header :class="{ _status: !statusHeader }" class="header">
    <div class="header__container">
      <div class="header__menu">
        <nav class="menu__body">
          <ul class="menu__list">
            <li class="menu__item">
              <NuxtLink class="menu__link" to="/">Главная</NuxtLink>
            </li>

            <li class="menu__item">
              <NuxtLink class="menu__link" to="/blog">Блог</NuxtLink>
            </li>
            <li v-if="status == 'authenticated'" class="menu__item">
              <NuxtLink class="menu__link" to="/admin/dashboard"
                >Панель</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
let statusHeader = isScroll();
const { status, data } = useAuth();
</script>

<style scoped lang="scss">
._status {
  opacity: 0;
  // transition: all 0.3s ease 0s;
}
.header {
  // padding-top: 68px;
  transition: 0.3s ease 0s;
  transition-property: background, opacity;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.3em 0px;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: rgba(var(--bg-color-rgb), 0.4);
  // background: var(--bg-color);
  // box-shadow: -10px -10px 10px rgba(255, 255, 255, 0.5),
  // 10px 10px 10px rgba(70, 70, 70, 0.12);

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__menu {
  }
}
.menu {
  &__body {
  }
  &__list {
    display: flex;
    gap: 1.2em;
  }
  &__item {
    .router-link-active {
      color: var(--main-color);
      // border-bottom: 2px solid #98fb98;
      // text-shadow: 0px 0px 8px #24ff00;
      // border-bottom: 1px #45c182 solid;
    }
  }
  &__link {
    font-size: 1rem;
    font-weight: 600;
    transition: color 0.3s ease 0s;
    &:hover,
    &:focus {
      color: #45c182;
    }
  }
}
</style>
