<template>
  <vahi-wrapper-admin-required :callback="loadUsers">
    <h1 class="text-xs-center">{{ $t('users') }}</h1>
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
      this.$vahi.adminLoadUsers()
      .then((res) => {
        for (let user in res.users) this.users.push(res.users[user])
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
