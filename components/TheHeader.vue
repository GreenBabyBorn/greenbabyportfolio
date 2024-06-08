<template>
  <header :class="{ _status: !statusHeader }" class="header">
    <div class="header__container">
      <div class="header__menu menu">
        <nav :class="{ active: stateBurger }" class="menu__body">
          <ul @click="handleLink($event)" class="menu__list">
            <li class="menu__item">
              <NuxtLink class="menu__link" to="/">Главная</NuxtLink>
            </li>
            <li class="menu__item">
              <NuxtLink class="menu__link" to="/projects">Проекты</NuxtLink>
            </li>
            <li class="menu__item">
              <NuxtLink class="menu__link" to="/blog">Блог</NuxtLink>
            </li>
            <li class="menu__item">
              <NuxtLink class="menu__link" to="/admin/dashboard"
                >Панель</NuxtLink
              >
            </li>
            <li class="menu__item">
              <NuxtLink class="menu__link" to="/admin">Настройки</NuxtLink>
            </li>
            <li class="menu__item">
              <button
                @click.prevent="logoutHandle"
                class="menu__link menu__link_logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                  />
                </svg>
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

<script setup lang="ts">
let statusHeader = isScroll();

const stateBurger = useState("stateBurger", () => {
  return false;
});

const handleBurger = () => {
  stateBurger.value = !stateBurger.value;
};

const handleLink = (e: any) => {
  if (e.target.nodeName === "A") stateBurger.value = false;
};

const logoutHandle = async () => {};
</script>

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

  background: rgba(var(--bg-color-rgb), 0.4);

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
      background: rgba(var(--bg-color-rgb), 0.4);
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
    gap: 1.2em;
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
      color: var(--main-color);
    }
  }
  &__link {
    font-size: clamp(1rem, 5vw, 1.1rem);
    font-weight: 600;
    transition: color 0.3s ease 0s;
    @media (max-width: 768px) {
      display: inline-block;
      width: 100%;
    }
    &:hover,
    &:focus {
      color: #45c182;
    }
  }
  &__link_logout {
    display: flex;
    // align-items: center;
    svg {
      height: 30px;
    }
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
