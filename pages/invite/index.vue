<template>
  <section class="text-xs-center">
    <vahi-breadcrumbs>{{ $t('login') }}</vahi-breadcrumbs>
      <h1>VaHI</h1>
      <div v-if="$store.state.user.loggedIn" class="vahi-m600">
        <h2>{{ $t('youAreCurrentlyLoggedIn') }}</h2>
        <p>{{ $t('clickBelowToLogout') }} {{ $t('toLoginAgainYouWillNeedYourInviteCode') }}</p>
        <v-btn color="primary" large @click="logout" :disabled="(loading) ? true : false">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>power_settings_new</v-icon>
          {{ $t('logout') }}
        </v-btn>
      </div>
      <div v-else>
        <h2 class="text-xs-center">{{ $t('enterInviteCode') }}</h2>
        <blockquote v-if="error" class="vahi-bq warning vahi-m600 text-xs-left mb-3">
          <div v-if="reason === 'invite_inactive'">
            <h4>{{ $t('yourInviteIsInactive') }}</h4>
            <p>{{ $t('youNeedAnActiveInviteToParticipate') }}</p>
          </div>
          <div v-else-if="reason === 'invite_invalid'">
            <h4>{{ $t('invalidInviteCode') }}</h4>
            <p>{{ $t('youNeedAnActiveInviteToParticipate') }}</p>
          </div>
        </blockquote>
        <v-form v-model="valid" @submit="login" class="vahi-m600">
          <v-text-field 
            class="login" 
            :label="$t('inviteCode')"
            v-model="inviteCode"
            required
            autofocus
            @keyup.enter="login"
            ></v-text-field>
            <v-btn color="primary" large @click="login" :disabled="(loading) ? true : false">
              <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
              <v-icon class="mr-3" v-else>vpn_key</v-icon>
              {{ $t('login') }}
            </v-btn>
        </v-form>
      </div>
  </section>
</template>

<script>
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {VahiBreadcrumbs},
  data () {
    return {
      inviteCode: '',
      valid: false,
      error: false,
      loading: false
    }
  },
  methods: {
    login: function() {
      this.loading = true;
      this.error = false;
      this.$vahi.login(this.inviteCode)
      .then((result) => {
        this.loading = false
        this.$router.push(this.$vahi.path('/rate'))
      })
      .catch((result) => {
        this.loading = false
        this.error = true
        this.reason = result.reason || 'unknown'
      })
    },
    logout: function() {
      this.$vahi.logout()
      //this.$router.push(this.$vahi.path('/'))
    }
  }
}
</script>
