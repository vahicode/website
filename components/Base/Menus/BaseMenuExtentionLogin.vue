<template>
  <v-list>
    <v-list-tile to="/logout" v-if="$auth.loggedIn">
      <v-list-tile-action>
        <v-icon color="error">vpn_key</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('mainMenu.logout') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/logout" v-else>
      <v-list-tile-action>
        <v-icon color="success">vpn_key</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ $t('mainMenu.login') }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>
