<template>
  <div>
    <div id="banner" class="elevation-6">
      <v-container>
        <v-layout>
          <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12>
            <h1 class="display-4">VaHI</h1>
            <h3 class="display-2">{{ $t('tagline') }}</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-container>
      <v-layout row wrap>
        <v-flex sm12 xl6 offset-xl1 lg7 md7>
          <h2>The VaHI grading tool!</h2>
          <p>Limbal stem cell deficiency (LSCD) results from a range of pathologies such as chemical burns and aniridia. While the repertoire of treatment techniques expands and the number of limbal cell therapies grows, there is still a lack of objective outcome measures in grading this pathology. The different assessment techniques and subjective parameters challenge the grading of LSCD severity and impede objective comparison of treatment outcomes.</p>
          <p>VaHI stands for 'Vascularisation', 'Haze' and 'Integrity', 3 key clinical signs LSCD.  Grading different clinical signs related to LSCD allows a simple way of documenting the severity of the condition and in evaluating outcomes after treatment. The VaHI software provides a new, improved and easy grading system for assessing and grading LSCD eyes. Feel welcome to discover this tool and join us for some simple and straightforward grading!</p>
        </v-flex>
        <v-flex sm12 xl3 offset-xl1 lg4 offset-lg1 md4 offset-sm0 offset-md1>
          <h4 class="mt-5">{{ $t('takePartTitle') }}</h4>
          <p>{{ $t('takePartMsg') }}</p>
          <v-btn to="/invite" flat outline><v-icon class="mr-3">vpn_key</v-icon>{{ $t('loginHere') }}</v-btn>
          <h4 class="mt-5">{{ $t('tryVahiTitle') }}</h4>
          <p v-html="$t('tryVahiMsg')"></p>
          <v-btn to="/invite" flat outline><v-icon class="mr-3">vpn_key</v-icon>{{ $t('loginHere') }}</v-btn>
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
h3.display-2 {
  max-width: 650px;
}
</style>
