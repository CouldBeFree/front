<template>
  <!-- Widget Slider -->
  <div class="widget left-slider-widget">

    <div class="widget-title">
      <h4 class="h3">{{title}}</h4>
    </div>

    <!--{% set height = 300 %}
    {% if widget.parameters.height is defined %}
    {% set height = widget.parameters.height %}
    {% endif %}-->

    <!--<carousel interval="5000">
      {% for image in widget.images %}
      <slide>
        {% set imgUrl = getImageUrl(image,widget.imageTypes.image, height) %}
        <img src="{{ imgUrl|raw }}" alt="{{widget.title}}" title="{{title}}" class="img-responsive" />
      </slide>
      {% endfor %}
    </carousel>-->

    <!--<div class="widget-text">
      {#{{ widget.html|default(widget.text)|raw }}#}
      {{ widget.text|raw }}
    </div>-->
  </div>
</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzLeftSlider",
		components: {
		}
	})

	class bzLeftSlider extends Mixins(BlockMixin) {
		@Prop(String) title;
		@Prop(String) text;
	}
</script>

<style scoped>

</style>
