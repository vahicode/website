<template>
  <vahi-wrapper-login-required :callback="nextRating">
    <vahi-breadcrumbs>{{ $t('rateEyes') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('pleaseRateThisImage') }}</h1>
    <vahi-rate-eye :eye="eye" /><pre>{{ eye }}</pre>
    </vahi-wrapper-login-required>
</template>

<script>
import VahiWrapperLoginRequired from '~/components/VahiWrapperLoginRequired'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
import VahiRateEye from '~/components/VahiRateEye'
export default {
  components: {
    VahiWrapperLoginRequired,
    VahiBreadcrumbs,
    VahiRateEye
  },
  data: function() {
    return {
      eye: false
    }
  },
  methods: {
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
