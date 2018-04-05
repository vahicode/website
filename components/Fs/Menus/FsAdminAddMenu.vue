<template>
  <v-list>
    <v-list-tile
      router
      :to="item.to"
      :key="i"
      v-for="(item, i) in items"
      exact
    >
      <v-list-tile-action>
        <v-icon :color="item.color" v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t('adminMenu.'+item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'FsAdminAddMenu',
    data () {
      return {
        items: [
          { color: 'primary', icon: 'add_box', title: 'addAdmins', to: '/admin/add/admins' },
          { color: 'primary', icon: 'add_circle', title: 'addUsers', to: '/admin/add/users' },
          { color: 'primary', icon: 'add_a_photo', title: 'addImages', to: '/admin/add/images' },
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
