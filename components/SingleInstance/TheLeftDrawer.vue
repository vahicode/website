<template>
  <v-navigation-drawer
    v-model="showLeftDrawer"
    class="pt-5"
    app
    fixed
    temporary
  >
    <div class="align-drawer-bottom">
      <div v-if="$auth.loggedIn">
      <p class="px-2">{{ $t('adminMenu.title') }}</p>
        <fs-admin-add-menu />
        <fs-admin-manage-menu />
      </div>
      <p class="px-2 mt-3">{{ $t('app.title') }}</p>
      <base-menu-extention-login />
      <fs-main-menu />
      <div class="fs-toolbar-spacer"></div>
    </div>
  </v-navigation-drawer>
</template>

<script>
  import FsMainMenu from '~/components/Fs/Menus/FsMainMenu'
  import BaseMenuExtentionLogin from '~/components/Base/Menus/BaseMenuExtentionLogin'
  import FsAdminAddMenu from '~/components/Fs/Menus/FsAdminAddMenu'
  import FsAdminManageMenu from '~/components/Fs/Menus/FsAdminManageMenu'
  export default {
    components: {
      FsMainMenu,
      BaseMenuExtentionLogin,
      FsAdminAddMenu,
      FsAdminManageMenu
    },
    name: 'TheLeftDrawer',
    computed: { 
      showLeftDrawer: {
        get: function () {
          return this.$store.state.drawer.left
        },
        set: function (value) {
          if(value) this.$store.commit('showLeftDrawer')
          else this.$store.commit('hideLeftDrawer')
        }
      },
    },
  }
</script>
