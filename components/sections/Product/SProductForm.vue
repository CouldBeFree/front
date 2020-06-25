<template>
    <div>
        <div v-html="form"></div>
    </div>
</template>

<script>
	import { Vue, Component, Prop } from 'vue-property-decorator';

	export default @Component({
		name: "SProductForm"
	})

	class ProductForm extends Vue{
    @Prop() id;

		form = null;

		async mounted(){
			const { data } = await this.$axios.get(`https://forms.biznestream.biz/api/v1/forms/${this.id}/code`);
      this.form = data
		}
	}
</script>

<style scoped>

</style>
