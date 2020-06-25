<script>
  import { Vue, Component } from 'vue-property-decorator';
  import bzTopDefaultWidget from './widgets/bzTopDefaultWidget';
  import bzHeadDefaultWidget from './widgets/bzHeadDefaultWidget';
  import bzMenuWidget from './widgets/bzMenuWidget';
  import bzCubicWidget from './widgets/bzCubicWidget';
  import bzFormWidget from './widgets/bzFormWidget';
  import bzSideWidget from './widgets/bzSideWidget';
  import bzBottomDefaultWidget from './widgets/bzBottomDefaultWidget';
  import bzHeadLandingPage from './widgets/bzHeadLandingPage';
  import bzHeadSlider from './widgets/bzHeadSlider';
  import bzLeftSlider from './widgets/bzLeftSlider';
  import bzTopNavigation from './widgets/bzTopNavigation';
  import bzLeftDefault from './widgets/bzLeftDefault'

  const WIDGETS = {
    'top-default': bzTopDefaultWidget,
    'head-default': bzHeadDefaultWidget,
    'bottom-default': bzBottomDefaultWidget,
	  'top-navigation': bzTopNavigation,
	  'menu': bzMenuWidget,
	  'cubic': bzCubicWidget,
	  'form': bzFormWidget,
	  'side': bzSideWidget,
	  'head-landing-page': bzHeadLandingPage,
	  'head-slider': bzHeadSlider,
	  'left-slider': bzLeftSlider,
    'left-default': bzLeftDefault
  };

  export default
  @Component({
    functional: true,
    components: {
      bzTopDefaultWidget,
      bzHeadDefaultWidget
    }
  })
  class bzWidget extends Vue {
    render (createElement, context) {
      const widget = { ...context.props.widget };
      const widgetComponent = WIDGETS[widget.title];
      if (!widgetComponent) {
        return console.error(`Widget ${widget.title} not found`);
      }
      const data = { ...context.data };
      data.attrs = { ...data.attrs, ...widget.parameters };
// console.info('Widget attributes', widget.title, data.attrs);

      const widgetEl = createElement(
        widgetComponent,
        data,
        context.children
      );
      return createElement(
        'div',
        {
          attrs: {
            id: `${widget.blockId}`,
            class: `widget widget-${widget.title}`
          }
        },
        [widgetEl]
      )
    }
  }
</script>
