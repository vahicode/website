<template>
  <div>
    <h1>{{ $t('eye') }} {{ api.id }}</h1>
    <h2>{{ $t('pictures') }}</h2>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          class="xs6 xl4"
        v-for="picture in api.pictures"
        :key="picture.hash">
          <v-card :to="'/admin/show/eye/'+picture.id">
            <v-card-media :src="pictureSrc(picture.hash)" height="300px" class="text-xs-center">
		        </v-card-media>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
        <td class="key">{{ $t('notes') }}</td>
        <td class="val">{{ api.notes }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('addedBy') }}</td>
        <td class="val"><nuxt-link :to="'/admin/show/admin/'+api.admin">{{ api.adminUsername }}</nuxt-link></td>
      </tr>
    </tbody>
    </table>
    <p class="text-xs-right">
    <v-btn color="primary" :to="'/admin/edit/eye/'+api.id">
      <v-icon class="mr-3">edit</v-icon> {{ $t('editEye') }}
    </v-btn>
    </p>
  </div>
</template>

<script>
export default  {
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
  },
  methods: {
    pictureSrc: function(hash) {
      return process.env.api+'/i/'+hash+'.jpg'
    },
  }
}
</script>

<style scoped>
  pre {
    letter-spacing: 1px;
  }
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
</style>
