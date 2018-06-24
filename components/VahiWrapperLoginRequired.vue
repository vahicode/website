<template>
  <div>
    <blockquote v-if="!$store.state.user.loggedIn">
      <div v-if="!$store.state.user.isFresh">
        <h3>{{ $t('justAMoment') }}</h3>
        <p>{{ $t('weAreLoadingDataFromTheBackend') }}</p>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <h3>{{ $t('youAreNotLoggedIn') }}</h3>
        <p>
        {{ $t('youAreNotLoggedIn') }}
        </p>
        <div class="mt-5">
          <v-btn :to="$vahi.path('/invite')" large color="primary" class="mb-3">
            <v-icon class="mr-3">vpn_key</v-icon>
            {{ $t('login') }}
          </v-btn>
        </div>
      </div>
    </blockquote>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VahiWrapperLoginRequired',
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      callbackRan: false
    }
  },
  computed: {
    authCompleted () {
      if(typeof this.$store.state.user.id !== 'undefined') {
        this.runCallback()
        return this.$store.state.user.isFresh
      } else {
        return false
      }
    }
  },
  watch: {
    authCompleted: function () {
      this.runCallback()
    }
  },
  methods: {
    runCallback: function() {
      if(typeof this.callback !== 'undefined' && !this.callbackRan) {
        this.callback()
        this.callbackRan = true
      }
    }
  },
  beforeCreate: function () {
    this.$vahi.auth()
  }
}
</script>

<style scoped>
blockquote {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
}
</style>

