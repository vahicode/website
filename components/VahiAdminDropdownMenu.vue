<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator" class="ml-0">
      <v-btn flat class="fs-ucase fs-m0">
        {{ $t('administration') }}
        <v-icon style="text-transform: initial!important">arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
  <v-list dense>
      <v-list-tile :to="$vahi.path('/admin/users')">
        <v-list-tile-action><v-icon>account_circle</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('users') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/pictures')">
        <v-list-tile-action><v-icon>photo_camera</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('pictures') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/eyes')">
        <v-list-tile-action><v-icon>remove_red_eye</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('eyes') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$vahi.path('/admin/add/users')">
        <v-list-tile-action><v-icon>add_circle</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addUsers') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/add/eyes')">
        <v-list-tile-action><v-icon>remove_red_eye</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addEyes') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/add/pictures')">
        <v-list-tile-action><v-icon>add_a_photo</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addPictures') }}</v-list-tile-content>
      </v-list-tile>
      <div v-if="$store.state.admin.isSuperAdmin">
      <v-divider></v-divider>
      <v-list-tile :to="$vahi.path('/admin/add/admins')">
        <v-list-tile-action><v-icon>add_box</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addAdmins') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/admins')">
        <v-list-tile-action><v-icon>account_box</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('admins') }}</v-list-tile-content>
      </v-list-tile>
      </div>
      <v-divider></v-divider>
      <v-list-tile :to="$vahi.path('/admin/export')" exact>
        <v-list-tile-action><v-icon>cloud_download</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('exportData') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$vahi.path('/admin')" exact>
        <v-list-tile-action><v-icon>power_settings_new</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('logout') }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

