<template>
  <vahi-wrapper-admin-required>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('addEyes') }}</vahi-breadcrumbs>
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
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          class="xs6 xl4"
        v-for="picture in pictures"
        :key="picture.hash"
        > <nuxt-link to='#' class="nodeco" :class="{ 'selected': picture.selected}" @click.native="togglePicture(picture.id)" :ref="'picture-'+picture.id">
          <v-card>
            <v-card-media :src="$vahi.eyeSrc(picture.hash)" height="300px" class="text-xs-center">
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
  </vahi-wrapper-admin-required>
</template>

<script>
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
export default {
  components: {
    VahiWrapperAdminRequired,
    VahiBreadcrumbs
  },
  asyncData: async function ({ app, route }) {
    return { 
      pictures: await app.$vahi.adminLoadOrphanPictures()
      .then(function (res) {
        return res.pictures 
      })
      .catch(function (error) {
        app.error = true
      })
    }
  },
  data () {
    return {
      loading: false,
      selected: 0,
      crumbs: [{to: this.$vahi.path('/admin'), 'title': this.$t('administration')}]
    }
  },
  methods: {
    togglePicture: function(id) {
      this.pictures[id].selected = !this.pictures[id].selected
      if(this.pictures[id].selected === true) { this.selected++ }
      else {this.selected--}
    },
    bundleSelected: function() {
      const self = this
      self.loading = true;
      const toBundle = []
      Object.keys(this.pictures).forEach(function (key) {
        if(self.pictures[key].selected === true) toBundle.push(key)
      })
      this.$vahi.adminBundlePictures({pictures: toBundle})
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/eyes'
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
      Object.keys(this.pictures).forEach(function (key) {
        toEye.push(key)
      })
      this.$vahi.adminAddEyes({pictures: toEye})
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/eyes'
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
