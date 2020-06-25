<template>
  <div class="widget-menu-text">
    <template v-if="hasLink">
      <span class="text-ellipsis" v-append="text" v-html="text"></span>
    </template>
    <a v-else :href="link">
      <span class="text-ellipsis" v-append="text" v-html="text"></span>
    </a>
  </div>
</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzMenuWidget",
		components: {
		}
	})

	class bzMenuWidget extends Mixins(BlockMixin) {
		@Prop(String) link;
		@Prop(String) text;

		get hasLink() {
		  return this.text.indexOf('<a') !== -1;
    }
	}
</script>
