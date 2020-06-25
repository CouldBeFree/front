<template>
  <div>
    <!--{% if widget.mainImage %}-->
    <!--{% if widget.link and widget.button_caption %}-->
    <a :href="link" v-if="link" class="img-overlay img-overlay-container">
      <!--{% if widget.link and widget.button_caption %}-->
      <div v-if="link && buttonCaption" class="overlay main-btn">
        <div class="btn btn-default">{{buttonCaption}}</div>
      </div>
      <!--{% endif %}-->
      <!--{% set imgUrl = getImageUrl(widget.mainImage, widget.imageTypes.image) %}-->

      <!--<img src="{{ imgUrl|raw }}" alt="{{widget.title}}" />-->
    </a>
    <!--{% endif %}-->
    <!--{% if widget.title or widget.text %}-->
    <div v-if="title || text" class="widget-text">
      <!--{% if widget.title %}-->
      <h3 v-if="title">
        <span class="text-ellipsis">{{title}}</span>
      </h3>
      <div class="text" v-append="text" v-html="text"><!--{{ widget.text|raw }}--></div>
    </div>
  </div>
</template>

<script>
	import { Vue, Prop } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';

	export default
	@Component({
    name: "bzCubicWidget",
		components: {
		}
	})

	class bzCubicWidget extends Vue {
		@Prop(String) mainImage;
		@Prop(String) link;
		@Prop(String) buttonCaption;
		@Prop(String) title;
		@Prop(String) text;
	}
</script>

<style scoped>

</style>
