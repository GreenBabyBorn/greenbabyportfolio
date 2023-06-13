<template>
  <header class="header">
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

            <li class="menu__item">
              <button
                @click.prevent="logoutHandle"
                class="menu__link menu__link_logout"
              >
                Выйти
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const { signOut } = useAuth();
const logoutHandle = async () => {
  await signOut({ callbackUrl: "/admin/login" });
};
</script>

<style scoped lang="scss">
._status {
  opacity: 0;
  // transition: all 0.3s ease 0s;
}
.header {
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
    }
  }
  &__link {
    font-size: 1rem;
    transition: color 0.3s ease 0s;
    &:hover {
      color: #45c182;
    }
  }
  &__link_logout {
    &:hover {
      color: red;
    }
  }
}
</style>
