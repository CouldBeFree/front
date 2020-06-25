<template>

  <div v-if="blocks.side && blocks.side.length" id="slideout" class="hidden-xs hidden-sm">
    <!--<a class="img-inner tooltipped tooltipped-e toggler"
       aria-label="{{ sideWidgets[0].button_caption |default('Contact us') }}">
      {% set imgUrl = getImageUrl(sideWidgets[0].mainImage, sideWidgets[0].imageTypes.image) %}

      <img src="{{ imgUrl|raw }}" />
    </a>-->
    <div id="slideout_inner">
      <div class="over">
        <div class="nano">
          <div class="nano-content">
            <div class="row">
              <div class="form col-md-12" v-append="form" v-html="form"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component, { namespace } from 'nuxt-class-component';
	const { State, Mutation, Getter } = namespace('context');
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzSideWidget",
		components: {
		}
	})
	class bzSideWidget extends Mixins(BlockMixin) {
		@State blocks;

		@Prop(String) buttonCaption;
		@Prop(Array) sideWidgets;

		form = null;

		async mounted(){
			const { data } = await axios.get(`https://forms.biznestream.biz/api/v1/forms/${this.blocks.side[0].parameters.contactFormId}/code`);
			this.form = data
		}
	}
</script>

<style scoped>

</style>
