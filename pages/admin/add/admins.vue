<template>
  <section class="container">
    <h1>{{ $t('adminMenu.addAdmins') }}</h1>
    <div v-if="$auth.user.isSuperadmin">
     <h4>{{ $t('admin.loginBelow') }}</h4>
      <v-form v-model="valid">
        <v-text-field
          :label="$t('admin.add.admins.username')"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('admin.add.admins.password')"
          v-model="password"
          required
        ></v-text-field>
        <v-btn @click="submit" color="primary" large>
          {{ $t('admin.add.admins.submit') }}
          <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        </v-btn>
        <v-btn @click="randomPassword" large>
          {{ $t('admin.add.admins.randomPassword') }}
        </v-btn>
      </v-form>
    </div>
    <div v-else>
    <blockquote class="error mt-5 dark">
      <h3 class="white-text">{{ $t('admin.accessDenied') }}</h3>
      <p class="white-text">{{ $t('admin.superadminOnly') }}</p>
    </blockquote>
    </div>
    <v-snackbar
      :timeout="(4000)"
      top
      right
      v-model="error"
      >{{ $t('admin.add.admins.failed') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
  </section>
</template>

<script>

export default {
  data () {
    return {
      username: '',
      password: '',
      valid: false,
      loading: false,
      error: false
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      const ip = this.$axios.$post('/admin/add/admin', {
        username: this.username,
        password: this.password
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/manage/admin/'+response.id
          })
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
        self.loading = false;
        self.error = true
      });
    },
    randomPassword: function() {
      let text = ""
      var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789"
      for (var i = 0; i < 12; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      this.password = text
    }
  }
}
</script>

<style scoped>
  form {
  }
  .white-text {
    color: #fff;
  }
</style>
