<template>

  <bz-menu-items :items="menuItems[type] || []" v-if="(menuItems[type] || []).length" />

</template>
<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';
  import bzMenuItems from './bzMenuItems';

  const { State, Mutation, Action } = namespace('menu');
  const { State: ContextState } = namespace('context');

  export default
  @Component({
    components: {
      bzMenuItems
    }
  })
  class bzMenu extends Vue {
    @Prop(String) type;

    @State('items') menuItems;

    @Mutation setDomain;
    @Action loadMenuByType;

    @ContextState domain;

    mounted() {
      this.setDomain(this.domain);
      this.loadMenuByType(this.type);
    }
  }
</script>
