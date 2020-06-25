<template>

    <img class="image-test" :src="`/api/v1/preview/${file.id}/1200x`" />

</template>
<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component from 'nuxt-class-component';

  export default
  @Component({
    name: "bzImg",
    components: {
    }
  })
  class bzImg extends Vue {
    @Prop() file;
    @Prop(Number) width;
  }
</script>
