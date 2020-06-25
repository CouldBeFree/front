<template>
  <div class="has-padding section">
    <h2 v-if="title" class="text-center">{{ title }}</h2>

    <div v-if="form" class="form-section">
      <div class="container" v-append="formCode" v-html="formCode"></div>
    </div>
  </div>
</template>

<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { mixins } from 'vue-class-component';
  import BlockMixin from '~/mixins/block';
  import bzImg from '../bzImg';

  export default
  @Component({
    components: {
      bzImg
    }
  })
  class bzFormSection extends mixins(BlockMixin) {
    @Prop() isWidePage;
    @Prop() form;
    @Prop(String) title;

    formCode = '';

    get isWide() {
      return this.template === 'wide-image';
    }

    async mounted() {
      if (this.form) {
        this.formCode = await this.getFormCode(this.form);
      }
    }
  }
</script>
