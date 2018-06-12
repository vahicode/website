<template>
  <vahi-wrapper-admin-required :callback="loadEyes">
    <h1 class="text-xs-center">{{ $t('eyes') }}</h1>
    <vahi-table-eyes :eyes="eyes" />
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiTableEyes from '~/components/VahiTableEyes'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiTableEyes
  },
  data: function() {
    return {
      eyes: []
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
