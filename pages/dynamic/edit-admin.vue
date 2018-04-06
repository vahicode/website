<template>
  <div>
    <h1>{{ $t('admin.edit.admins.title') }} {{ api.username }}</h1>
    <div v-if="remove">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th class="key">{{ $t('admin.edit.admins.prop') }}</th>
          <th class="val">{{ $t('admin.edit.admins.value') }}</th>
        </tr>
      </thead>
    <tbody>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.id') }}</td>
        <td class="val">{{ api.adminid }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.username') }}</td>
        <td class="val">{{ api.username }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.role') }}</td>
        <td class="val">{{ api.role }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.userid') }}</td>
        <td class="val">{{ api.id }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('login.field') }}</td>
        <td class="val"><pre>{{ api.invite }}</pre></td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.notes') }}</td>
        <td class="val">{{ api.notes }}</td>
      </tr>
    </tbody>
    </table>
    <blockquote class="warnin mt-5">
      <h3>{{ $t('admin.edit.admins.noWayBack') }}</h3>
      <p>{{ $t('admin.edit.admins.goneForever') }}</p>
      <p class="text-xs-right">
        <v-btn large @click="deleteAdmin" color="error">
          <v-icon class="mr-3">delete</v-icon> {{ $t('admin.edit.admins.remove') }}
        </v-btn>
        <v-btn large @click="remove = !remove">
          <v-icon class="mr-3">undo</v-icon> {{ $t('admin.edit.admins.cancel') }}
        </v-btn>
      </p>
    </blockquote>
    </div>
    <div v-else>
    <v-form v-model="valid" @submit="submit">
      <h6> {{ $t('admin.username') }}</h6>
        <v-text-field 
          :label="$t('admin.username')"
          v-model="api.username"
          required
        ></v-text-field>
       <h6>{{ $t('admin.edit.admins.role') }}</h6>
       <v-radio-group v-model="api.role">
         <v-radio
           v-for="role in roles"
           :label="$t('admin.roles.'+role)"
           :value="role"
           :key="role"
         ></v-radio>
       </v-radio-group>
         <div v-if="changePassword">
       <h6>{{ $t('admin.edit.admins.changePassword') }} 
         <v-btn @click="changePassword = !changePassword" flat><v-icon color="error">close</v-icon></v-btn></h6>
       <v-text-field
         :label="$t('admin.password')"
         v-model="password"
       ></v-text-field>
         </div>
      <p class="text-xs-right">
        <v-btn large color="primary" @click="submit">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>save</v-icon> 
          {{ $t('admin.edit.admins.save') }}
        </v-btn>
        <v-btn large v-if="!changePassword" @click="changePassword = !changePassword">
          <v-icon class="mr-3">edit</v-icon> {{ $t('admin.edit.admins.changePassword') }}
        </v-btn>
        <v-btn v-else @click="randomPassword" large>
          {{ $t('admin.add.admins.randomPassword') }}
        </v-btn>
        <v-btn large @click="remove = !remove" color="error">
          <v-icon class="mr-3">delete</v-icon> {{ $t('admin.edit.admins.remove') }}
        </v-btn>
      </p>
    </v-form>
    </div>
    <v-snackbar
      :timeout="(4000)"
      top
      right
      v-model="error"
      >{{ $t('admin.edit.admins.saveFailed') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default  {
  data () {
    return {
      valid: false,
      roles: ['disabled','admin','superadmin'],
      changePassword: false,
      password: '',
      loading: false,
      error: false,
      remove: false
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      const ip = this.$axios.$post(process.env.api+'/admin/admin/'+this.api.id, {
        username: this.api.username,
        role: this.api.role,
        password: this.password
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/show/admin/'+self.api.id
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
    deleteAdmin: function() {
      const self = this
      this.loading = true;
      const ip = this.$axios.$delete(process.env.api+'/admin/admin/'+this.api.id)
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/manage/admins'
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
      api: await app.$axios.$get(process.env.api+'/admin/admin/'+route.params.id)
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
