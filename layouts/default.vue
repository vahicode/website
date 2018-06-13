<template>
  <v-app>
    <vahi-top-toolbar color="white" light />
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12>
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <vahi-footer />
  </v-app>
</template>

<script>
import VahiTopToolbar from '~/components/VahiTopToolbar' 
import VahiFooter from '~/components/VahiFooter' 
export default {
  components: { 
    VahiTopToolbar,
    VahiFooter
  }
}
</script>
