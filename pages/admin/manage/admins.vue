<template>
  <div class="mt-5">
      <h1>{{ $t('manageAdmins') }}</h1>
    <div v-if="$auth.user.isSuperadmin">
    <v-card>
        <v-toolbar color="primary" class="px-3" dark>
    {{ $t('manageAdmins') }}
         </v-toolbar>
    <v-list two-line>
      <template v-for="(admin, index) in Object.values(api.admins)">
        <v-list-tile :key="'tile-'+index">
          <v-list-tile-avatar>
            <v-icon color="accent" v-if="admin.role == 'superadmin'">account_box</v-icon>
            <v-icon color="info" v-else-if="admin.role == 'admin'">account_box</v-icon>
            <v-icon color="" v-else>account_box</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
              <v-list-tile-title><nuxt-link :to="'/admin/show/admin/'+admin.id">{{ admin.username}}</nuxt-link></v-list-tile-title>
              <v-list-tile-sub-title>
                  Role: {{ admin.role }} 
              </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple :to="'/admin/edit/admin/'+admin.id">
              <v-icon color="accent" v-if="admin.role == 'superadmin'">create</v-icon>
              <v-icon color="info" v-else-if="admin.role == 'admin'">create</v-icon>
              <v-icon color="" v-else>create</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
          <v-divider :key="'divider-'+index" v-if="index != api.count - 1"></v-divider>
      </template>
    </v-list>
    </v-card>
    </div>
    <div v-else>
    <blockquote class="error mt-5 dark">
      <h3 class="white-text">{{ $t('accessDenied') }}</h3>
      <p class="white-text">{{ $t('superadminOnly') }}</p>
    </blockquote>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  asyncData: async function ({ app, route }) {
    return { 
      api: await app.$axios.$get(process.env.api+'/admin/admins')
      .then(function (response) {
        if(response.result === 'ok') {
            return response
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
        self.error = true
      })
    }
  },
}
</script>

<style scoped>
  p a {
    color: #cd003a;
    text-decoration: none;
  }
  icon.admin {
    color: '#fff';  
  }
</style>
