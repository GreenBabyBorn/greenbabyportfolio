<template>
  <div class="project">
    <a :href="props.projLink" target="_blank" class="project__url">
      <div class="project__img">
        <img :src="props.imgsrc" :alt="props.imgAlt" />
      </div>
      <div class="project__info">Подробнее</div>
    </a>
    <div class="project__description">
      <span class="project__text">{{ props.projText }}</span>
      <a target="_blank" class="project__github" :href="props.projGit"
        >github</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  projLink: string;
  projText: string;
  projGit: string;
  imgsrc: string;
  imgAlt?: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss">
.project {
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
