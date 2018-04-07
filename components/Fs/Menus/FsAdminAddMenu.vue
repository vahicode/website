<template>
  <v-list v-if="$auth.user.isAdmin">
    <template
      v-for="(item, i) in items"
    >
    <v-list-tile :key="i" router :to="item.to" v-if="!item.sudo || $auth.user.isSuperadmin" exact>
      <v-list-tile-action>
        <v-icon :color="item.color" v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t(item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'FsAdminAddMenu',
    data () {
      return {
        items: [
          { color: 'primary', icon: 'add_box', title: 'addAdmins', to: '/admin/add/admins', sudo: true },
          { color: 'primary', icon: 'add_circle', title: 'addUsers', to: '/admin/add/users' },
          { color: 'primary', icon: 'remove_red_eye', title: 'addEyes', to: '/admin/add/eyes' },
          { color: 'primary', icon: 'add_a_photo', title: 'uploadImages', to: '/admin/uploader' },
        ],
      }
    },
  }
</script>

<style scope>
a.list__tile--active {
  background: #6e90a633 !important;
  font-weight: bold;
}
</style>
