<template>
  <div class="project">
    <a :href="props.link" target="_blank" class="project__url">
      <div class="project__img">
        <img :src="props.imgSrc" :alt="props.imgAlt" />
      </div>
      <div class="project__info">Подробнее</div>
      <time class="project__date" datetime="">{{ props.date }}</time>
    </a>
    <div class="project__description">
      <span class="project__text">{{ props.text }}</span>
      <a target="_blank" class="project__github" :href="props.git"
        >github</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  link: string;
  date?: string;
  text: string;
  git: string;
  imgSrc: string;
  imgAlt?: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.project {
  &__date{
    font-family: Consolas;
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 1rem;
    backdrop-filter: blur(10px);
    background: rgba(50, 255, 47, 0.599);
  }
  &__url {
    &:hover img {
      filter: brightness(0.5);
    }
    &:hover .project__info {
      font-size: 1.2rem;
      opacity: 1;
    }
    display: inline-block;
    position: relative;

    z-index: 1;
  }
  &__img {
    img {
      transition: all 0.3s ease 0s;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  &__info {
    transition: all 0.3s ease 0s;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 5;
    font-size: 20px;
  }
  &__description {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  &__text {
    font-size: 1.2rem;
  }
  &__github {
    font-size: 1.2rem;
    transition: color 0.3s ease 0s;
    &:hover {
      color: #e8eaea;
    }
  }
}
</style>
