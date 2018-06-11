<template>
  <section class="container text-xs-center">
    <h1>{{ $t('Administration') }}</h1>
    <div v-if="!$store.state.admin.loggedIn">
      <h4>{{ $t('enterUsernamePassword') }}</h4>
      <v-form v-model="valid">
        <v-text-field
          :label="$t('username')"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('password')"
          v-model="password"
          type="password"
          required
        ></v-text-field>
        <v-btn @click="submit" color="primary" large>
          {{ $t('login') }}
          <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        </v-btn>
      </v-form>
    </div>
    <div v-else>
      logged in as admin
    </div>
    <v-snackbar
      :timeout="(4000)"
      top
      right
      v-model="error"
      >{{ $t('loginFailed') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
  </section>
</template>

<script>

export default {
  auth: false,
  layout: 'admin',
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
      this.loading = true;
      this.$vahi.adminLogin({
        username: this.username,
        password: this.password
      })
      .then((result) => {
        this.loading = false
      })
      .catch((error) => {
        console.log('error failed')
        this.loading = false
        this.error = true
      })
    },
    logout: function() {
      //this.$auth.logout()
      //this.$auth.reset()
    }
  }
}
</script>

<style scoped>
  form {
    max-width: 300px;
    margin: auto;
  }
</style>
