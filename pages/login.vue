<template>
  <section class="container text-xs-center">
    <div>
      <h1>{{ $t('login') }}</h1>
      <h2>{{ $t('enterInviteCode') }}</h2>
      <v-form v-model="valid" @submit="submit">
        <v-text-field class="login" solo
                      :label="$t('inviteCode')"
                      v-model="inviteCode"
                      required
                      ></v-text-field>
      </v-form>
    </div>
  </section>
</template>

<script>

export default {
  components: {
  },
  auth: false,
  data () {
    return {
      inviteCode: '',
      valid: false
    }
  },
  methods: {
    submit: function() {
      this.loading = true;
      this.$http.post('login', this.login).then(
        response => {
          response.json().then( json => { 
            this.admin = json; 
            window.localStorage.setItem("freesewing", JSON.stringify(this.admin));
            this.login.avatar = this.config.api+this.admin.avatar;
            this.status = 'authenticated';
            this.loading = false;
            this.$emit('logged-in', this.admin);
          });
        },
        () => {
          if(this.status == 'new' || this.status == 'error-new') this.status = 'error-new';
          else if(this.status == 'known' || this.status == 'error-known') this.status = 'error-known';
          else this.status = 'error';
          this.loading = false;
        }
      );
    },
    reset: function() {
      window.localStorage.removeItem('freesewing');
      this.login = { id: '', email: '', password: '', avatar: this.config.logo};
      this.status = 'new';
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
