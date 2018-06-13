<template>
  <div>
    <h1>{{ $t('user') }} {{ api.id }}</h1>
    <v-form v-model="valid" @submit="submit">
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
        <v-btn large :to="'/admin/show/eye/'+api.id">
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
      const ip = this.$axios.$post(process.env.api+'/admin/eye/'+this.api.id, {
        notes: this.api.notes
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/show/eye/'+self.api.id
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
      api: await app.$axios.$get(process.env.api+'/admin/eye/'+route.params.id)
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
