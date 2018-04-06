<template>
  <v-list>
    <template
      v-for="(item, i) in items"
    >
    <v-list-tile :key="i" :to="item.to" router exact v-if="!item.sudo || $auth.user.isSuperadmin">
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
    name: 'FsAdminManageMenu',
    data () {
      return {
        items: [
          { color: 'primary', icon: 'account_box', title: 'manageAdmins', to: '/admin/manage/admins', sudo: true},
          { color: 'primary', icon: 'account_circle', title: 'manageUsers', to: '/admin/manage/users' },
          { color: 'primary', icon: 'camera_roll', title: 'manageImages', to: '/admin/manage/images' },
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
