<template>
  <v-container class="py-0">
    <v-layout row>
      <v-flex xl10 offset-xl1 lg12 md12 sm12 xs12>
        <v-toolbar color="transparent" flat class="vahi-hr vahi-ht--bottom" :dark="dark" :style="(dark) ? 'text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);' : ''">
          <v-btn :to="$vahi.path('/')" flat class="vahi-ucase vahi-m0" active-class="default-class vahi-active-btn">
            <vahi-logo :size="(32)" :grida="(0)" :bg="(dark) ? '#FFFFFF' : '#000000'" class="mr-2" />
              <big>VaHI</big>
          </v-btn>
          <v-btn :to="$vahi.path('/invite')" flat class="vahi-ucase vahi-m0" active-class="default-class vahi-active-btn">
            <template v-if="$store.state.user.loggedIn">
              <v-icon color="error" class="mr-2 vahi-locase">power_settings_new</v-icon>
              {{ $t('logout') }}
            </template>
            <template v-else>
              <v-icon color="success" class="mr-2 vahi-locase">vpn_key</v-icon>
              {{ $t('login') }}
            </template>
          </v-btn>
          <v-spacer></v-spacer>
          <vahi-admin-dropdown-menu v-if="$store.state.admin.loggedIn"/>
          <vahi-language-dropdown-menu />
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VahiLogo from '~/components/VahiLogo'
import VahiLanguageDropdownMenu from '~/components/VahiLanguageDropdownMenu'
import VahiAdminDropdownMenu from '~/components/VahiAdminDropdownMenu'

export default {
  name: 'VahiTopToolbar',
  components: {
    VahiLanguageDropdownMenu,
    VahiAdminDropdownMenu,
    VahiLogo
  },
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // Name of the current language to show in the toolbar
    localeName () {
      const self = this
      for (let locale of this.$i18n.locales) {
        if(locale.code === self.$i18n.locale) {
          return locale.name
        }
      }
      return ''
    }
  },
  methods: {
    toggleDrawer: function(side) {
      this.$store.commit('toggleDrawer', side)
    }
  }
}
</script>
