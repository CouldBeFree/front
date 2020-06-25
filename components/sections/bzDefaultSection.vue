<template>
  <div>
    <no-ssr>
      <div
        :class="{ 'has-mainimage': mainImage, 'has-images': images.length, 'has-html': html, 'default-section': !isWide, 'wide-section': isWide }"
        class="section">
        <div class="container">
          <h2 v-if="title" class="text-center">{{ title }}</h2>

          <div class="row">
            <!-- Image -->
            <div v-if="mainImage || images.length || buttonCaption" class="section-image">
              <!--{% set imgUrl = getImageUrl(section.mainImage, section.imageTypes.image) %}-->
              <!--{% set previewUrl = getImageUrl(section.mainImage) %}-->
              <!--{% set imgSize = getImageSize(section.mainImage) %}-->
              <nuxt-link v-if="mainImage" :class="{ 'img-overlay': link }" :to="link || ''"
                         itemprop="image" itemscope itemtype="https://schema.org/ImageObject"
                         class="img-centered" :data-size="`${mainImage.width}x${mainImage.height}`">

                <bz-img :file="mainImage" :width="1200" :alt="title" :title="title"
                        class="img-responsive img-centered" itemprop="contentUrl" />

                <!--<link itemprop="url" href="{{ previewUrl|raw }}" />-->
                <!--<meta itemprop="width" content="{{ imgSize.width }}">-->
                <!--<meta itemprop="height" content="{{ imgSize.height }}">-->
              </nuxt-link>

              <div v-if="!isWidePage && !isWide && (images.length || buttonCaption)">
                <ul v-if="images.length" class="list-small-images list-unstyled" bz-gallery>
                  <li v-for="image in images" :key="image.id" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">

                    <!--{% set originalUrl = getImageUrl(image, '') %}-->
                    <!--{% set imgUrl = getImageUrl(image, section.imageTypes.thumb) %}-->
                    <!--{% set previewUrl = getImageUrl(image) %}-->
                    <!--{% set imgSize = getImageSize(image) %}-->
                    {{image}}

                    <!--<a href="{{ previewUrl|raw }}" class="img-overlay img-overlay-icon" data-size="{{ imgSize.width }}x{{ imgSize.height }}">-->
                    <!--<img src="imgUrl|raw }}" itemprop="contentUrl" :alt="title" :title="title" class="img-responsive" />-->
                    <!--</a>-->

                    <!--<link itemprop="url" href="{{ originalUrl|raw }}" />-->
                    <!--<meta itemprop="width" content="{{ imgSize.width }}">-->
                    <!--<meta itemprop="height" content="{{ imgSize.height }}">-->
                  </li>
                  <!--{% endfor %}-->
                </ul>

                <div v-if="link && buttonCaption" class="main-btn">
                  <nuxt-link :to="link" class="btn" itemprop="significantLink">
                    <span>{{ buttonCaption }}</span>
                  </nuxt-link>
                </div>
              </div>
            </div>

            <!-- Text -->
            <div v-append="html" v-html="html" :class="{'without-images': !mainImage && !(images.length || buttonCaption)}" class="section-text"></div>
          </div>

          <div v-if="(isWidePage || isWide) && (images.length || buttonCaption)" class="row">
            <div v-if="images.length || buttonCaption" class="thumbnails-gallery col-md-12">
              <ul v-if="images.length" class="list-small-images list-unstyled" bz-gallery>
                <li v-for="image in images" :key="image.id" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
                  <!--{% set originalUrl = getImageUrl(image, '') %}-->
                  <!--{% set imgUrl = getImageUrl(image,section.imageTypes.thumb) %}-->
                  <!--{% set previewUrl = getImageUrl(image) %}-->
                  <!--{% set imgSize = getImageSize(image) %}-->
                  {{image}}
                  <!--<a href="{{ previewUrl|raw }}" class="img-overlay img-overlay-icon" data-size="{{ imgSize.width }}x{{ imgSize.height }}">-->
                  <!--<img data-ng-src="{{ imgUrl|raw }}" itemprop="contentUrl" alt="title" title="{{section.title}}" class="img-responsive" />-->
                  <!--</a>-->

                  <!--<link itemprop="url" href="{{ originalUrl|raw }}" />-->
                  <!--<meta itemprop="width" content="{{ imgSize.width }}">-->
                  <!--<meta itemprop="height" content="{{ imgSize.height }}">-->
                </li>
              </ul>
              <div v-if="link && buttonCaption" class="main-btn">
                <nuxt-link class="btn" itemprop="significantLink" :to="link">
                  <span>{{ buttonCaption || 'Details' }}</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { mixins } from 'vue-class-component';
  import BlockMixin from '~/mixins/block';
  import bzImg from '../bzImg';

  export default
  @Component({
    components: {
      bzImg
    }
  })
  class bzDefaultSection extends mixins(BlockMixin) {
    @Prop() isWidePage;
    @Prop(String) buttonCaption;
    @Prop(String) html;
    @Prop(String) link;
    @Prop(String) title;

    get isWide() {
      return this.template === 'wide-image';
    }
  }
</script>
