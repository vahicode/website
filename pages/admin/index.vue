<template>
  <section class="container text-xs-center">
    <h1>{{ $t('Administration') }}</h1>
    <div v-if="!$store.state.admin.loggedIn" class="vahi-m600">
      <h4>{{ $t('enterUsernamePassword') }}</h4>
      <v-form v-model="valid" @submit="login">
        <v-text-field
          :label="$t('username')"
          v-model="username"
          required
          autofocus
        ></v-text-field>
        <v-text-field
          :label="$t('password')"
          v-model="password"
          type="password"
          required
          @keyup.enter="login"
        ></v-text-field>
        <v-btn @click="login" color="primary" large>
          {{ $t('login') }}
          <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        </v-btn>
      </v-form>
    </div>
    <div v-else>
        <h2>{{ $t('youAreCurrentlyLoggedIn') }}</h2>
        <p>{{ $t('clickBelowToLogout') }}</p>
        <v-btn color="primary" large @click="logout" :disabled="(loading) ? true : false">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>power_settings_new</v-icon>
          {{ $t('logout') }}
        </v-btn>
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
    login: function() {
      this.loading = true;
      this.error = false;
      this.$vahi.adminLogin({
        username: this.username,
        password: this.password
      })
      .then((result) => {
        this.loading = false
        //this.$router.push(this.$vahi.path('/account'))
      })
      .catch((result) => {
        this.loading = false
        this.error = true
        this.reason = result.reason || 'unknown'
      })
    },
    logout: function() {
      this.$vahi.adminLogout()
      //this.$router.push(this.$vahi.path('/'))
    }
  }
}
</script>
