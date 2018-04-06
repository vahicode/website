<template>
  <div>
    <h1>{{ $t('app.title') }}</h1>
    <h2>{{ $t('app.tagline') }}</h2>
    <p>FIXME: Write home page.</p>
    <p><nuxt-link to="/admin/show/admin">Show admin page</nuxt-link></p>
    <p><nuxt-link to="/admin/manage/admin/15">Manage admin 15</nuxt-link></p>
    <p><nuxt-link to="/b">/b</nuxt-link></p>
    <blockquote class="warning mt-5">
      <h3>{{ $t('inviteOnly.title') }}</h3>
      <p>{{ $t('inviteOnly.line1') }}</p>
      <p>{{ $t('inviteOnly.line2') }} <nuxt-link to="/login">{{ $t('inviteOnly.link') }}</nuxt-link></p>
    </blockquote>
    <pre v-for="route in $router.options.routes" :key="route.path">
    {{ route }}
    </pre>
  </div>
</template>

<script>

export default {
  components: {
  },
  auth: false,
  rendered: function() {
    console.log(this.$router.options.routes);
    this.$router.routes.push({
        alias: '/b',
        name: 'custom1',
        path: '/a',
        component: resolve(__dirname, 'components/a.vue'),
      })
  },
}
</script>

<style scoped>
  p a {
    color: #cd003a;
    text-decoration: none;
  }
</style>
