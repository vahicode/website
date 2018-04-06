<template>
  <v-list>
    <v-list-tile
      router
      :to="localePrefix+item.to"
      :key="i"
      v-for="(item, i) in items"
      exact
    >
      <v-list-tile-action>
        <v-icon color="primary" v-html="item.icon"></v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title v-text="$t(item.title)"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'FsMainMenu',
    computed: { 
      localePrefix () {
        if(this.$i18n.locale === this.$i18n.defaultLocale) {
          return ''
        } else {   
          return '/'+this.$i18n.locale
        }
      }
    },
    data () {
      return {
        items: [
          { icon: 'home', title: 'home', to: '/' },
          { icon: 'info_outline', title: 'about', to: '/about' },
        ],
      }
    },
  }
</script>

<style scope>
a.list__tile--active {
  background: #6e90a633 !important;
  font-weight: bold;
}
</style>
