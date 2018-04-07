<template>
  <div>
    <h1>{{ $t('user') }} {{ api.id }}</h1>
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
        <td class="val">{{ api.id }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('inviteCode') }}</td>
        <td class="val"><pre>{{ api.invite }}</pre></td>
      </tr>
      <tr>
        <td class="key">{{ $t('notes') }}</td>
        <td class="val">{{ api.notes }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('addedBy') }}</td>
        <td class="val">{{ api.adminUsername }}</td>
      </tr>
    </tbody>
    </table>
    <blockquote class="warnin mt-5">
      <h3>{{ $t('noWayBack') }}</h3>
      <p>{{ $t('deleteForeverBeCareful') }}</p>
      <p class="text-xs-right">
        <v-btn large @click="deleteUser" color="error">
          <v-icon class="mr-3">delete</v-icon> {{ $t('delete') }}
        </v-btn>
        <v-btn large @click="remove = !remove">
          <v-icon class="mr-3">undo</v-icon> {{ $t('cancel') }}
        </v-btn>
      </p>
    </blockquote>
    </div>
    <div v-else>
    <v-form v-model="valid" @submit="submit">
      <h6> {{ $t('inviteCode') }}</h6>
        <v-text-field 
          :label="$t('inviteCode')"
          v-model="api.invite"
          required
          counter="8"
        ></v-text-field>
      <h6> {{ $t('notes') }}</h6>
        <v-text-field 
          :label="$t('notes')"
          v-model="api.notes"
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
      >{{ $t('saveFailed') }}
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
      const ip = this.$axios.$post(process.env.api+'/admin/user/'+this.api.id, {
        invite: this.api.invite,
        notes: this.api.notes
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/show/user/'+self.api.id
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
      const ip = this.$axios.$delete(process.env.api+'/admin/user/'+this.api.id)
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/manage/users'
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
      this.api.invite = text
    }
  },
  asyncData: async function ({ app, route }) {
    return { 
      api: await app.$axios.$get(process.env.api+'/admin/user/'+route.params.id)
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
