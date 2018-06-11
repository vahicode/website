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
          <v-card :to="'/admin/edit/picture/'+picture.id">
            <v-card-media :src="pictureSrc(picture.hash)" height="300px" class="text-xs-center">
              <v-icon class="imgicon" v-if="(picture.scale==0.5 && picture.x==0.25 && picture.y==0.15)" color="error">open_with</v-icon>
              <v-icon class="imgicon" v-else color="success">open_with</v-icon>
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
    <v-badge overlap color="error">
      <span slot="badge" v-if="api.pictureCount-api.activated">{{(api.pictureCount-api.activated)}}</span>
      <v-btn color="accent" @click="activateEye" :disabled="api.pictureCount-api.activated">
        <v-icon class="mr-3">done_all</v-icon> {{ $t('activateEye') }}
      </v-btn>
    </v-badge>
    </p>
  </div>
</template>

<script>
export default  {
  asyncData: async function ({ app, route }) {
      const api = await app.$axios.$get(process.env.api+'/admin/eye/'+route.params.id)
      api.activated = 0
      Object.keys(api.pictures).forEach(function(key) {
        if (api.pictures[key].scale != 0) api.activated++;
      })
      return { api: api }
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
  i.imgicon {
    display: one
  }
  i.imgicon {
    display: block; 
    margin: auto;
    font-size: 50px;
    background-color: #ffffffaa;
    border-radius: 50%;
    padding: 25px;
  }
  a.card:hover i.imgicon {
    font-size: 100px;
  }
</style>
