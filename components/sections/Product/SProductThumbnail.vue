<template>
  <div class="" data-ng-show="!skinSettings.useFotorama">
    <a class="img-overlay img-overlay-icon main-image" @click.prevent="openGallery"
       itemprop="associatedMedia" itemscope=""
       itemtype="https://schema.org/ImageObject"
       :href="image.url"
       data-size="1024x768">
      <img data-test="thumbnail" itemprop="image" :src="image.url" alt="" title="BYD Gegengewichtstapler ECB16"
           class="img-responsive img-width-100">
      <link itemprop="url" :href="image.url">
      <meta itemprop="width" content="1024">
      <meta itemprop="height" content="768">
    </a>
    <no-ssr>
      <light-box
        :images="transformImageObject"
        :showLightBox="false"
        :showThumbs="false"
        ref="lightbox"
      ></light-box>
    </no-ssr>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  export default @Component({
    name: "SProductThumbnail",
    components: {
    }
  })

  class ProductThumbnail extends Vue {
    @Prop() images;
    @Prop(Number) selected;

    get image() {
      return this.images[this.selected];
    }

    get transformImageObject(){
      const imagesCopy = this.images.map(item => ({...item}));
      for(let i = 0; i < imagesCopy.length; i++){
        imagesCopy[i].src = imagesCopy[i]['url'];
        delete imagesCopy[i].url;
      }
      return imagesCopy;
    }

    openGallery(){
      this.$refs.lightbox.showImage(this.selected);
    }
  }
</script>

<style scoped>

</style>
