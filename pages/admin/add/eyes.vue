<template>
  <section class="container">
    <h1>{{ $t('addEyes') }}</h1>
    <p>
      <v-btn large color="primary" @click="processAll">
        <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        <v-icon class="mr-3" v-else>camera_alt</v-icon>
        {{ $t('addEyeForEachPicture') }}
      </v-btn>
      <v-btn large :disabled="this.selected==0" color="accent" @click="bundleSelected">
        <v-progress-circular indeterminate color="#fff" class="ml-4" v-if="loading" :size="20" :width="2"></v-progress-circular>
        <v-badge v-else left color="info" :value="this.selected!=0">
          <span slot="badge">{{ selected }}</span>
          <v-icon class="mr-3">add_a_photo</v-icon>
        </v-badge>
        {{ $t('addEyeWithSelectedPictures') }}
      </v-btn>
    </p>
    <v-container fluid grid-list-lg v-if="$auth.user.isAdmin">
      <v-layout row wrap>
        <v-flex 
          class="xs6 xl4"
        v-for="picture in api.pictures"
        :key="picture.hash"
        > <nuxt-link to='#' class="nodeco" :class="{ 'selected': picture.selected}" @click.native="togglePicture(picture.id)" :ref="'picture-'+picture.id">
          <v-card>
            <v-card-media :src="pictureSrc(picture.hash)" height="300px" class="text-xs-center">
              <v-icon class="imgicon" color="success">check_circle</v-icon>
		      	</v-card-media>
            <v-card-text>
              <p class="mb-0 mt-0 thetitle">{{ picture.filename }}</p>
              <p class="mb-0 mt-0 theadmin">
                {{ $t('addedBy') }} 
                <nuxt-link :to="'/admin/show/admin/'+picture.admin">
                  {{ picture.username }}
                </nuxt-link>
              </p>
            </v-card-text>
          </v-card>
        </nuxt-link>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>

export default {
  asyncData: async function ({ app, route }) {
    return { 
      api: await app.$axios.$get(process.env.api+'/admin/pictures/orphans')
      .then(function (response) {
        if(response.result === 'ok') {
            Object.keys(response.pictures).forEach(function (key) {
              response.pictures[key].selected = false
            })
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
  data () {
    return {
      loading: false,
      selected: 0
    }
  },
  methods: {
    pictureSrc: function(hash) {
      return process.env.api+'/i/'+hash+'.jpg'
    },
    togglePicture: function(id) {
      this.api.pictures[id].selected = !this.api.pictures[id].selected
      if(this.api.pictures[id].selected === true) { this.selected++ }
      else {this.selected--}
    },
    bundleSelected: function() {
      const self = this
      self.loading = true;
      const toBundle = []
      Object.keys(this.api.pictures).forEach(function (key) {
        if(self.api.pictures[key].selected === true) toBundle.push(key)
      })
      const result = this.$axios.$post(process.env.api+'/admin/eyes/bundle', {pictures: toBundle})
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/manage/eyes'
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
    processAll: function() {
      const self = this
      self.loading = true;
      const toEye = []
      Object.keys(this.api.pictures).forEach(function (key) {
        toEye.push(key)
      })
      const result = this.$axios.$post(process.env.api+'/admin/eyes', {pictures: toEye})
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/manage/eyes'
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
  }
}
</script>

<style scoped>
  p.thetitle {
    font-size: 1rem;
  }
  p.theadmin {
    font-size: 0.6rem;
  }
  a.nodeco {
    text-decoration: none;
  }
  i.imgicon {
    display: none
  }
  a.selected i.imgicon {
    display: block; 
    margin: auto;
    font-size: 100px;
    background-color: #ffffffaa;
    border-radius: 50%;
  }
</style>
