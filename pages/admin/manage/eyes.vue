<template>
  <div class="mt-5">
      <h1>{{ $t('manageEyes') }}</h1>
    <div v-if="$auth.user.isAdmin">
    <v-container fluid grid-list-lg v-if="$auth.user.isAdmin">
      <v-layout row wrap>
        <v-flex 
          class="xs6 xl4"
        v-for="eye in api.eyes"
        :key="'eye-'+eye.id">
          <v-card :to="'/admin/show/eye/'+eye.id">
            <v-card-media :src="pictureSrc(eye.id)" height="300px" class="text-xs-center">
		        </v-card-media>
            <v-card-text>
              <ul class="meta">
                <li>{{ $t('pictures') }}: {{ (pictureCount(eye.id)) }}</li>
                <li>{{ $t('notes') }}: {{ eye.notes }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    </div>
    <div v-else>
    <blockquote class="error mt-5 dark">
      <h3 class="white-text">{{ $t('admin.accessDenied') }}</h3>
      <p class="white-text">{{ $t('admin.adminOnly') }}</p>
    </blockquote>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  asyncData: async function ({ app, route }) {
    return { 
      api: await app.$axios.$get(process.env.api+'/admin/eyes')
      .then(function (response) {
        if(response.result === 'ok') return response
        else self.error = true
      })
      .catch(function (error) {
        self.error = true
      })
    }
  },
  methods: {
    pictureSrc: function(id) {
      const picid = Object.keys(this.api.eyes[id].pictures).shift()
      return process.env.api+'/i/'+this.api.eyes[id].pictures[picid].hash+'.jpg'
    },
    pictureCount: function(id) {
      return Object.keys(this.api.eyes[id].pictures).length
    },
  },
}
</script>

<style scoped>
  i.imgicon {
    display: block; 
    margin: auto;
    font-size: 50px;
  }
  p a {
    color: #cd003a;
    text-decoration: none;
  }
  ul.meta {
    font-size: 0.8rem;
    margin-left: 0;
  }
  ul.meta li {
    list-style-type: none;
  }
</style>
