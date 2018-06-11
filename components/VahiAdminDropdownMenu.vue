<template>
  <v-menu nudge-right>
    <v-toolbar-title slot="activator" class="ml-0">
      <v-btn flat class="fs-ucase fs-m0">
        {{ $t('admin') }}
        <v-icon style="text-transform: initial!important">arrow_drop_down</v-icon>
      </v-btn>
    </v-toolbar-title>
  <v-list dense>
      <v-list-tile :to="$vahi.path('/admin/add/users')">
        <v-list-tile-action><v-icon>add_circle</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addUsers') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/add/eyes')">
        <v-list-tile-action><v-icon>remove_red_eye</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addEyes') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/uploader')">
        <v-list-tile-action><v-icon>add_a_photo</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('uploadImages') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$vahi.path('/admin/manage/users')">
        <v-list-tile-action><v-icon>account_circle</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('manageUsers') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/manage/eyes')">
        <v-list-tile-action><v-icon>remove_red_eye</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('manageEyes') }}</v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile :to="$vahi.path('/admin/add/admins')">
        <v-list-tile-action><v-icon>add_box</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('addAdmins') }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile :to="$vahi.path('/admin/manage/admins')">
        <v-list-tile-action><v-icon>account_box</v-icon></v-list-tile-action>
        <v-list-tile-content>{{ $t('manageAdmins') }}</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

