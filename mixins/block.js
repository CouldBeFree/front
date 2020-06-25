import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class BlockMixin extends Vue {
  // widget
  @Prop() widget;
  @Prop() widgetId;

  // section
  @Prop() section;
  @Prop() sectionId;

  @Prop(String) html;
  @Prop(String) description;

  // both
  @Prop() page;
  @Prop(String) name;
  @Prop(String) text;
  @Prop(String) buttonCaption;
  @Prop(String) link;
  @Prop(String) title;
  @Prop({ type: Array, default: () => ([]) }) files;

  get mainImage() {
    return this.files.find(file => file.attachment_type === 'main');
  }

  get images() {
    return this.files.filter(file => file.attachment_type === '');
  }

  async getFormCode(id) {
    return await this.$axios.$get(`https://forms.biznestream.biz/api/v1/forms/${id}/code`);
  }
}
