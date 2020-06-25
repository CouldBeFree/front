<template>
  <div class="gallery-section section">
    <no-ssr>
      <div class="container">
        <!--{% if section.title %}<h2 class="text-center">{{ section.title }}</h2>{% endif %}-->
        <h2 v-if="section.parameters.title">{{ section.parameters.title }}</h2>
        <ul class="list-small-images list-unstyled" bz-gallery itemscope itemtype="http://schema.org/ImageGallery">
         <!--{% for image in section.images %}-->
         <li class="col-lg-3 col-md-3 col-sm-6 col-xs-6 no-padding" v-for="(image, index) in images" itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
           {{image}}
           <!--{% set originalUrl = getImageUrl(image, '') %}
           {% set imgUrl = getImageUrl(image, section.imageTypes.image) %}
           {% set imgSize = getImageSize(image) %}-->

           <a class="img-overlay img-overlay-icon" @click.prevent="openGallery(index)" :href="`/image/${image.id}/${image.name}`" itemprop="contentUrl" :data-size="`${image.width} x ${image.height}`">
             <img :src="`/image/${image.id}/${image.name}?w=400&h=300&zs=1`" itemprop="contentUrl" :alt="section.title" :title="section.title" class="img-responsive" />
           </a>

           <link itemprop="url" :href="`/image/${image.id}/${image.name}`" />
           <meta itemprop="width" :content="image.width">
           <meta itemprop="height" :content="image.height">
         </li>
         <!--{% endfor %}-->
       </ul>
      </div>
    </no-ssr>
    <no-ssr>
      <light-box
        :images="imagesArray"
        :showLightBox="false"
        :showThumbs="false"
        ref="lightbox"
      ></light-box>
    </no-ssr>
  </div>
</template>

<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { mixins } from 'vue-class-component';
  import BlockMixin from '~/mixins/block';

  export default
  @Component({
    name: "bzGallerySection"
  })

  class bzGallerySection extends mixins(BlockMixin) {
    @Prop() isWidePage;

    imagesArray = [];

    mounted(){
      if(process.client){
        const images = this.images;
        for(const image of images){
          let imageObj = {};
          imageObj.src = `/image/${image.id}/${image.name}`;
          imageObj.id = image.id;
          this.imagesArray.push(imageObj);
        }
      }
    }

    openGallery(index){
      this.$refs.lightbox.showImage(index);
    }
  }
</script>

<style scoped>

</style>
