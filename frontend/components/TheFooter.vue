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
<script setup></script>
<style scoped lang="scss">
.footer {
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  // border-top: #006631 2px solid;
  color: black;
  position: relative;
  // background: linear-gradient(0deg, #00a550, transparent);
  background: var(--main-color);
  &__container {
    //  padding: 25px 0px;
    padding-top: 1em;
    padding-bottom: 1em;
  }
  &__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    // justify-content: center;
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
    // @media (max-width: 320px) {
    //   font-size: 12px;
    // }
  }
}
</style>
