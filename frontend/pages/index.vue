<template>
  <div>
    <section class="index">
      <div class="index__container">
        <div class="index__body">
          <div class="index__avatar">
            <img src="@/assets/img/avatar.jpg" alt="Аватар" />
          </div>
          <h1>
            <!-- <a class="name" href="/">Котов Иван</a> -->
            <a class="index__name" href="/"
              >greenbabyborn<span class="blinking-cursor">_</span>
            </a>
          </h1>
          <p class="index__pos">Junior FullStack Developer</p>
          <!-- <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JS</li>
            <li>PHP</li>
            <li>SCSS</li>
            <li>DOCKER</li>
            <li>GIT</li>
            <li>MYSQL</li>
            <li>POSTGRESQL</li>
            <li>NGNIX</li>
            <li>APACHE</li>
            <li>REST API</li>
            <li>GITHUB ACTIONS</li>
            <li>VUE 3</li>
            <li>NUXT 3</li>
            <li>LARAVEL 9</li>
            <li>TAILWIND</li>
          </ul> -->
          <div class="social">
            <a
              class="social_gh"
              target="_blank"
              href="https://github.com/greenbabyborn"
              >github</a
            >

            <a class="social_vk" target="_blank" href="https://vk.com/kisovetar"
              >vk</a
            >

            <a
              class="social_tg"
              target="_blank"
              href="https://t.me/greenbabyborn"
              >telegram</a
            >
          </div>
        </div>
        <div class="index__arrow" :class="{ _hidden: arrowHidden }">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 330 330"
            style="enable-background: new 0 0 330 330"
            xml:space="preserve"
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
        </div>
      </div>
    </section>
    <section class="portfolio">
      <div class="portfolio__container">
        <h2 class="portfolio__heading">проекты</h2>
        <div class="portfolio__body">
          <PortfolioProject
            class="portfolio__project"
            img-alt="Лендинг Stroycontrol"
            :imgsrc="stroycontrol"
            proj-link="https://greenbabyborn.github.io/landing-stroycontrol/dist/"
            proj-text="Лендинг - Stroycontrol"
            proj-git="https://github.com/GreenBabyBorn/landing-stroycontrol"
          ></PortfolioProject>
          <PortfolioProject
            class="portfolio__project"
            img-alt="лендинг Porfolio"
            :imgsrc="portfolio"
            proj-link="https://greenbabyborn.github.io/landing-portfolio/dist"
            proj-text="Лендинг - Portfolio"
            proj-git="https://github.com/GreenBabyBorn/landing-portfolio"
          ></PortfolioProject>
          <PortfolioProject
            class="portfolio__project"
            img-alt="SPA StroyCom"
            :imgsrc="stroycom"
            proj-link="https://stroycom.greenbabyborn.ru"
            proj-text="SPA - StroyCom"
            proj-git="https://github.com/GreenBabyBorn/stroycompany-vue-laravel"
          ></PortfolioProject>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import stroycontrol from "@/assets/img/projects/landing-stroycontrol.png";
// @ts-ignore
import portfolio from "~/assets/img/projects/landing-portfolio.png";
// @ts-ignore
import stroycom from "../assets/img/projects/stroycom-spa.png";
import PortfolioProject from "@/components/PortfolioProject.vue";

useHead({
  title: "greenbabyborn",
  meta: [{ name: "yandex-verification", content: "7bfa34f9ef0d1d78" }],
});

let arrowHidden = isScroll();
</script>

<style scoped lang="scss">
.blinking-cursor {
  font-size: 1.2em;
  // user-select: none;
  animation: blink 2s infinite;
  transition: all 3s ease 0s;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}

._hidden {
  opacity: 0;
}
.index {
  &__arrow {
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
    fill: var(--text-color);
    padding-bottom: 100px;
    animation: arrow 3s infinite;
    transition: opacity 0.3s ease 0s;
  }
  @keyframes arrow {
    0% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(10px);
    }
  }
  &__container {
    min-height: calc(100vh - 3.6em);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  &__body {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }
  &__avatar {
    max-width: 200px;
    max-height: 200px;

    img {
      transition: 0.3s;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 25px 50px -12px rgba(var(--text-color-rgb), 0.25);
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  &__name {
    display: inline-block;
    font-size: clamp(1rem, 10vw, 48px);
    font-weight: bold;
    transition: all 0.3s ease 0s;
    &:hover {
      color: #666;
    }
  }
  &__pos {
    font-size: clamp(18px, 5vw, 24px);
    text-decoration: line-through;
    letter-spacing: 2px;
    &:hover {
      text-decoration: none;
    }
  }
  .social {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 1.1em;
    transition: all 0.3s ease 0s;
    &_vk {
      &:hover {
        color: #597da3;
      }
    }
    &_tg {
      &:hover {
        color: #0088cc;
      }
    }
    &_gh {
      &:hover {
        color: #e8eaea;
      }
    }
  }
}

.portfolio {
  margin-bottom: 150px;
  margin-top: 100px;
  &__container {
  }
  &__heading {
    font-size: 48px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 70px;
  }
  &__body {
  }
  &__project {
    &:not(:last-child) {
      margin-bottom: 70px;
    }
  }
}
</style>
