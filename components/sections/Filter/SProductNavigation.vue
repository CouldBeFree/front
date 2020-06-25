<template>
  <div class="container">
    <div class="row products-navigation" v-if="$route.name === 'url' && !sticky">
      <div class="col-xs-6" v-if="section.parameters.link">
        <span class="more-products" v-if="section.parameters.fullListButtonCaption">
          <a class="btn btn-primary" :href="section.parameters.link">{{section.parameters.fullListButtonCaption}}</a>
        </span>
        <span class="products-quantity"></span>
      </div>
      <div class="col-xs-6" v-if="!section.parameters.link">
        <span class="products-quantity"></span>
      </div>
      <div class="col-xs-6 text-right">
        <div class="pull-right">
          <div class="btn-group">
            <a class="btn btn-primary" href="" @click.prevent="onViewStyleChange('grid')" :class="{'active': viewStyle === 'grid'}">
              <span class="glyphicon glyphicon-th-large"></span>
            </a>
            <a class="btn btn-primary" href=""  @click.prevent="onViewStyleChange('table')" :class="{'active': viewStyle === 'table'}">
              <span class="glyphicon glyphicon-list-alt"></span></a>
            <a class="btn btn-primary" href=""  @click.prevent="onViewStyleChange('list')" :class="{'active': viewStyle === 'list'}">
              <span class="glyphicon glyphicon-th-list"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-toolbar" role="toolbar" v-else-if="$route.name === 'url-product'">
      <!--{% if productPage.productIndex %}
      <div class="btn-group btn-group-text">
        {{productPage.productIndex}}/{{productPage.productsCount}}
      </div>
      {% endif %}-->
      <div class="btn-group ">
      </div>
      <div class="btn-group btn-group-text" v-if="products">
        <span data-test="index">{{index + 1}}</span><span>/{{products.length}}</span>
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a href="" data-test="productBackward" id="productPageBackButton" type="button" class="btn btn-primary"
           @click.prevent.stop="switchProduct('start')">
          <span class="glyphicon glyphicon-backward"></span>
        </a>
      </div>
      <div class="btn-group btn-group btn-group-back" role="group">
        <a class="btn btn-primary" data-test="productPrevious" :disabled="index === 0"
           @click.prevent.stop="switchProduct('prev')">
          <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
      </div>
      <div class="btn-group btn-group" role="group" v-if="products">
        <a class="btn btn-primary" data-test="productNext" :disabled="products.length - 1 === index"
           @click.prevent.stop="switchProduct('next')">
          <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
  import { Vue, Watch, Prop } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';

  const { State, Action } = namespace('products');

  export default @Component({
    name: "SProductNavigation",
    components: {}
  })
  class SProductNavigation extends Vue {
    @Action loadProductsData;

    @Prop() section;
    @Prop() sticky;

    index = 0;

    products = [];

    viewStyle = 'grid';

    @Watch('$route')
    onRouteChange (route) {
      if(route.name === 'url-product'){
        this.getProducts();
      }
    }

    async mounted () {
      if(this.$route.name === 'url-product'){
        this.getProducts();
      }
    }

    async getProducts(){
      let params = {};
      params.configuration_id = this.section.parameters.configuration;
      params.blockId = this.section._id;
      const data = await this.loadProductsData(params);
      this.products = data.products;
      const { count } = data;
      this.$emit('count', count);

      const path = this.$route.path;
      const splitted = path.split('-');
      const id = splitted[splitted.length - 1];
      let currentIndex = this.products.findIndex(el => el.id === id);
      currentIndex > -1 ? this.index = currentIndex : false;
    }

    switchProduct (step) {
      let url = '';
      if (step === 'next' && this.products.length - 1 !== this.index) {
        url = this.products[this.index + 1].url;
      } else if (step === 'prev' && this.index !== 0) {
        url = this.products[this.index - 1].url;
      } else if (step === 'start' && this.index !== 0) {
        url = this.products[0].url;
      } else if (step !== 'next' && step !== 'prev') {
        url = { path: '/' }
      }
      const { route } = this.$router.resolve(url);
      const newRoute = { ...route };
      newRoute.query = this.$route.query;
      this.$router.push(newRoute);
    }

    onViewStyleChange(style){
      this.viewStyle = style;
      this.$emit('viewStyle', style);
    }
  }
</script>
