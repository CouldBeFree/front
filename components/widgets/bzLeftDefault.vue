<template>
  <aside class="widget left-default-widget">

    <div class="widget_title">
      <h4 class="h3">{{title}}</h4>
    </div>
    <!--{% if widget.mainImage %}-->
    <div class="widget-image">
      <a :href="link"  class="img-overlay">
        <!--{% set imgUrl = getImageUrl(widget.mainImage, '') %}
        <img class="img-responsive img-centered" src="{{ imgUrl|raw }}" alt="{{title}}" title="{{title}}" />-->
        <bz-img v-if="mainImage" :file="mainImage" :width="1200" class="img-responsive" />
      </a>
    </div>
    <!--{% endif %}-->

    <!-- Text -->
    <div class="widget-text" v-if="text" v-append="text" v-html="text"></div>

    <div v-if="buttonCaption">
      <a class="btn btn-primary btn-block" :href="link">
        <span class="text-overflow">{{buttonCaption}}</span>
      </a>
    </div>
  </aside>
</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
	import BlockMixin from "../../mixins/block";
	import bzImg from '../bzImg';

	export default
	@Component({
    name: "bzLeftDefault",
		components: {
			bzImg
		}
	})

	class bzLeftDefault extends Mixins(BlockMixin) {
    @Prop(String) text;
    @Prop(String) buttonCaption;
    @Prop(String) link;
    @Prop(String) title;
	}
</script>

<style scoped>

</style>
