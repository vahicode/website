<template>
  <v-card>
   <v-card-title primary-title>
     <div>
       <div class="display-1">{{ $t('app.title') }}</div>
       <div class="subheading">{{ $t('app.tagline') }}</div>
     </div>
   </v-card-title>
   <v-divider></v-divider>
   <base-menu-extention-login />
   <v-divider></v-divider>
   <fs-main-menu />

 </v-card>
</template>

<script>
  import FsMainMenu from '~/components/Fs/Menus/FsMainMenu'
  import BaseMenuExtentionLogin from '~/components/Base/Menus/BaseMenuExtentionLogin'
  export default {
    components: {
      FsMainMenu,
      BaseMenuExtentionLogin
    },
    name: 'BaseMainMenuCard'
  }
</script>
