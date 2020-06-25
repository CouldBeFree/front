<template>
  <div class="map-section section has-padding">
    <div>
      <div class="container">
        <h2 class="text-center" v-if="title">{{ title }}</h2>
      </div>
      <!--{% if section.parameters.address is defined %}-->
      <div v-if="section.parameters && section.parameters.address" :id="sectionId"></div>
      <!--{% endif %}
      {% if (section.parameters.second_title is defined and section.parameters.second_title) or section.html %}-->
      <div class="container">
        <div>
          <div class="info" scrollable>
            <!--{% if (section.parameters.second_title is defined and section.parameters.second_title) %}-->
            <h3 v-if="section.parameters && section.parameters.second_title && section.parameters.second_title" class="text-center">{{ section.parameters.second_title }}</h3>
            <!--{% endif %}-->
            <div class="text" v-append="html" v-html="html"></div>
          </div>
        </div>
      </div>
      <!--{% endif %}-->
    </div>

    <!--{% if section.parameters.address is defined %}-->
    <div v-if="section.parameters && section.parameters.address">
      <div ref="map" class="map-container map"></div>
      <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBP38Qx1501p5jt7RLtqB6irKlaHXNx0Sw'></script>
    </div>
  </div>
</template>

<script>
  import { Vue, Prop } from 'vue-property-decorator';
  import Component, { mixins } from 'vue-class-component';
  import BlockMixin from '~/mixins/block';

  export default @Component ({
    name: "bzMapSection"
  })

  class bzMapSection extends mixins(BlockMixin){
    @Prop() title;
    @Prop() sectionId;
    @Prop() section;
    @Prop() html;

    mounted(){
      let address = this.section.parameters.address;

      let settings = window.skinSettings || {};
      let mapSettings = settings.map || {};
      let target = this.$refs.map;

      console.log(this.$refs.map);

      let geocoder = new google.maps.Geocoder();
      geocoder.geocode( { "address": address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          let location = results[0].geometry.location;
          let center = { lat: location.lat(), lng: location.lng() };
          let map = new google.maps.Map(target, {
            center: center,
            options: {
              scaleControl: false,
              scrollwheel: false,
              zoomControl: true,
              panControl: false,
              streetViewControl: false,
              overviewMapControl: false,
              mapTypeControl: false,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              styles: mapSettings.styles || []
            },
            zoom: mapSettings.zoom || 8
          });
          let marker = new google.maps.Marker({
            position: center,
            map: map,
            options: { animation: google.maps.Animation.BOUNCE }
          });
        }
      })
    }
  }
</script>

<style scoped>

</style>
