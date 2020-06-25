<template>

  <div ref="panel" class="panel panel-default" :class="{open: active}">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a href="" class="accordion-toggle" @click.prevent="$emit('click')" accordion-transclude="heading">
          <span>{{title}}</span>
        </a>
      </h4>
    </div>
    <transition
      name="expand"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
    >
      <div v-if="active" class="panel-collapse collapse" :class="{in: active}">
        <div class="panel-body">
          <div class="row dl-leaders">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import { Vue, Prop, Component, Inject } from 'vue-property-decorator';

  export default @Component({
    name: "SProductAccordion",
    components: {
    }
  })
  class SProductAccordion extends Vue {
    @Inject() accordion;

    @Prop() title;
    @Prop(Boolean) active;

    enter(element) {
      element.style.width = getComputedStyle(element).width;
      element.style.position = 'absolute';
      element.style.visibility = 'hidden';
      element.style.height = 'auto';
      const height = getComputedStyle(element).height;
      element.style.width = null;
      element.style.position = null;
      element.style.visibility = null;
      element.style.height = 0;
      getComputedStyle(element).height;
      setTimeout(() => {
        element.style.height = height;
      });
    }

    afterEnter(element) {
      this.$emit('input');
      element.style.height = 'auto';
      /*window.scroll({
        bottom: 350,
        left: 0,
        behavior: 'smooth'
      });*/
    }

    leave(element) {
      element.style.height = getComputedStyle(element).height;
      getComputedStyle(element).height;
      setTimeout(() => {
        element.style.height = 0;
      });
    }
  }
</script>

<style lang="scss" scoped>

  .expand-enter-active,
  .expand-leave-active {
    transition: height .4s;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }

  a{
    text-decoration: none;
  }

</style>
