<template>
  <div class="navbar-container">
    <nav class="navbar navbar-default top" role="navigation" :class="{'navbar-fixed-top': sticky}">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!--{% set logoUrl = getImageUrl(domain.logo,domain.imageTypes.logo) %}-->

          <span class="navbar-brand" v-if="isIndexPage">
            <bz-img :file="domain.logo" :width="1200" :alt="title" :title="title" class="img-responsive" />
          </span>
          <nuxt-link v-else class="navbar-brand" :to="{ path: '/' }" rel="home">
            <bz-img :file="domain.logo" :width="1200" :alt="title" :title="title" class="img-responsive" />
          </nuxt-link>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

          <div v-if="blocks.menu || blocks.domain" class="top-panel">
            <div class="row">
              <div class="col-md-8">
                <div>
                  <bz-menu class="menu-domains list-unstyled list-inline" type="domain"></bz-menu>
                </div>
              </div>

              <div class="col-md-4" v-if="blocks.menu">
                <bz-widget v-for="widget in blocks.menu" :key="widget._id" :widget="widget" />
              </div>
            </div>
          </div>

          <div ref="nav">
            <bz-menu class="nav navbar-nav" type="main"></bz-menu>
          </div>

        </div>
      </div>
      <div class="clearfix"></div>
    </nav>
  </div>

</template>
<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { namespace } from 'nuxt-class-component';
  import bzMenu from './bzMenu';
  import bzWidget from '~/components/bzWidget';
  import bzImg from '~/components/bzImg';

  const { State, Mutation } = namespace('context');

  export default
  @Component({
    components: {
      bzMenu,
      bzWidget,
      bzImg
    }
  })

  class bzMainMenu extends Vue {
    @Prop(String) title;
    @Prop(Boolean) isIndexPage;

    @State domain;
    @State blocks;

    @Mutation setOffset;

    sticky = false;
    offset = 0;

    mounted(){
      window.addEventListener('scroll', () => {
        window.scrollY > 160 ? this.sticky = true : this.sticky = false;
      });
      setTimeout(() => {
        this.offset = this.$refs.nav.childNodes[0].offsetHeight;
        this.setOffset(this.offset);
      }, 1000);
    }
  }
</script>
