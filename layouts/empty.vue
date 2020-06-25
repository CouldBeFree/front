<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
  import Vue from 'vue';
  import Component, { namespace } from 'nuxt-class-component';

  export default
  @Component({
    components: {
    }
  })
  class EmptyLayout extends Vue {
  }
</script>
