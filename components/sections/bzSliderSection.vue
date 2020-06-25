<template>
  <div class="section slider-section">
    <div class="container">
      <h2 v-if="title" class="text-center">{{ title }}</h2>
    </div>
    <no-ssr placeholder="Loading...">
      <agile
        ref="carousel"
        :fade="true"
        :slides-to-show="1"
        :autoplay-speed="5000"
        autoplay
        :dots="false"
      >
        <div v-for="(item, index) in images">
          <img :src="`https://image.biznestream.biz/${item.media_file}/${item.name}?w=1200&h=400&zs=1`" class="img-responsive" :alt="section.title" :key="index" alt="image">
        </div>
        <template slot="prevButton">
          <span class="glyphicon glyphicon-chevron-left"><!-- Arrow--> </span>
        </template>
        <template slot="nextButton">
          <span class="glyphicon glyphicon-chevron-right"> <!-- Arrow--> </span>
        </template>
      </agile>
    </no-ssr>
  </div>
</template>

<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { mixins } from 'vue-class-component';
  import BlockMixin from '~/mixins/block';

  export default @Component ({
    name: "bzSliderSection"
  })

  class bzMapSection extends mixins(BlockMixin) {
    @Prop() title;
    @Prop() section;
  }
</script>

<style>
  .agile__nav-button {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 24px;
    height: 100%;
    position: absolute;
    top: 0;
    transition-duration: .3s;
    width: 15%;
  }

  .agile__nav-button--prev {
    left: 0;
    opacity: .75;
    background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
  }

  .agile__nav-button--next {
    right: 0;
    opacity: .75;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
  }

  .agile__nav-button--next:hover {
    opacity: 1;
  }

  .agile__nav-button--prev:hover {
    opacity: 1;
  }

  .agile__dots {
    bottom: 10px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }

  .agile__dot {
    margin: 0 10px;
  }

  .agile__dot button {
    background-color: transparent;
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 10px;
    font-size: 0;
    line-height: 0;
    margin: 0;
    padding: 0;
    transition-duration: .3s;
    width: 10px;
  }

  .agile__dot--current button, .agile__dot:hover button {
    background-color: #fff;
  }

  .slide {
    display: block;
    height: 500px;
    object-fit: cover;
    width: 100%;
  }
</style>
