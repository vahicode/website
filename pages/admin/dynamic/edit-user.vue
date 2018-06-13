<template>
  <section>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('user') }} {{ $route.params.id }}</vahi-breadcrumbs>
    <vahi-wrapper-admin-required class="vahi-m600">
      <h1 class="text-xs-center">{{ $t('user') }} {{ $route.params.id }}</h1>
      <div v-if="remove">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th class="key">{{ $t('prop') }}</th>
            <th class="val">{{ $t('value') }}</th>
          </tr>
        </thead>
      <tbody>
        <tr>
          <td class="key">{{ $t('id') }}</td>
          <td class="val">{{ user.id }}</td>
        </tr>
        <tr>
          <td class="key">{{ $t('status') }}</td>
          <td class="val">{{ (user.active) ? $t('active') : $t('inactive') }}</td>
        </tr>
        <tr>
          <td class="key">{{ $t('inviteCode') }}</td>
          <td class="val"><pre>{{ user.invite }}</pre></td>
        </tr>
        <tr>
          <td class="key">{{ $t('notes') }}</td>
          <td class="val">{{ user.notes }}</td>
        </tr>
        <tr>
          <td class="key">{{ $t('addedBy') }}</td>
          <td class="val">{{ user.adminUsername }}</td>
        </tr>
      </tbody>
      </table>
      <blockquote class="error mt-5">
        <h3>{{ $t('noWayBack') }}</h3>
        <p>{{ $t('deleteForeverBeCareful') }}</p>
        <p class="text-xs-right">
          <v-btn large flat outline @click="deleteUser" color="white">
            <v-icon class="mr-3">delete</v-icon> {{ $t('delete') }}
          </v-btn>
          <v-btn large flat outline color="white" @click="remove = !remove">
            <v-icon class="mr-3">cancel</v-icon> {{ $t('cancel') }}
          </v-btn>
        </p>
      </blockquote>
      </div>
      <div v-else>
      <v-form v-model="valid" @submit="submit" v-if="user">
        <h6> {{ $t('active') }}</h6>
        <v-switch
          :label="(user.active) ? $t('active') : $t('inactive')"
          v-model="user.active"
          color="success"
        ></v-switch>
        <h6> {{ $t('inviteCode') }}</h6>
          <v-text-field 
            :label="$t('inviteCode')"
            v-model="user.invite"
            required
            counter="8"
          ></v-text-field>
        <h6> {{ $t('notes') }}</h6>
          <v-text-field 
            :label="$t('notes')"
            v-model="user.notes"
            textarea
          ></v-text-field>
        <p class="text-xs-right">
          <v-btn large color="primary" @click="submit">
            <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
            <v-icon class="mr-3" v-else>save</v-icon> 
            {{ $t('save') }}
          </v-btn>
          <v-btn @click="randomInvite" large>
            {{ $t('randomInvite') }}
          </v-btn>
          <v-btn large @click="remove = !remove" color="error">
            <v-icon class="mr-3">delete</v-icon> {{ $t('delete') }}
          </v-btn>
        </p>
      </v-form>
      </div>
      <v-snackbar
        :timeout="(4000)"
        top
        right
        v-model="error"
        color="error"
        >{{ $t('saveFailed') }}
        <v-btn flat @click.native="error = false"><v-icon>close</v-icon></v-btn>
      </v-snackbar>
      <v-snackbar
        :timeout="(4000)"
        top
        right
        v-model="success"
        color="success"
        >{{ $t('changesSaved') }}
        <v-btn flat @click.native="error = false"><v-icon>close</v-icon></v-btn>
      </v-snackbar>
    </vahi-wrapper-admin-required>
  </section>
</template>

<script>
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
export default  {
  components: {
    VahiBreadcrumbs,
    VahiWrapperAdminRequired
  },
  data () {
    return {
      valid: false,
      roles: ['disabled','admin','superadmin'],
      changePassword: false,
      password: '',
      loading: false,
      error: false,
      success: false,
      remove: false,
      crumbs: [
        { to: this.$vahi.path('/admin'), 'title': this.$t('administration') },
        { to: this.$vahi.path('/admin/users'), 'title': this.$t('users') },
      ]
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      this.$vahi.adminUpdateUser(this.$route.params.id, {
        active: this.user.active,
        invite: this.user.invite,
        notes: this.user.notes
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.success = true
          self.$router.push({
            path: '/admin/users'
          })
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
        console.log(error)
        self.loading = false;
        self.error = true
      });
    },
    deleteUser: function() {
      const self = this
      this.loading = true;
      this.$vahi.adminDeleteUser(this.$route.params.id)
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/users'
          })
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
        console.log(error)
        self.loading = false;
        self.error = true
      });
    },
    randomInvite: function() {
      let text = ""
      var possible = "abcdefghkmnpqrstuvwxyz234578"
      for (var i = 0; i < 8; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      this.user.invite = text
    }
  },
  asyncData: async function ({ app, route }) {
    return { 
      user: await app.$vahi.adminLoadUser(route.params.id)
      .then(function (response) {
        if(response.result === 'ok') {
            return response
        } else {
          app.error = true
        }
      })
      .catch(function (error) {
        app.error = true
      })
    }
  }
}
</script>

<style scoped>
  table.table thead th.key {
    text-align: right;
    font-size: 1rem;
  }
  table.table thead th.val {
    text-align: left;
    font-size: 1rem;
  }
  table.table tbody td.key {
    font-weight: bold;
    max-width: 150px;
    text-align: right;
    font-size: 0.8rem;
  }
  table.table tbody td.val {
    font-size: 0.8rem;
  }
  table.table tbody td.edit {
    padding: 0.75rem 0 0 0;
  }
</style>
