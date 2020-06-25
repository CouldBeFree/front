<template>
  <div class="bottom-default-widget">
    <div class="container">

      <bz-img v-if="mainImage" :file="mainImage" :width="1200" class="img-responsive" />
      <!--{% if widget.mainImage %}-->
      <!--{% set imgUrl = getImageUrl(widget.mainImage,widget.imageTypes.image) %}-->

      <!--<img src="{{ imgUrl|raw }}" alt="{{widget.title}}" class="img-responsive" />-->
      <!--{% endif %}-->

      <div class="widget-content">
        <div class="row" :class="{ 'has-background': text }">
          <div :class="{ 'col-md-10 col-xs-12': buttonCaption, 'col-xs-12': !buttonCaption }">
            <div class="widget-text" v-append="text" v-html="text" bz-dot></div>
          </div>
          <div class="col-md-2 col-xs-12" bz-dot v-if="link && buttonCaption">
            <a class="btn btn-primary pull-right" :href="link">
						  <span class="text-ellipsis">{{ buttonCaption }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Vue, Prop, Mixins } from 'vue-property-decorator';
  import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';
  import bzImg from '../bzImg';

  export default
  @Component({
    name: 'bzTopDefaultWidget',
    components: {
      bzImg
    }
  })
  class bzTopDefaultWidget extends Mixins(BlockMixin) {
    @Prop(String) title;
    @Prop(String) text;
    @Prop(String) link;
    @Prop(String) buttonCaption;
  }
</script>
