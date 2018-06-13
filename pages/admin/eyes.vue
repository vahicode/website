<template>
  <vahi-wrapper-admin-required :callback="loadEyes">
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('eyes') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('eyes') }}</h1>
    <vahi-table-eyes :eyes="eyes" />
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiTableEyes from '~/components/VahiTableEyes'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiTableEyes,
    VahiBreadcrumbs
  },
  data: function() {
    return {
      eyes: [],
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
    }
  },
  methods: {
    loadEyes: function() {
      this.$vahi.adminLoadEyes()
      .then((res) => {
        for (let eye in res.eyes) this.eyes.push(res.eyes[eye])
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  beforeCreate: function () {
    this.$vahi.auth()
  }
}
</script>
