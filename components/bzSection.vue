<script>
  import { Vue, Component } from 'vue-property-decorator';
  import bzDefaultSection from './sections/bzDefaultSection';
  import bzFormSection from './sections/bzFormSection';
  import bzProductSection from './sections/bzProductSection';
  import bzMapSection from './sections/bzMapSection';
  import bzSliderSection from './sections/bzSliderSection';
  import bzBoxNaviSection from './sections/bzBoxNaviSection';
  import bzGallerySection from './sections/bzGallerySection';

  const SECTIONS = {
    'default': bzDefaultSection,
    'wide-image': bzDefaultSection,
    'form': bzFormSection,
    'product': bzProductSection,
    'simple-product': bzProductSection,
    'map': bzMapSection,
    'slider': bzSliderSection,
    '3box-navi': bzBoxNaviSection,
    'gallery': bzGallerySection
  };

  export default
  @Component({
    functional: true,
    components: {
      bzDefaultSection,
      bzProductSection
    }
  })
  class bzSection extends Vue {
    render (createElement, context) {
      const section = { ...context.props.section };
      const sectionComponent = SECTIONS[section.title];
      // console.info('Section attributes', section);
      if (!sectionComponent) {
        return console.error(`Section ${section.title} not found`);
      }
      const data = { ...context.data };
      data.attrs = { ...data.attrs, ...section.parameters };

      const sectionEl = createElement(
        sectionComponent,
        data,
        context.children
      );
      return createElement(
        'section',
        {
          attrs: {
            id: `${section.blockId}`,
            class: `section-${section.title}`
          }
        },
        [sectionEl]
      )
    }
  }
</script>
