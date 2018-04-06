<template>
  <v-card class="mb-4">
   <v-card-title primary-title>
     <div>
       <div class="display-1">{{ $t('Administration') }}</div>
     </div>
   </v-card-title>
   <v-divider></v-divider>
   <fs-admin-add-menu />
   <v-divider></v-divider>
   <fs-admin-manage-menu />
 </v-card>
</template>

<script>
  import FsAdminAddMenu from '~/components/Fs/Menus/FsAdminAddMenu'
  import FsAdminManageMenu from '~/components/Fs/Menus/FsAdminManageMenu'
  export default {
    components: {
      FsAdminAddMenu,
      FsAdminManageMenu,
    },
    name: 'BaseAdminMenuCard'
  }
</script>
