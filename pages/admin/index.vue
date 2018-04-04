<template>
  <section class="container text-xs-center">
    <div>
      <h1>{{ $t('mainMenu.admin') }}</h1>
      <h2>{{ $t('admin.loginBelow') }}</h2>
<v-form v-model="valid">
    <v-text-field
      :label="$t('admin.username')"
      v-model="username"
      required
    ></v-text-field>
    <v-text-field
      :label="$t('admin.password')"
      v-model="password"
      type="password"
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
      username: '',
      password: '',
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
