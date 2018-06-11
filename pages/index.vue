<template>
  <div>
    <div id="banner" class="elevation-6">
      <v-container>
        <v-layout>
          <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12>
            <h1 class="display-4">VaHI</h1>
            <h2 class="display-3">{{ $t('tagline') }}</h2>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-container>
      <v-layout row wrap>
        <v-flex sm12 xl6 offset-xl1 lg7 md7>
          <h2>VaHI: something something</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
        </v-flex>
        <v-flex sm12 xl3 offset-xl1 lg4 offset-lg1 md4 offset-sm0 offset-md1>
          <h4 class="mt-5">{{ $t('inviteOnlyTitle') }}</h4>
          <p>{{ $t('inviteOnlyLine1') }}</p>
          <p>{{ $t('inviteOnlyLine2') }} <nuxt-link to="/invite">{{ $t('loginHere') }}</nuxt-link></p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VahiLogo from '~/components/VahiLogo'
export default {
  layout: 'homepage',
  components: {
    VahiLogo
  }
}
</script>

<style scoped>
div#banner {
  background-image: url('/img/banner.jpg');
  background-size: cover;
  background-position: right;
  color: #FFF;
  text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  padding: 94px 0;
  margin-top: -64px;
}
div#hero {
  color: #FFF;
}
</style>
