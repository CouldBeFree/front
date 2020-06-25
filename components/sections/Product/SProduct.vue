<template>
<div class="product-item" data-test="productCard">
  <span @click="openProduct(product)" style="cursor: pointer" class="thumbnail">
    <div class="product-image img-overlay img-overlay-container">
      <div class="overlay main-btn">
        <div class="btn btn-default">
          <span>{{section.parameters.buttonCaption || 'Details'}}</span>
        </div>
      </div>

        <img v-if="product.image && viewStyle == 'grid'" :alt="product.image.alt || product.title"
             :title="product.image.title || product.title" class="img-responsive" :src="`${product.image.url}?w=300&h=200&zs=1`" />

        <img v-if="product.image && viewStyle == 'list'" :alt="product.image.alt || product.title"
             :title="product.image.title || product.title"
             class="img-responsive" :src="`${product.image.url}?w=350&zs=1`" />

    </div>
    <div class="product-info">
      <div class="product-title tooltipped tooltipped-n" :aria-label="product.title">
        <span class="text-ellipsis h3">{{product.title}}</span>
      </div>
      <div class="product-attributes-container">
        <div class="product-attributes">
          <s-product-attribute show-title v-for="(attribute, index) in product.attributes" :key="index" v-if="attribute.value !== null" :attribute="attribute"></s-product-attribute>

          <div class="btn btn-primary visible-xs visible-sm btn-details">
            <span>{{section.button_caption || 'Details'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
  </span>
</div>
</template>

<script>
    import {Vue, Prop, Component} from 'vue-property-decorator';
    import SProductAttribute from './SProductAttribute';

    export default @Component({
        name: "SProduct",
        components: {
            SProductAttribute
        }
    })
    class SProduct extends Vue {
        @Prop() product;
        @Prop() section;
        @Prop() viewStyle;

        openProduct(product) {
          let url = product.url;
          if (this.section.title === 'simple-product') {
            url = url.replace(/\/[^\/]+\/(.*)/, this.section.parameters.link + '/$1');
          }
          const { route } = this.$router.resolve(url);
          const newRoute = { ...route };
          console.info(newRoute);
          newRoute.query = this.$route.query;
          this.$router.push(newRoute);
        }
    }
</script>
