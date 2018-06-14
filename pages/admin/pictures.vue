<template>
  <vahi-wrapper-admin-required :callback="loadPictures">
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('pictures') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('pictures') }}</h1>
    <vahi-table-pictures :pictures="pictures" />
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiTablePictures from '~/components/VahiTablePictures'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiTablePictures,
    VahiBreadcrumbs
  },
  data: function() {
    return {
      pictures: [],
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
    }
  },
  methods: {
    loadPictures: function() {
      this.$vahi.adminLoadPictures()
      .then((res) => {
        for (let pic in res.pictures) this.pictures.push(res.pictures[pic])
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
