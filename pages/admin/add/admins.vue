<template>
  <vahi-wrapper-admin-required super>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('addAdmin') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('addAdmin') }}</h1>
    {{ reason }}
    <div class="vahi-m600">
     <h4>{{ $t('pleaseCompleteForm') }}</h4>
     <v-alert v-if="error" color="error" value="1" icon="warning">
         {{ $t($vahi.camelCase(reason)) }}
     </v-alert>
      <v-form v-model="valid">
        <v-text-field
          :label="$t('adminUsername')"
          v-model="username"
          required
        ></v-text-field>
        <v-text-field
          :label="$t('adminPassword')"
          v-model="password"
          required
        ></v-text-field>
        <v-btn @click="submit" color="primary" large>
          {{ $t('addAdmin') }}
          <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        </v-btn>
        <v-btn @click="randomPassword" large>
          {{ $t('randomPassword') }}
        </v-btn>
      </v-form>
    </div>
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {
    VahiWrapperAdminRequired,
     VahiBreadcrumbs
  },
  data () {
    return {
      username: '',
      password: '',
      valid: false,
      loading: false,
      error: false,
      reason: '',
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      self.$vahi.adminAddAdmin({
        username: this.username,
        password: this.password
      })
      .then(function (res) {
        self.loading = false;
        if(res.result === 'ok') {
          self.$router.push({
            path: '/admin/admins'
          })
        } else {
          self.error = true
          self.reason = res.reason
        }
      })
      .catch(function (error) {
        self.loading = false;
        self.error = true
        self.reason = error.response.data.reason
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
  }
}
</script>

<style scoped>
  form {
  }
  .white-text {
    color: #fff;
  }
</style>
