<template>
  <div>
    <!--{% if page.isWide() %}-->
    <div v-if="isWidePage" class="section three-box-navi-section has-padding">
      <h2 class="text-center" v-if="section.parameters.title" v-html="section.parameters.title"></h2>

      <!--{% set imgUrl = getImageUrl(section.mainImage,section.imageTypes.background) %}-->

      <div class="navi-boxes" :style="{ backgroundImage: `url('${mainImage}')` }">
        <div class="container">
          <div class="row">
            <!--{% for i in [0,1,2] %}
            {% set name = 'Slide' ~ (i + 1) %}
            {% if section.images[i] is defined %}-->
            <div class="box-item text-center" v-for="(image, index) in images">
              <!--{% set originalUrl = getImageUrl(section.images[i], '') %}
              {% set boxUrl = getImageUrl(section.images[i],section.imageTypes.image) %}
              {% set imgSize = getImageSize(section.images[i]) %}-->
              <div>
                <a itemprop="image" itemscope itemtype="https://schema.org/ImageObject" class="image-relative" :href="getSlideUrl(index)"> <!--href="{{ section.parameters[name ~ 'Url'] }}"-->
                  <img itemprop="contentUrl" class="img-responsive" :src="`/image/${image.id}/${image.name}?w=400&h=300&zs=1`" :alt="section.title" :title="section.title">
                  <!--{% if section.parameters[name ~ 'Text'] is defined %}-->
                  <div class="three-box-img-info bg-bottom-content" bz-dot>
                    <!--{{section.parameters[name ~ 'Text']}}-->
                    {{getSlideText(index)}}
                  </div>
                  <!--{% endif %}-->
                  <link itemprop="url" :href="image" /> <!--href="{{ image }}"-->
                  <meta itemprop="width" :content="image.width">
                  <meta itemprop="height" :content="image.height">
                </a>
              </div>
              <!--{% if section.parameters[name ~ 'Url'] is defined %}-->
              <div class="main-btn">
                <a class="btn" itemprop="significantLink" :href="getSlideUrl(index)">
                  <!--{% if section.parameters[name ~ 'ButtonCaption'] is defined %}-->
                  <span v-if="getButton(index)">
                    {{getButton(index)}}
                  </span>
                  <!--{% else %}-->
                  <span><!--{{'Details'}}--></span>
                  <!--{% endif %}-->
                </a>
              </div>
<!--              {% endif %}-->
            </div>
            <!--{% endif %}
            {% endfor %}-->
          </div>
        </div>
      </div>
    </div>
    <!--{% endif %}-->
  </div>
</template>

<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { mixins } from 'vue-class-component';
  import BlockMixin from '~/mixins/block';

  export default
  @Component({
    name: "bzBoxNaviSection"
  })

  class bzBoxNaviSection extends mixins(BlockMixin) {
    @Prop() isWidePage;
    @Prop() section;

    getButton(index){
      const button = `this.section.parameters.Slide${index + 1}ButtonCaption`;
      return eval(button);
    }

    getSlideText(index){
      const text = `this.section.parameters.Slide${index + 1}Text`;
      return eval(text);
    }

    getSlideUrl(index){
      const url = `this.section.parameters.Slide${index + 1}Url`;
      return eval(url);
    }
  }
</script>

<style scoped>

</style>
