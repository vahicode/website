<template>
  <section class="container">
    <h1>{{ $t('addUsers') }}</h1>
    <div v-if="$auth.user.isSuperadmin">
     <h4>{{ $t('pleaseCompleteForm') }}</h4>
     <h6>{{ $t('amountOfUsers') }}</h6>
      <v-form v-model="valid">
        <v-text-field
          :label="$t('amountOfUsers')"
          v-model="count"
          type="number"
          required
        ></v-text-field>
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
    <div v-else>
    <blockquote class="error mt-5 dark">
      <h3 class="white-text">{{ $t('accessDenied') }}</h3>
      <p class="white-text">{{ $t('superadminOnly') }}</p>
    </blockquote>
    </div>
    <v-snackbar
      :timeout="(4000)"
      top
      right
      v-model="error"
      >{{ $t('failedToAddUsers') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
  </section>
</template>

<script>

export default {
  data () {
    return {
      count: 1,
      notes: '',
      valid: false,
      loading: false,
      error: false
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      const ip = this.$axios.$post(process.env.api+'/admin/users', {
        count: this.count,
        notes: this.notes
      })
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
