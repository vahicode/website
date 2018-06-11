<template>
  <v-app>
    <vahi-top-toolbar color="transparent" dark />
    <v-content>
      <nuxt />
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
