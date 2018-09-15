<template>
  <vahi-wrapper-admin-required :callback="loadUsers">
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('exportData') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('exportData') }}</h1>
    <div class="text-xs-center">
      <v-btn large color="primary" @click="exportData()" v-if="!ready">
        <v-progress-circular indeterminate color="#fff" class="mr-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        <v-icon class="mr-4" color="#fff" v-else>cloud_download</v-icon>
        {{ $t('exportData') }}</v-btn>
      <v-btn large color="primary" :href="link" v-else>
        <v-icon class="mr-4" color="#fff">get_app</v-icon>
        {{ $t('download') }}</v-btn>
    </div>
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiBreadcrumbs
  },
  data: function() {
    return {
      loading: false,
      ready: false,
      link: '',
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
    }
  },
  methods: {
    exportData: function() {
      this.loading = true;
      this.$vahi.adminExportData()
      .then((res) => {
        this.link = process.env.VAHI_API || 'https://api.vahi.eu';
        this.link += res.export;
        this.ready = true;
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
