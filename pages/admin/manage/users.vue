<template>
  <vahi-wrapper-admin-required :callback="loadUsers">
    <h1>{{ $t('manageUsers') }}</h1>
    <vahi-table-users :users="users" />
    </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiTableUsers from '~/components/VahiTableUsers'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiTableUsers
  },
  data: function() {
    return {
      users: []
    }
  },
  methods: {
    loadUsers: function() {
      console.log('running callback in page')
    return this.$vahi.adminLoadUsers()
    .then((res) => {
      for (let user in res.users) this.users.push(res.users[user])
    })
    .catch((error) => {
      console.log(error)
    })

    }
  },
  asyncDat: async function ({ app }) {
    const users = []
    return app.$vahi.adminLoadUsers()
    .then((res) => {
      for (let user in res.users) users.push(res.users[user])
      return {users}
    })
    .catch((error) => {
      console.log(error)
    })
  },
  beforeCreate: function () {
    this.$vahi.auth()
  }
}
</script>

<style scoped>
p a {
  color: #cd003a;
  text-decoration: none;
}
icon.admin {
  color: '#fff';  
}
</style>
