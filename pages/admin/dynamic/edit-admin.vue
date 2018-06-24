<template>
  <div>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('admin') }} {{ $route.params.id }}</vahi-breadcrumbs>
    <vahi-wrapper-admin-required class="vahi-m600" su>
    <h1 v-if="admin">{{ $t('admin') }} {{ admin.username }}</h1>
    <div v-if="remove">
    <table class="table" v-if="admin">
      <thead class="thead-dark">
        <tr>
          <th class="key">{{ $t('prop') }}</th>
          <th class="val">{{ $t('value') }}</th>
        </tr>
      </thead>
    <tbody>
      <tr>
        <td class="key">{{ $t('id') }}</td>
        <td class="val">{{ admin.adminid }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('username') }}</td>
        <td class="val">{{ admin.username }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('role') }}</td>
        <td class="val">{{ admin.role }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('userId') }}</td>
        <td class="val">{{ admin.id }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('invite') }}</td>
        <td class="val"><pre>{{ admin.invite }}</pre></td>
      </tr>
      <tr>
        <td class="key">{{ $t('notes') }}</td>
        <td class="val">{{ admin.notes }}</td>
      </tr>
    </tbody>
    </table>
    <blockquote class="warnin mt-5">
      <h3>{{ $t('noWayBack') }}</h3>
      <p>{{ $t('deleteForeverBeCareful') }}</p>
      <p class="text-xs-right">
        <v-btn large @click="deleteAdmin" color="error">
          <v-icon class="mr-3">delete</v-icon> {{ $t('delete') }}
        </v-btn>
        <v-btn large @click="remove = !remove">
          <v-icon class="mr-3">undo</v-icon> {{ $t('cancel') }}
        </v-btn>
      </p>
    </blockquote>
    </div>
    <div v-else>
    <v-form v-model="valid" @submit="submit" v-if="admin">
      <h6> {{ $t('username') }}</h6>
        <v-text-field 
          :label="$t('username')"
          v-model="admin.username"
          required
        ></v-text-field>
       <h6>{{ $t('role') }}</h6>
       <v-radio-group v-model="admin.role">
         <v-radio
           v-for="role in roles"
           :label="$t(role)"
           :value="role"
           :key="role"
         ></v-radio>
       </v-radio-group>
         <div v-if="changePassword">
       <h6>{{ $t('changePassword') }} 
         <v-btn @click="changePassword = !changePassword" flat><v-icon color="error">close</v-icon></v-btn></h6>
       <v-text-field
         :label="$t('password')"
         v-model="password"
       ></v-text-field>
         </div>
      <p class="text-xs-right">
        <v-btn large color="primary" @click="submit">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>save</v-icon> 
          {{ $t('save') }}
        </v-btn>
        <v-btn large v-if="!changePassword" @click="changePassword = !changePassword">
          <v-icon class="mr-3">edit</v-icon> {{ $t('changePassword') }}
        </v-btn>
        <v-btn v-else @click="randomPassword" large>
          {{ $t('randomPassword') }}
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
      >{{ $t('saveFailed') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
    </vahi-wrapper-admin-required>
  </div>
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
      remove: false,
      crumbs: [
        { to: this.$vahi.path('/admin'), 'title': this.$t('administration') },
        { to: this.$vahi.path('/admin/admins'), 'title': this.$t('admins') },
      ]
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      let data = {
        username: this.admin.username,
        role: this.admin.role
      }
      if(this.changePassword) data.password = this.password
      this.$vahi.adminUpdateAdmin(this.$route.params.id, data)
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.success = true
          self.$router.push({
            path: '/admin/admins'
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
    randomPassword: function() {
      let text = ""
      var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789"
      for (var i = 0; i < 12; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      this.password = text
    }
  },
  asyncData: async function ({ app, route }) {
    return { 
      admin: await app.$vahi.adminLoadAdmin(route.params.id)
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
