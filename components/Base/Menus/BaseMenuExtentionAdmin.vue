<template>
  <v-list> 
    <v-list-tile to="/admin">
      <v-list-tile-action>
        <v-icon color="accent">verified_user</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('mainMenu.admin') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  import BaseLogo from '~/components/Base/Branding/BaseLogo'
  export default {
    name: 'BaseMenuExtentionAdmin',
    components: {
      BaseLogo
    },  
    methods: {
      gotoChat: function() {
        window.location = 'https://gitter.im/freesewing/freesewing'
      } 
    }
  
  }
</script>
