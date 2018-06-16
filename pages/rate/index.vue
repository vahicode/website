<template>
  <vahi-wrapper-login-required :callback="nextRating">
    <vahi-breadcrumbs>{{ $t('rateEyes') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('pleaseRateThisImage') }}</h1>
    <vahi-grid :width="(500)" :rating="rating" v-on:toggle="updateZone"/><pre>{{ eye }}</pre>
    <v-btn color="error">asfdsdfSD</v-btn>
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
    return {
      eye: false,
      rating: { 1: 0, 2: 1, 3: 2, 4: 3, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 },
    }
  },
  methods: {
    updateZone: function(zone) {
      if(this.rating[zone] === 3) this.rating[zone] = 0
      else this.rating[zone]++
    },
    nextRating: function() {
      this.$vahi.loadRating()
      .then((res) => {
        if(res.result === 'ok') {
          this.eye = res.eye
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
