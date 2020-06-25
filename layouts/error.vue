<template>
  <div :class="isWide ? 'wide wide-page' : 'default default-page'">

    <div class="container" v-if="!isHideHeader">
      <div v-if="isWide">
        <h1 v-if="page.title" class="text-center">{{page.title}}</h1>
      </div>

      <div class="row" v-else>
        <div class="col-md-9 col-md-offset-3">
          <h1 v-if="page.title">{{page.title}}</h1>
        </div>
      </div>
    </div>

    <div v-if="blocks.top" class="top-multiple-widget">
      <div class="container">
        {{blocks.top}}
      </div>
    </div>

    <div v-if="blocks['top-cubics']" class="top-cubic-widget cubics-widget">
      <div class="container">
        <div class="row">
          {{blocks['top-cubics']}}
        </div>
      </div>
    </div>


    <div :class="isWide ? 'wide-content' : 'container'">

      <div :class="{'row': !isWide}">
        <div :class="{'col-md-9 col-md-push-3': !isWide}">

          <div :class="{'row': !isWide}">
            <bz-section v-for="section, n in blocks.page" :key="n" :page="page" :is-wide-page="isWide" :section="section"></bz-section>
          </div>

        </div>
        <div v-if="!isWide" class="col-md-3 col-md-pull-9 widget-container">
          <bz-widget v-for="(widget, index) in blocks.left" :key=index :widget="widget"></bz-widget>
        </div>
      </div>
    </div>

    <div v-if="blocks['bottom-cubics']" class="bottom-cubic-widget cubics-widget">
      <div class="container">
        <div class="row">
          {{blocks['bottom-cubics']}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';
  import bzSection from '~/components/bzSection';
  import bzWidget from '~/components/bzWidget'

  const { State, Mutation, Getter } = namespace('context');

  export default
  @Component({
    components: {
      bzSection,
      bzWidget
    }
  })
  class ErrorPage extends Vue {
    @Prop() error;

    @State page;
    @State blocks;

    get isWide() {
      return this.page.pageLayout === 'wide';
    }

    get isHideHeader() {
      return this.page.hideH1 || !this.page.title;
    }
  }

  ErrorPage.layout = function({ error }) {
    return error.isParkedDomain ? 'parked-domain' : 'default';
  }
</script>
