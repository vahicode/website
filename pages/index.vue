<template>
  <div>
    <h1>{{ $t('app.title') }}</h1>
    <h2>{{ $t('app.tagline') }}</h2>
    <p>FIXME: Write home page.</p>
    <blockquote class="warning mt-5">
      <h3>{{ $t('inviteOnly.title') }}</h3>
      <p>{{ $t('inviteOnly.line1') }}</p>
      <p>{{ $t('inviteOnly.line2') }} <nuxt-link to="/login">{{ $t('inviteOnly.link') }}</nuxt-link></p>
    </blockquote>
  </div>
</template>

<script>

export default {
  components: {
  },
  auth: false
}
</script>

<style scoped>
  p a {
    color: #cd003a;
    text-decoration: none;
  }
</style>
