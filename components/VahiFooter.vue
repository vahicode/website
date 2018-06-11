<template>
  <footer>
    <v-footer height="auto" class="primary">
      <v-layout row wrap justify-center class="mt-3 mb-5">
        <v-flex xs12 py-3 text-xs-center class="mb-4">
          <nuxt-link :to="$vahi.path('/')"><vahi-logo :size="(60)" :grida="0" bg="#FFFFFF" /></nuxt-link>
            <p class="mt-5 mb-5">
              <nuxt-link :to="$vahi.path('/contact')" class="vahi-white">{{ $t('contactUs') }}</nuxt-link>
              |
              <nuxt-link :to="$vahi.path('/help')" class="vahi-white">{{ $t('source') }}</nuxt-link> 
            </p>
            <p v-html="$t('txt-footer')"></p>
        </v-flex>
      </v-layout>
    </v-footer>
  </footer>
</template>

<script>
import VahiLogo from '~/components/VahiLogo'

export default {
  name: 'VahiFooter',
  components: { VahiLogo }
}
</script>

<style scoped>
footer {
  margin-top: 65px;
  padding: 2rem 0 0 0;
  color: #fff;
}
ul, p{
  font-size: 16px;
  line-height: 1.4;
  color: #fff6;
  padding: 0 8px;
}
a {
  color: #fff9;
  text-decoration: none;
}
a:hover {
  color: #fffc;
  text-decoration: none;
}
ul li {
  list-style-type: none;
}

ul.right {
  text-align: right;

}

</style>
