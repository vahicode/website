<template>
  <vahi-wrapper-login-required :callback="nextRating">
    <vahi-breadcrumbs>{{ $t('rateEyes') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('pleaseRateThisImage') }}</h1>
    <!-- width of this div is know even when pictures hasn't been loaded yet, so let's use that -->
    <div ref="box">
    <div v-for="(picture, index) in eye" :key="'picture-'+index" class="grid-wrapper mt-5">
      <img class="elevation-3" :src="$vahi.eyeSrc(picture.hash)" id="picture"/>
      <vahi-grid 
        v-if="eyeLoaded"
        :width="$refs.box.clientWidth*picture.scale" 
        :x="$refs.box.clientWidth*picture.x" 
        :y="$refs.box.clientWidth*(picture.height/picture.width)*picture.y" 
        :rating="rating" 
        :zones="zones(picture)" 
        v-on:toggle="updateZone"/>
    </div>
    </div>
    </vahi-wrapper-login-required>
</template>

<script>
import VahiWrapperLoginRequired from '~/components/VahiWrapperLoginRequired'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
import VahiGrid from '~/components/VahiGrid'
export default {
  components: {
    VahiWrapperLoginRequired,
    VahiBreadcrumbs,
    VahiGrid
  },
  data: function() {
    let baseRating = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 }
    return {
      eye: false,
      eyeLoaded: false,
      rating: baseRating,
      baseRating: baseRating,
    }
  },
  methods: {
    zones: function(pic) {
      let zones = {}
      for(let i=1; i<14; i++) {
        zones[i] = (pic['zone'+i] === '1') ? 1 : 0
      }
      return zones
    },
    updateZone: function(zone) {
      if(this.rating[zone] === 3) this.rating[zone] = 0
      else this.rating[zone]++
    },
    nextRating: function() {
      this.$vahi.loadRating()
      .then((res) => {
        if(res.result === 'ok') {
          this.eye = res.eye
          this.eyeLoaded = true
        } else {
          this.error = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
}
</script>

<style>
  div.grid-wrapper {
    position: relative;
    max-width: 1200px;
    margin: auto
  }
</style>
