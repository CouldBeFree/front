<template>
  <div class="text-center ng-cloak">
    <div class="image-block">
      <!--{% set imgUrl = getImageUrl(widget.mainImage,widget.imageTypes.image) %}-->
      <a v-if="link" class="img-overlay img-circle img-overlay-container" :href="link">
        <div class="overlay img-circle main-btn">
          <div class="btn btn-default">
            <span>{{buttonCaption}}</span>
          </div>
        </div>
        <!--{% if widget.mainImage %}
        <img src="{{ imgUrl|raw }}" alt="{{widget.title}}" title="{{widget.title}}" class="img-responsive img-circle" />
        {% endif %}-->
      </a>
      <!--<span class="img-circle">
            {% if widget.mainImage %}
			    <img src="{{ imgUrl|raw }}" alt="{{widget.title}}" title="{{widget.title}}" class="img-responsive img-circle" />
            {% endif %}
		  </span>-->
    </div>
    <h3 v-if="title" class="widget-title">{{title}}</h3>

    <div class="widget-text text-center" v-if="text" v-append="text" v-html="text"></div>

  </div>

</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzTopNavigation",
		components: {
		}
	})

	class bzTopNavigation extends Mixins(BlockMixin){
		@Prop(String) link;
		@Prop(String) buttonCaption;
    @Prop(String) title;
    @Prop(String) text;
	}
</script>

<style scoped>

</style>
