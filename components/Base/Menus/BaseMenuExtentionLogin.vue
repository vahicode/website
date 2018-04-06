<template>
  <v-list>
    <v-list-tile @click="doLogout" v-if="$auth.loggedIn">
      <v-list-tile-action>
        <v-icon color="error">vpn_key</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('logout') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile :to="localePrefix+'/login'" v-else>
      <v-list-tile-action>
        <v-icon color="success">vpn_key</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('login') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'FsTableOfContents',
  computed: { 
    localePrefix () {
      if(this.$i18n.locale === this.$i18n.defaultLocale) {
        return ''
      } else {   
        return '/'+this.$i18n.locale
      }
    }
  },
  methods: {
    doLogout: function() {
      this.$auth.logout()
      this.$auth.reset()
      console.log('logged out')
    }
  }
}
</script>
