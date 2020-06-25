<template>
  <div :class="`view-${viewStyle}`">

    <template v-if="viewStyle !== 'table'">

      <div>

        <s-product
          v-for="(product, index) in products"
          :section="section"
          :product="product"
          :view-style="viewStyle"
          :key="index"
        ></s-product>

        <div class="col-xs-12 text-center" v-if="loading">
          Loading data...
          <br/>
          <br/>
        </div>
        <div class="col-xs-12" v-if="data.nextCount">
          <a ref="target" href="" class="btn btn-primary btn-block" @click.prevent="getMoreProducts">{{data.nextText}}</a>
        </div>
      </div>
    </template>
    <template v-if="viewStyle === 'table'">
      <table class="table table-striped table-hover" v-if="products.length">
        <tbody>
        <tr class="table-head">
          <th class="cell-title">&nbsp;</th>
          <th class="cell-attribute hidden-sm hidden-xs" v-for="attr in products[0].attributes">
            <div class="tooltipped tooltipped-n" :aria-label="attr.title">
              <span class="text-ellipsis">{{attr.title}}</span>
            </div>
          </th>
          <th class="cell-image hidden-sm hidden-xs"></th>
        </tr>
        <tr v-for="product in products">
          <td class="cell-title">
            <div class="tooltipped tooltipped-n" :aria-label="product.title">
              <strong class="text-ellipsis">{{product.title}}</strong>
            </div>

            <div class="product-info visible-sm visible-xs">
              <dl v-for="attribute in product.attributes" :aria-label="attribute.value" in-list="true">{{attribute.value}}</dl>
            </div>
          </td>
          <td class="cell-attribute attribute hidden-sm hidden-xs" v-for="attribute in product.attributes">
            <dl :aria-label="attribute.value">
              <dd class="type-number">
                <span class="tooltipped tooltipped-n" :aria-label="attribute.value">
                  <span class="text-ellipsis">{{attribute.value}} {{attribute.suffix}}</span>
                </span>
              </dd>
            </dl>
          </td>
          <td class="cell-image hidden-sm hidden-xs">
            <img v-if="product.image" class="img-responsive" :src="`${product.image.url}?w=200&h=150&zs=1`" />
          </td>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
  import { Vue, Prop, Watch } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';
  import SProduct from '../Product/SProduct';
  import { qsToFilter } from '~/helpers/common';

  const { State, Action } = namespace('products');

  export default @Component({
    name: "ProductsPage",
    components: {
      SProduct
    }
  })
  class ProductsPages extends Vue {
    @Prop() query;
    @Prop() section;
    @Prop() viewStyle;

    @State loading;

    @Action loadProductsData;

    data = {};

    products = [];

    clickCount = 0;

    options = {
      root: null,
      threshold: 0
    };

    observer = null;

    observerCallback (entries, observer) {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          //this.getMoreProducts();
        }
      })
    }

    get params(){
      return {
        configuration_id: this.section.parameters.configuration,
        blockId: this.section._id
      }
    }

    async mounted () {
      console.info(this.$route, this.section);
      const data = await this.loadProductsData(this.params);
      this.data = data;
      this.products = data.products;
      const { count } = data;
      this.$emit('productQuantity', count);

      // Observer for getting data on scroll
      this.$nextTick(() => {
        this.observer = new IntersectionObserver(this.observerCallback, this.options);
        if(this.$refs.target){
          this.observer.observe(this.$refs.target);
        }
      });
    }

    async getMoreProducts(){
      this.clickCount += this.data.nextCount;
      this.params.offset = this.clickCount;
      const data = await this.loadProductsData(this.params);
      this.data = data;
      this.products = this.products.concat(data.products);
    }

    @Watch('query')
    async onQueryChange () {
      console.info('watch', this.query);
      const query = Object.assign(this.query, this.params);
      const data = await this.loadProductsData(query);
      this.data = data;
      this.products = data.products;
      const { count } = data;
      this.$emit('productQuantity', count);
    }
  }
</script>

<style scoped>

</style>
