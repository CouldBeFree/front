<template>
  <div form-set-classes>
    <div v-append="form" v-html="form"></div>
  </div>
</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzFormWidget",
		components: {
		}
	})

	class bzFormWidget extends Mixins(BlockMixin) {
		@Prop(String) text;
		@Prop(Number) id;

		form = null;

		async mounted(){
			const { data } = await this.$axios.get(`https://forms.biznestream.biz/api/v1/forms/${this.id}/code`);
			this.form = data
		}
	}
</script>

<style scoped>

</style>
