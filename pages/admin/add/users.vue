<template>
  <vahi-wrapper-admin-required>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('addUsers') }}</vahi-breadcrumbs>
    <h1 class="text-xs-center">{{ $t('addUsers') }}</h1>
    <div class="vahi-m600">
    <h4>{{ $t('pleaseCompleteForm') }}</h4>
    <h6>{{ $t('amountOfUsers') }}</h6>
    <v-form v-model="valid">
      <v-text-field
        :label="$t('amountOfUsers')"
        v-model="count"
        type="number"
        required
      ></v-text-field>
    <h6>{{ $t('notes') }}</h6>
      <v-text-field
        :label="$t('notes')"
        v-model="notes"
        textarea
      ></v-text-field>
      <v-btn @click="submit" color="primary" large>
        {{ $t('addUsers') }}
        <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
      </v-btn>
    </v-form>
    </div>
    <v-snackbar
      :timeout="(4000)"
      top
      right
      v-model="error"
      >{{ $t('failedToAddUsers') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
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
      count: 1,
      notes: '',
      valid: false,
      loading: false,
      error: false,
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
    }
  },
  methods: {
    submit: function() {
      self = this
      self.loading = true;
      self.$vahi.adminAddUsers({
        count: self.count,
        notes: self.notes
      })
      .then(function (res) {
        self.loading = false;
        if(res.result === 'ok') {
          self.$router.push({
            path: '/admin/users'
          })
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
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
