<template>
  <div class="head-default-widget">
    <div class="head-text-container">
      <div v-if="title" class="widget-title h1">{{ title }}</div>
      <div v-if="text" v-append="text" v-html="text" class="widget-text"></div>
    </div>

    <bz-img v-if="mainImage" :file="mainImage" :width="1200" class="img-responsive" />
    <!--{% set imgUrl = getImageUrl(widget.mainImage,widget.imageTypes.image) %}-->
    <!--{% if widget.mainImage %}-->
    <!--<img src="{{ imgUrl|raw }}" />-->
    <!--{% endif %}-->
    <!--<bz-img v-if="imageLink" src="imageLink" />-->
  </div>
</template>
<script>
  import { Vue, Prop, Mixins, Component } from 'vue-property-decorator';
  import BlockMixin from '~/mixins/block';
  import bzImg from '../bzImg';

  export default
  @Component({
    name: "bzHeadDefaultWidget",
    components: {
      bzImg
    }
  })
  class bzHeadDefaultWidget extends Mixins(BlockMixin) {
    @Prop(String) title;
    @Prop(String) text;
  }
</script>
