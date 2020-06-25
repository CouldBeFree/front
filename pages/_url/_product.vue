<template>
  <div class="product-page list-view-null" itemscope itemtype="http://schema.org/Product">
    <h1 itemprop="name" v-if="product">{{product.page_title}}</h1>
    <div>
      <div class="row" v-if="product">
        <div v-if="product.images.length > 0" class="col-lg-4 col-md-4 col-xs-12" itemscope itemtype="http://schema.org/ImageGallery">
          <s-product-thumbnail :images="product.images" :selected.sync="selectedImage"></s-product-thumbnail>
        </div>
        <div class="col-lg-8 col-md-8 col-xs-12">

          <s-product-images :images="product.images" :selected.sync="selectedImage"></s-product-images>

          <s-product-accordion :tabs="product.tabs" @input="onClick">

            <template slot="tab" slot-scope="{ tab, index }">

                <s-product-attribute
                  v-for="(attribute, index) in tab.attributes"
                  v-if="attribute.value !== null"
                  :key="index"
                  show-title
                  :attribute="attribute">
                </s-product-attribute>

            </template>
          </s-product-accordion>

          <div class="form-widget" v-if="section.parameters.contactFormId">
            <s-product-form
              :id="section.parameters.contactFormId">
            </s-product-form>
          </div>
        </div>
      </div>
    </div>

    <!--<s-product-tab v-for="tab, index in product.tabs" :key="index" :tab="tab"></s-product-tab>-->
  </div>
</template>

<script>
  import { Vue, Prop, Watch } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';
  import SProductAccordion from '~/components/sections/Product/SProductAccordion';
  import SProductAttribute from '~/components/sections/Product/SProductAttribute';
  import SProductThumbnail from '~/components/sections/Product/SProductThumbnail';
  import SProductImages from '~/components/sections/Product/SProductImages';
  import SProductForm from '~/components/sections/Product/SProductForm';

  const { Action } = namespace('products');

  export default @Component({
    name: "ProductPage",
    components: {
      SProductAttribute,
      SProductAccordion,
      SProductThumbnail,
      SProductImages,
      SProductForm
    }
  })
  class ProductPage extends Vue {
    @Prop() section;

    @Action loadProductData;

    product = null;

    selectedImage = 0;

    onClick(){
      this.$el.scrollIntoView({ behavior: "smooth" });
    }

    async getProduct(){
      return this.product = await this.loadProductData({
        id: this.productId,
        blockId: this.section._id,
        configurationId: this.section.parameters.configuration
      });
    }

    get productId() {
      const product = this.$route.params.product;
      const [,productName, productId] = product.match(/(.*)\-(\d+)/);
      return productId;
    }

    @Watch('$route')
    async onRouteChange(route){
      this.getProduct();

      if(route.name === 'url-product' && process.client){
        this.$el.scrollIntoView({ behavior: "smooth" });
      }
    }

    onImageSelect(image){
      this.thumbnail = image;
    }

    async mounted () {
      await this.getProduct();
    }
  }
</script>
