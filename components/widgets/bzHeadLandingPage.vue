<template>
  <div class="landing-page-widget" ng-init="show = { full: false }" ng-class="{'show-full-form': show.full}">

    <!--{% set imgUrl = getImageUrl(widget.mainImage,widget.imageTypes.mainImage) %}-->

    <!--{% if widget.mainImage %}
    <div class="bg" style="background: url('{{ imgUrl|raw }}') no-repeat top center; background-size: cover;"></div>
    {% endif %}-->

    <div class="container">
      <div class="row">
        <div class="col-md-5 col-sm-12 col-xs-12 left-column">
          <div class="image-block">
            <h3 v-if="title" class="head-widget-title">{{title}}</h3>
            <!--{% if widget.images|length %}
            {% set imgUrl = getImageUrl(widget.images[0], widget.imageTypes.image) %}
            <img class="img-responsive" src="{{ imgUrl|raw }}" />
            {% endif %}-->
            <div class="widget-text">
              <div v-if="text">{{text}}</div>
              <!--{% if widget.parameters.contactFormId is defined and widget.parameters.contactFormId and widget.button_caption %}
              <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal">{{ widget.button_caption }}</button>
              {% endif %}-->
            </div>
          </div>
        </div>
        <div id="myModal" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <div class="widget-form">
                <!--{{ page.getFormScript(widget.parameters.contactFormId)|raw }}-->
              </div>
            </div>

          </div>
        </div>
        <!--{% if widget.parameters.contactFormId is defined and widget.parameters.contactFormId %}-->
        <div class="col-md-4 col-md-offset-2 hidden-sm hidden-xs right-column">
          <div class="caption-position">
            <div class="block-with-form">
              <div class="view-form" data-ng-class="{'view-form-full': show.full}">
                <div class="form-widget">
                  <div><!--{{ page.getFormScript(widget.parameters.contactFormId)|raw }}--></div>
                </div>
                <div class="show-full-form">
                  <a href="" class="btn btn-primary btn-block" data-ng-click="show.full = !show.full">
                    <i class="glyphicon arrow" data-ng-class="{'glyphicon-chevron-down': !show.full, 'glyphicon-chevron-up': show.full}"></i>
                    <span class="show-button" data-ng-if="!show.full"><!--{{widget.parameters.showMoreButton|default('Show more field')}}--></span>
                    <span class="hide-button" data-ng-if="show.full"><!--{{widget.parameters.hideMoreButton|default('Show less fields')}}--></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
	import { Vue, Prop, Mixins } from 'vue-property-decorator';
	import Component from 'nuxt-class-component';
  import BlockMixin from '~/mixins/block';

	export default
	@Component({
    name: "bzHeadLandingPage",
		components: {
		}
	})

	class bzHeadLandingPage extends Mixins(BlockMixin) {
		@Prop(String) title;
		@Prop(String) text;
		@Prop(String) buttonCaption;
	}
</script>

<style scoped>

</style>
