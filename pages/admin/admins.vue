<template>
  <vahi-wrapper-admin-required :callback="loadAdmins" su>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('admins') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('admins') }}</h1>
    <vahi-table-admins :admins="admins" />
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiTableAdmins from '~/components/VahiTableAdmins'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiTableAdmins,
    VahiBreadcrumbs
  },
  data: function() {
    return {
      admins: [],
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
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
