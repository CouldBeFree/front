<template>
  <ul :class="`${css}`">
    <li v-for="(item, index) of items" :key="index" @click="onMenuClick(index)" :class="{'active': index === activeIndex, 'open': isOpen}">
      <nuxt-link v-if="!item.children.length" :class="`${item.css || ''}`" :id="`menu-item-${item.id}`" :to="item.link">{{ item.title }}</nuxt-link>

      <template v-else>
        <a :href="item.link" :class="`${item.css || ''}`">
          {{ item.title }}
          <b v-if="item.children.length" class="caret hidden-xs hidden-sm"></b>
        </a>
        <div class="plus visible-xs hidden-md" ng-click="toggleMenu({ item.id }})">
          <span class="glyphicon" ng-class="{'glyphicon-plus': !menus[{ item.id }}], 'glyphicon-minus': menus[{ item.id }}]}"></span>
        </div>
        <div>
          <bz-menu-items :items="item.children" v-if="item.children.length" :css="`dropdown-menu ${css}`" />
        </div>
      </template>
    </li>
  </ul>
</template>
<script>
  import { Vue, Prop, Watch } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';

  export default
  @Component({
    name: 'bzMenuItems',
    components: {
    }
  })
  class bzMenuItems extends Vue {
    @Prop(Array) items;
    @Prop(String) css;

    activeIndex = 0;

    get isOpen() {
      return false;
    }

    onMenuClick(index){
      this.activeIndex = index;
    }
  }
</script>
