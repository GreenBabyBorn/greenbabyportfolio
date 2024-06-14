<script setup lang="ts">
useHead({
  title: "greenbabyborn",
  meta: [{ name: "yandex-verification", content: "7bfa34f9ef0d1d78" }],
});

let arrowHidden = isScroll();

const { data: projects } = await useFetch("/api/projects");
</script>

<template>
  <div>
    <section class="index">
      <div class="index__container">
        <div class="index__body">
          <div class="index__avatar">
            <img src="@/assets/img/avatar.jpg" alt="Аватар" />
          </div>
          <div class="index__info">
            <h1>
              <a class="index__name" href="/">greenbabyborn</a>
              <span class="index__name blinking-cursor">_</span>
            </h1>
            <p class="index__pos">FullStack Web Developer</p>

            <div class="social">
              <a
                class="social_gh"
                target="_blank"
                href="https://github.com/greenbabyborn"
              >
                <svg
                  width="2rem"
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg>
              </a>

              <a
                class="social_tg"
                target="_blank"
                href="https://t.me/greenbabyborn"
                ><svg
                  width="2rem"
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Telegram</title>
                  <path
                    d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                  /></svg
              ></a>
            </div>
          </div>
        </div>
        <div class="index__arrow" :class="{ _hidden: arrowHidden }">
          <svg
            version="1.1"
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
        <h2 class="portfolio__heading">Проекты</h2>
        <div class="portfolio__body">
          <PortfolioProject
            v-for="project in projects"
            :title="project.title"
            :key="project.id"
            :link="'/projects/' + project.slug"
            :date="project.createdAt"
            :imgSrc="project.img"
            :text="project.content"
            :git="project.git"
            :slug="project.slug"
            :published="project.published"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.blinking-cursor {
  font-size: 1.2em;
  // user-select: none;
  animation: blink 0.7s infinite;
  // transition: all 0s ease 0s;

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
  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }
  &__arrow {
    align-self: center;
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
    // justify-content: center;
    flex-direction: column;

    // align-items: center;
  }
  &__info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__body {
    flex-wrap: wrap;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    // flex-direction: column;
    // justify-content: center;
    gap: 30px;
  }
  &__avatar {
    flex: 1 1 200px;

    img {
      transition: 0.3s;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 25px 50px -12px rgba(var(--text-color-rgb), 0.25);
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
    // text-decoration: line-through;
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
      &:hover,
      &:focus {
        color: #597da3;
      }
    }
    &_tg {
      &:hover,
      &:focus {
        color: #0088cc;
      }
    }
    &_gh {
      &:hover,
      &:focus {
        color: #e8eaea;
      }
    }
  }
}

.portfolio {
  margin-bottom: 150px;
  margin-top: 100px;
  &__body {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  &__container {
  }
  &__heading {
    font-size: 48px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 70px;
  }
  &__project {
    &:not(:last-child) {
      margin-bottom: 70px;
    }
  }
}
</style>
