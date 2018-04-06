<template>
  <div class="mt-5">
      <h1>{{ $t('manageUsers') }}</h1>
    <div v-if="$auth.user.isAdmin">
    <v-card>
        <v-toolbar color="primary" class="px-3" dark>
    {{ $t('manageUsers') }}
         </v-toolbar>
    <v-list two-line>
      <template v-for="(user, index) in Object.values(api.users)">
        <v-list-tile :key="'tile-'+index">
          <v-list-tile-avatar>
            <v-icon>account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
              <v-list-tile-title><nuxt-link :to="'/admin/show/user/'+user.id">{{ user.notes}}</nuxt-link></v-list-tile-title>
              <v-list-tile-sub-title>
                  Invite: {{ user.invite }}
              </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple :to="'/admin/edit/user/'+user.id">
              <v-icon color="info">create</v-icon>
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
      <h3 class="white-text">{{ $t('admin.accessDenied') }}</h3>
      <p class="white-text">{{ $t('admin.adminOnly') }}</p>
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
      api: await app.$axios.$get(process.env.api+'/admin/users')
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
