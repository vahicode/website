<template>
  <vahi-wrapper-admin-required :callback="loadAdmins" super>
    <h1 class="text-xs-center">{{ $t('admins') }}</h1>
    <vahi-table-admins :admins="admins" />
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiTableAdmins from '~/components/VahiTableAdmins'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiTableAdmins
  },
  data: function() {
    return {
      admins: []
    }
  },
  methods: {
    loadAdmins: function() {
      this.$vahi.adminLoadAdmins()
      .then((res) => {
        for (let admin in res.admins) this.admins.push(res.admins[admin])
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
