<template>
  <div>
    <blockquote v-if="(su) ? !$store.state.admin.isSuperAdmin : !$store.state.admin.loggedIn" class="vahi-bq">
      <div v-if="!$store.state.admin.isFresh">
        <h3>{{ $t('justAMoment') }}</h3>
        <p>{{ $t('weAreLoadingDataFromTheBackend') }}</p>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-else>
        <h3 v-if="$store.state.admin.loggedIn">{{ $t('youAreNotASuperAdmin') }}</h3>
        <h3 v-else>{{ $t('youAreNotAnAdmin') }}</h3>
        <p class="display-1">
        ¯\_(ツ)_/¯
        </p>
      </div>
    </blockquote>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VahiWrapperAdminRequired',
  props: {
    callback: {
      type: Function,
      required: false
    },
    su: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      callbackRan: false
    }
  },
  computed: {
    authCompleted () {
      if(this.$store.state.admin.isFresh) {
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
  }
}
</script>
