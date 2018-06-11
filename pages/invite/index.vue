<template>
  <section class="container text-xs-center">
    <div>
      <h1>VaHI</h1>
      <h2>{{ $t('enterInviteCode') }}</h2>
      <v-form v-model="valid" @submit="submit" class="vahi-m600">
        <v-text-field 
          class="login" 
          :label="$t('inviteCode')"
          v-model="inviteCode"
          required
          autofocus
          ></v-text-field>
          <v-btn color="primary" large @click="submit"><v-icon class="mr-3">vpn_key</v-icon>{{ $t('login') }}</v-btn>
      </v-form>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      inviteCode: '',
      valid: false
    }
  },
  methods: {
    submit: function() {
      this.loading = true;
      this.$vahi.login(this.inviteCode)
      .then((result) => {
        this.loading = false
        //this.$router.push(this.$fs.path('/account'))
      })
      .catch((result) => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>
