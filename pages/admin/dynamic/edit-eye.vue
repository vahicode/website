<template>
  <section>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('eye') }} {{ $route.params.id }}</vahi-breadcrumbs>
    <pre>{{ eye }} </pre>
    <vahi-wrapper-admin-required class="vahi-m600" v-if="eye">
    <h1>{{ $t('eye') }} {{ eye.id }}</h1>
    <v-form v-model="valid" @submit="submit">
      <h6> {{ $t('notes') }}</h6>
        <v-text-field 
          :label="$t('notes')"
          v-model="eye.notes"
          textarea
        ></v-text-field>
      <p class="text-xs-right">
        <v-btn large color="primary" @click="submit">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon class="mr-3" v-else>save</v-icon> 
          {{ $t('save') }}
        </v-btn>
        <v-btn large :to="'/admin/show/eye/'+eye.id">
          <v-icon class="mr-3">undo</v-icon> 
          {{ $t('cancel') }}
        </v-btn>
      </p>
    </v-form>
    <v-snackbar
      :timeout="(4000)"
      top
      right
      v-model="error"
      >{{ $t('saveFailed') }}
      <v-btn flat color="primary" @click.native="error = false"><v-icon>close</v-icon></v-btn>
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
      remove: false,
      crumbs: [
        { to: this.$vahi.path('/admin'), 'title': this.$t('administration') },
        { to: this.$vahi.path('/admin/eyes'), 'title': this.$t('eyes') },
      ]
    }
  },
  methods: {
    submit: function() {
      const self = this
      this.loading = true;
      this.$vahi.adminUpdateEye(this.$route.params.id, {
        notes: this.eye.notes
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.success = true
          self.$router.push({
            path: '/admin/eyes'
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
  },
  asyncData: async function ({ app, route }) {
    return { 
      eye: await app.$vahi.adminLoadEye(route.params.id)
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
