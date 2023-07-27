<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__body">
        <ColorToggle class="footer__color"></ColorToggle>
        <p class="footer__copy">
          © 2022-2023 greenbabyborn, Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.footer {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  color: black;
  position: relative;
  // background: var(--main-color);
  background: linear-gradient(180deg, transparent, var(--main-color));
  &__container {
    padding-top: 2rem;
    padding-bottom: 1rem;
  }
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5em;
    @media (max-width: 480px) {
      align-items: center;
      flex-direction: column;
    }
  }
  &__color {
  }
  &__copy {
    font-size: 0.8rem;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
}
</style>
