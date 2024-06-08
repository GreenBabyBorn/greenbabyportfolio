<script lang="ts" setup>
// @ts-ignore
import stroycontrol from "@/assets/img/projects/landing-stroycontrol.png";
// @ts-ignore
import portfolio from "~/assets/img/projects/landing-portfolio.png";
// @ts-ignore
import stroycom from "../assets/img/projects/stroycom-spa.png";

const projects = [
  {
    id: 1,
    img: stroycontrol,
    imgAlt: 'Лендинг Stroycontrol',
    link: 'https://greenbabyborn.github.io/landing-stroycontrol/dist/',
    title: 'Лендинг - Stroycontrol',
    text: '',
    git: 'https://github.com/GreenBabyBorn/landing-stroycontrol',
    date: '22-01-2004',
    slug: 'stroycom'
  },
  {
    id: 2,
    img: portfolio,
    imgAlt: 'лендинг Porfolio',
    link: 'https://greenbabyborn.github.io/landing-portfolio/dist',
    title: 'Лендинг - Porfolio',
    text: '',
    git: 'https://github.com/GreenBabyBorn/landing-portfolio'
  },
  {
    id: 3,
    img: stroycontrol,
    imgAlt: 'Лендинг Stroycontrol',
    link: 'https://greenbabyborn.github.io/landing-stroycontrol/dist/',
    title: 'Лендинг - Stroycontrol',
    text: '',
    git: 'https://github.com/GreenBabyBorn/landing-stroycontrol'
  }
] 

const { data } = await useFetch('/api/projects');
console.log(data.value)
</script>

<template>
  <div class="projects">
    <div class="projects__container">
      <PortfolioProject
      v-for="proj in projects"
      :key="proj.id"
        class="portfolio__project"
        :img-alt="proj.imgAlt"
        :img-src="proj.img"
        :link="proj.link"
        :text="proj.title"
        :git="proj.git"
        :date="proj.date"
      ></PortfolioProject>
      <!-- <PortfolioProject
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
      ></PortfolioProject> -->
    </div>
  </div>
</template>



<style lang="scss" scoped>
.projects{
  margin-bottom: 3rem;
  &__container{
  display: flex;
  flex-direction: column;
  gap: 100px;
}  
}

</style>
