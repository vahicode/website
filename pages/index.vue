<template>
  <div>
    <h1>{{ $t('app.title') }}</h1>
    <h2>{{ $t('app.tagline') }}</h2>
    <p>FIXME: Write home page.</p>
    <p><nuxt-link to="/admin/show/admin">Show admin page</nuxt-link></p>
    <p><nuxt-link to="/admin/manage/admin/15">Manage admin 15</nuxt-link></p>
    <p><nuxt-link to="/b">/b</nuxt-link></p>
    <router-link to="/admin/foo/bar/baz/12">/admin</router-link>
    <router-link to="/foo/23/342">/admin</router-link><br>
    <router-link to="/admin/show/admin/1">/admin/show/admin/1</router-link>
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
        path: '/foo/:n/:b', 
        component: 'components/Foo.vue', 
        props: route => ({
    	  n: Number(route.params.n),
    	  n: Number(route.params.b)
        })
      })
    this.$router.routes.push({
        path: '/admin/:path*/:int', 
        component: 'components/Foo.vue', 
        props: route => ({
          n: route.params.path,
          b: (Number(route.params.int) )? route.params.int : route.params.int+" is not a valid interger parameter"
        })
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
