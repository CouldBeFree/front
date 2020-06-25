<template>
  <div class="page-wrapper" v-if="domain && page">
    <div v-append="domain.htmlHeadCode" v-html="domain.htmlHeadCode"></div>
    <div v-append="page.headScript" v-html="page.headScript"></div>

    <header :class="{'no-header-widgets': !blocks.head, 'page-without-header': isHideHeader}" ref="head">
      <bz-main-menu :is-index-page="page._id === domain.indexPage._id" :title="domain.title"></bz-main-menu>

      <div class="header-head-widgets">
        <bz-widget v-for="widget, n in blocks.head" :key="n" :widget="widget" />
      </div>

      <div>
        <bz-widget v-for="widget, n in blocks['top-head']" :key="n" :widget="widget" />
      </div>
    </header>

    <!--{% include 'widgets/side.twig' %}-->

    <main role="main" itemscope itemtype="http://schema.org/WebPage">
      <nuxt />
    </main>

    <div>
      <bz-widget v-for="(widget, index) in blocks.bottom" :widget="widget" :key="index" />
    </div>
    <div class="clearfix"></div>
    <footer>
      <div class="clearfix visible-sm visible-xs">
        <bz-widget v-for="(widget, index) in blocks.menu" :key="index" :widget="widget" />
      </div>

      <nav class="navbar navbar-default">
        <div class="navbar-collapse">
          <div class="container">
            <bz-menu class="nav navbar-nav menu-domains visible-sm visible-xs" type="domain"></bz-menu>

            <bz-menu class="nav navbar-nav" type="footer"></bz-menu>
          </div>
        </div>
      </nav>
    </footer>
    <div class="clearfix"></div>

    <a href="#" class="to-top" :class="{'show': isVisible}" @click.prevent="scrollTop">
      <span class="tooltipped tooltipped-w" aria-label="Scroll to top">
        <span class="glyphicon glyphicon-chevron-up"></span>
      </span>
    </a>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Component, { namespace } from 'nuxt-class-component';
  import bzMainMenu from '~/components/bzMainMenu';
  import bzMenu from '~/components/bzMenu';
  import bzWidget from '~/components/bzWidget';

  const { State, Mutation, Getter } = namespace('context');

  export default
  @Component({
    components: {
      bzMainMenu,
      bzWidget,
      bzMenu
    },
    middleware: ['page']
  })
  class DefaultLayout extends Vue {
    @State domain;
    @State page;
    @State blocks;

    isVisible = false;

    get isHideHeader() {
      return this.page.hideH1 || !this.page.title;
    }

    mounted(){
    	window.addEventListener('scroll', () => {
		    window.scrollY > 160 ? this.isVisible = true : this.isVisible = false;
	    });
    }

	  scrollTop(){
    	window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    head () {
      if (!this.page) {
        return {};
      }
      return {
        title: this.page.metaTitle,
        meta: [{ hid: 'description', name: 'description', content: this.page.metaDescription }],
        link: [
          // { rel: 'stylesheet', href: `/api/v1/assets/${this.domain.template._id}/min?t=${this.domain.template.updatedAt}`, media: 'all' },
          { rel: 'stylesheet', href: `/api/v1/assets/${this.domain.template._id}/full?t=${this.domain.template.updatedAt}`, media: 'all' /*'nope!'*/, onload: 'this.media=\'all\'' },
        ]
      }
    }
  }
</script>
