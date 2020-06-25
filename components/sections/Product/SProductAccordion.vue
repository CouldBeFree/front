<template>
  <div class="accordion-heading-full product-attributes" ref="accordion" style="margin: 0">
    <div class="panel-group">
      <s-product-accordion-tab
        :title="tab.title"
        v-for="(tab, index) in tabs"
        :key="index"
        :active="index === activeIndex"
        @click="selectTab(index)"
        @input="$emit('input')"
      >
        <slot
          name="tab"
          :tab="tab"
          :index="index"
        >
        </slot>
      </s-product-accordion-tab>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Provide } from 'vue-property-decorator';
  import SProductAccordionTab from './SProductAccordionTab';

  export default @Component({
    name: "SProductAccordion",
    components: {
      SProductAccordionTab
    }
  })
  class SProductAccordion extends Vue {
    @Provide() accordion = this;

    @Prop() tabs;

    activeIndex = 0;

    selectTab(index) {
      this.activeIndex = index;
    }
  }
</script>
