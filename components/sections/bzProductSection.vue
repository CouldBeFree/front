<template>

  <div class="section product-section">

    <div sticky-container :class="{is_stuck: sticky}">

      <div v-sticky sticky-offset="offsetTop" ref="target" class="product-filter-outer">

        <s-product-filter-container
          v-if="!isSimpleProduct || !section.parameters.link"
          :title="sectionOptions.title"
          :collapsed.sync="filterCollapsed"
          :filters="sectionOptions.attributes"
          v-model="filter" @input="onFilterUpdate($event, false)"
        >

          <s-product-filter
            v-model="filter"
            :options="sectionOptions"
            :filters="sectionOptions.attributes"
            :values="currentFilterValues"
            :quantity="productQuantity"
            @input="onFilterUpdate"
            @filter="getFilterData"
          ></s-product-filter>

        </s-product-filter-container>

        <s-product-navigation
          @count="getProductQuantity"
          :section="section"
          @viewStyle="onStyleChange"
          :sticky="sticky"
        ></s-product-navigation>

      </div>

      <div class="container">

        <div class="current-product-view" :class="{'list-view-null': $route.name === 'url-product' || 'url'}">

          <nuxt-child v-if="isProductPage" keep-alive :section="section"></nuxt-child>

          <products-page
            v-else
            :viewStyle="viewStyle"
            :query="query"
            @productQuantity="getProductQuantity"
            :section="section"
          ></products-page>

        </div>

      </div>

    </div>

  </div>

</template>

<script>
  import { Vue, Prop, Component, Watch, Mixins } from 'vue-property-decorator';
  import { namespace } from 'nuxt-class-component';
  import SProductNavigation from './Filter/SProductNavigation';
  import SProductFilter from './Filter/SProductFilter';
  import { filterToParams, qsToFilter } from '~/helpers/common';
  import SProductFilterContainer from './Filter/SProductFilterContainer';
  import ProductsPage from './Pages/ProductsPage';
  import BlockMixin from '~/mixins/block';

  const { Action, State } = namespace('products');
  const Context = namespace('context');

  export default @Component({
    name: "bzProductsSection",
    components: {
      SProductNavigation,
      SProductFilterContainer,
      SProductFilter,
      ProductsPage
    }
  })

  class bzProductsSection extends Mixins(BlockMixin) {
    @Prop() configuration;
    @Prop() contactFormId;
    @Prop() defaultStyle;
    @Prop() section;

    @Action loadFilterData;
    @Action loadProductsData;

    @Context.State offset;

    filterCollapsed = false;
    currentFilterValues = [];
    filter = {};
    productQuantity = 0;
    viewStyle = 'grid';
    query = {};
    observer = null;
    sticky = false;

    sectionOptions = {
      title: 'Filter',
      backButtonCaption: 'Back',
      filterButtonCaption: 'Submit',
      loadListChunks: 'auto',
      attributes: []
    };

    get offsetTop(){
      return { top: this.offset, bottom: false }
    }

    getProductQuantity(val){
      this.productQuantity = val
    }

    onStyleChange(val){
      this.viewStyle = val
    }

    get isSimpleProduct() {
      return this.section.title === 'simple-product' || 'product';
    }

    get isProductPage() {
      return this.$route.name === 'url-product';
    }

    async mounted () {
      await this.getFilterData();
      this.onQueryChange(this.section.blockId);
      if(this.$route.name === 'url-product' && process.client){
        this.$el.scrollIntoView({ behavior: 'smooth' });
      }

      this.observer = new MutationObserver(mutations => {
        for (const m of mutations) {
          const newValue = m.target.getAttribute(m.attributeName);
          this.onClassChange(newValue, m.oldValue);
        }
      });
      this.$nextTick(() => {
        if(this.$refs.target){
          this.observer.observe(this.$refs.target, {
            attributes: true,
            attributeOldValue : true,
            attributeFilter: ['class'],
          });
        }
      })
    }

    onClassChange(classAttrValue) {
      const classList = classAttrValue.split(' ');
      if (classList.includes('top-sticky')) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }

    onFilterUpdate(val, collapse = true) {
      this.filter = val;
      this.filterCollapsed = collapse;
      const query = filterToParams(val, this.sectionOptions.attributes, this.filter, true);
      this.query = query;

      const newRoute = { ...this.$route };
      newRoute.name = 'url';
      newRoute.query = query;
      this.$router.push(newRoute);
    }

    async getFilterData(val) {
      const sectionParameters = {configuration_id: this.section.parameters.configuration, blockId: this.section._id};
      let params = { sectionId: this.sectionId, configurationId: this.configuration };
      if(!val){
        this.sectionOptions = await this.loadFilterData(params);
      } else {
        const query = filterToParams(val, this.sectionOptions.attributes, this.filter, true);
        const productParams = Object.assign(query, sectionParameters);
        const { count } = await this.loadProductsData(productParams);
        this.productQuantity = count;
        const test = filterToParams(val, this.sectionOptions.attributes, this.filter, true);
        params = { sectionId: this.sectionId, configurationId: this.configuration, filter: test };
        this.sectionOptions = await this.loadFilterData(params);
      }
    }

    @Watch('$route.query')
    onQueryChange () {
      this.filter = qsToFilter(this.$route.query, this.sectionOptions.attributes, {}, true);
    }

    @Watch('$route')
    onRouteChange(route){
      if(route.name === 'url-product'){
        this.$el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
</script>
