<template>
  <section>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('eye') }} {{ $route.params.id }}</vahi-breadcrumbs>
    <vahi-wrapper-admin-required class="vahi-m600" v-if="eye">
    <h1>{{ $t('eye') }} {{ eye.id }}</h1>
    <v-form v-model="valid" @submit="submit">
      <h6> {{ $t('active') }}</h6>
      <v-switch
        :label="(eye.active) ? $t('active') : $t('inactive')"
        v-model="eye.active"
        color="success"
      ></v-switch>
      <h6> {{ $t('integrity') }}</h6>
      <p> {{ $t('pleaseSelectThePictureToBeUsedForIntegrityRating') }}</p>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex 
            class="xs6 xl4"
          v-for="picture in eye.pictures"
          :key="picture.hash"
          > <nuxt-link to='#' class="nodeco" :class="(picture.integrity == 1) ? 'integrity' : ''" @click.native="togglePicture(picture.id)" :ref="'picture-'+picture.id">
            <v-card>
              <v-card-media :src="$vahi.eyeSrc(picture.hash)" height="300px" class="text-xs-center">
                <v-icon class="imgicon" color="success">check_circle</v-icon>
		        	</v-card-media>
            </v-card>
          </nuxt-link>
          </v-flex>
        </v-layout>
      </v-container>
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
        <v-btn large to="/admin/eyes">
          <v-icon class="mr-3">cancel</v-icon> 
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
      integrity: false,
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
    togglePicture: function(id) {
      for(let pic in this.eye.pictures) {
        if(this.eye.pictures[pic].id === id) {
          this.eye.pictures[pic].integrity = 1;
          this.integrity = id;
        } else this.eye.pictures[pic].integrity = 0;
      }
    },
    submit: function() {
      const self = this
      this.loading = true;
      this.$vahi.adminUpdateEye(this.$route.params.id, {
        notes: this.eye.notes,
        active: this.eye.active,
        integrity: this.integrity
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
  a.integrity i.imgicon {
    display: block; 
    margin: auto;
    font-size: 100px;
    background-color: #ffffffaa;
    border-radius: 50%;
  }
</style>
