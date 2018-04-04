<template>
  <section class="container text-xs-center">
    <div>
      <h1>{{ $t('mainMenu.login') }}</h1>
      <h2>{{ $t('login.loginBelow') }}</h2>
<v-form v-model="valid">
    <v-text-field class="login" solo
      :label="$t('login.field')"
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
  }
}
</script>

<style scoped>
  form {
    max-width: 300px;
    margin: auto;
  }
</style>
