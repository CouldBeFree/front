<template>
  <div>
    <!--{% include 'widgets/top-default.twig' %}-->
  </div>
</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
		components: {
		}
	})

	class bzHeadLandingPage extends Mixins(BlockMixin) {

	}
</script>

<style scoped>

</style>
