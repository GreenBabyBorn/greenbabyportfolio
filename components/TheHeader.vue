<script setup lang="ts">
const user = useUser();

let statusHeader = isScroll();

const stateBurger = useState("stateBurger", () => {
  return false;
});

const handleBurger = () => {
  stateBurger.value = !stateBurger.value;
};

const closeMenu = () => {
  stateBurger.value = false;
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
  <header :class="{ _status: !statusHeader }" class="header">
    <div class="header__container">
      <div class="header__menu menu">
        <nav :class="{ active: stateBurger }" class="menu__body">
          <!-- <ul @click="handleLink($event)" class="menu__list"> -->
          <ul class="menu__list">
            <li class="menu__item">
              <NuxtLink @click="closeMenu" class="menu__link" to="/"
                >Обо мне</NuxtLink
              >
            </li>
            <li class="menu__item">
              <NuxtLink @click="closeMenu" class="menu__link" to="/blog"
                >Блог</NuxtLink
              >
            </li>
            <li class="menu__item">
              <NuxtLink @click="closeMenu" class="menu__link" to="/projects"
                >Проекты</NuxtLink
              >
            </li>
            <!-- <li v-if="user" class="menu__item">
              <NuxtLink @click="closeMenu" class="menu__link" to="/admin"
                >Дашборд</NuxtLink
              >
            </li> -->
            <li v-if="user" class="menu__item">
              <NuxtLink
                @click="closeMenu"
                class="menu__link"
                to="/admin/settings"
                >Настройки</NuxtLink
              >
            </li>
            <li v-if="user" class="menu__item">
              <button
                @click.prevent="logoutHandle"
                class="menu__link menu__link_logout"
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>
        <button
          :class="{ active: stateBurger }"
          @click="handleBurger"
          class="burger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <ColorToggle class="header__color"></ColorToggle>
    </div>
  </header>
</template>

<style scoped lang="scss">
._status {
  opacity: 0;
}
.header {
  transition: 0.3s ease 0s;
  transition-property: background, opacity;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: clamp(1rem, 5vw, 1.3rem) 0px;
  z-index: 50;

  // background: rgba(var(--bg-color-rgb), 0.4);

  @media (min-width: 769px) {
    backdrop-filter: blur(10px);
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
      flex-direction: row-reverse;
    }
  }
  &__menu {
  }
  &__color {
    @media (max-width: 768px) {
      z-index: 50;
    }
    :deep(svg path) {
      fill: var(--text-color);
    }
  }
}
.menu {
  &__body {
    @media (max-width: 768px) {
      transform: translateX(-100%);
      backdrop-filter: blur(10px);
      background: rgba(var(--bg-color-rgb), 0.4);
      position: fixed;
      z-index: 50;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      height: 100vh;
      width: 60%;
      top: 0;
      left: 0;
      gap: 1.5rem;
      padding: 0 15px;
      transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s;
      &.active {
        transform: translateX(0%);
      }
    }
  }
  &__list {
    display: flex;
    align-items: center;
    gap: 0.2em;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &__item {
    @media (max-width: 768px) {
      display: inline-block;
      width: 100%;
    }
    .router-link-active {
      // color: var(--main-color);
      backdrop-filter: blur(5px);
      border-radius: 15px;
      background: rgba(var(--main-color-rgb), 0.2);
    }
  }
  &__link {
    font-size: clamp(0.5rem, 5vw, 0.8rem);
    text-transform: uppercase;
    padding: 0.25rem 0.75rem;
    font-weight: 600;
    transition: color 0.3s ease 0s;
    @media (max-width: 768px) {
      display: inline-block;
      width: 100%;
    }
    // &:hover,
    // &:focus {
    //   color: #45c182;
    // }
  }
  &__link_logout {
    display: flex;
    // align-items: center;
    &:hover {
      color: red;
    }
  }
}
.burger {
  position: relative;
  z-index: 50;
  width: 33px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  @media (min-width: 769px) {
    display: none;
  }
  &.active span:nth-child(2) {
    transform: rotate(-45deg);
  }
  &.active span:nth-child(1) {
    transform: scale(0);
  }
  &.active span:nth-child(3) {
    transform: scale(0);
  }
  span {
    display: block;
    border-radius: 5px;
    background: var(--text-color);
    height: 3px;
    width: 100%;
    transition: transform 0.3s cubic-bezier(0.77, 0, 0.175, 1) 0s;
  }
}
</style>
