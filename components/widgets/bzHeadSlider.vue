<template>
  <!--<div class="head-slider-widget"
       style="{% if widget.parameters.height is defined %} min-height: {{ widget.parameters.height }}px; height: {{ widget.parameters.height }}px{% endif %}">-->
    <div class="head-text-container">
      <div v-if="title" class="widget-title h1" v-append="title" v-html="title"></div>
      <div v-if="text" class="widget-text" v-append="text" v-html="text"></div>
    </div>
    <!--<div class="header-carousel" style="{% if widget.parameters.height is defined %}height: {{ widget.parameters.height  }}px{% endif %}">-->
      <!--<carousel class="ng-cloak" interval="30000" style="{% if widget.parameters.height is defined %}height: {{ widget.parameters.height  }}px{% endif %}">

        {% set height = 500 %}
        {% if widget.parameters.height is defined %}
        {% set height = widget.parameters.height %}
        {% endif %}
        {% for image in widget.images %}
        <slide>
          {% set imgUrl = getImageUrl(image, widget.imageTypes.image, height) %}
          <div class="fill" style="background-image: url('{{ imgUrl|raw }}')"></div>
        </slide>
        {% endfor %}
      </carousel>-->
    <!--</div>-->
  <!--</div>-->

</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzHeadSlider",
		components: {
		}
	})

	class bzHeadSlider extends Mixins(BlockMixin) {
		@Prop(String) title;
		@Prop(String) text;
	}
</script>

<style scoped>

</style>
