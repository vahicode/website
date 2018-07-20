<template>
  <vahi-wrapper-login-required :callback="nextRating">
    <vahi-breadcrumbs>{{ $t('rateEyes') }}</vahi-breadcrumbs>
    <div v-if="allDone"> 
      <blockquote class="success thanks"> 
        <h3 class="text-xs-left">{{ $t('thankYou') }}</h3>
        <p class="text-xs-left">{{ $t('thankYou-msg') }}</p>
      </blockquote>
      <blockquote v-if="$store.state.user.id === '1'" class="primary reset pb-3"> 
        <h3 class="text-xs-left">{{ $t('resetDemo') }}?</h3>
        <p class="text-xs-left">{{ $t('resetDemo-txt') }}</p>
        <v-btn class="white mt-3" dark flat outline @click="resetDemo" large><v-icon class="mr-3">settings_backup_restore</v-icon>{{ $t('resetDemo') }}</v-btn>
      </blockquote>
    </div>
    <section v-else>
      <h1 class="text-xs-center">
            <span v-if="step === 1">{{ $t('rateVascularisation') }}</span>
            <span v-if="step === 2">{{ $t('rateHaze') }}</span>
            <span v-if="step === 3">{{ $t('rateIntegrity') }}</span>
      </h1>
      <p class="text-xs-center mt-3">
        <v-btn color="primary" flat outline @click="back()" v-if="step>1">
          <v-icon class="mr-3">arrow_back</v-icon>
          <span v-if="step === 2">{{ $t('rateVascularisation') }}</span>
          <span v-if="step === 3">{{ $t('rateHaze') }}</span>
        </v-btn>
        <v-btn color="primary" @click="save()">
          <span v-if="step === 1">{{ $t('rateHaze') }}</span>
          <span v-if="step === 2">{{ $t('rateIntegrity') }}</span>
          <v-icon class="ml-3" v-if="step<3">arrow_forward</v-icon>
          <v-icon class="mr-3" v-else>save</v-icon>
          <span v-if="step === 3">{{ $t('saveRating') }}</span>
        </v-btn>
      </p>
      <v-layout row wrap v-if="eye.pictures">
        <v-flex xl8 lg9 md12 sm12 xs12>
          <vahi-rating-progress :step="step" :total="eye.total" :done="eye.done" v-if="eye" />
          <div v-for="(picture, index) in eye.pictures.vh" :key="'picture-'+index" class="mt-4" v-if="step<3">
            <vahi-grid 
              v-if="eyeLoaded"
              :height="parseFloat(picture.height)" 
              :width="parseFloat(picture.width)" 
              :scale="parseFloat(picture.scale)" 
              :x="parseFloat(picture.x)" 
              :y="parseFloat(picture.y)" 
              :rating="rating" 
              :zones="zones(picture)" 
              :pic="$vahi.eyeSrc(picture.hash)"
              v-on:toggle="updateZone"/>
          </div>
          <div v-for="(picture, index) in eye.pictures.i" :key="'picture-'+index" class="mt-4" v-if="step==3">
            <a @click.stop="toggleIrating()">
            <img :class="'elevation-3 irate irate-'+rating[1]" :src="$vahi.eyeSrc(picture.hash)" id="picture" />
            </a>
          </div>
        </v-flex>
        <v-flex xl4 lg3 md12 xs12>
          <h5 class="ml-4">
            <span v-if="step === 1">{{ $t('legend-v') }}</span> 
            <span v-if="step === 2">{{ $t('legend-h') }}</span> 
            <span v-if="step === 3">{{ $t('legend-i') }}</span> 
          </h5>
          <ul class="legend">
            <li v-for="n in 4" :key="n">
              <v-avatar :size="(32)" :class="'legend-'+(n-1)">{{ (n-1) }}</v-avatar> 
              <span v-if="step === 1">{{ $t('legend-v-'+(n-1)) }}</span>
              <span v-if="step === 2">{{ $t('legend-h-'+(n-1)) }}</span>
              <span v-if="step === 3">{{ $t('legend-i-'+(n-1)) }}</span>
            </li>
          </ul>
        </v-flex>
      </v-layout>
      <pre>{{vrating}}</pre>
      <pre>{{hrating}}</pre>
      <pre>{{irating}}</pre>
    </section>
  </vahi-wrapper-login-required>
</template>

<script>
import VahiWrapperLoginRequired from '~/components/VahiWrapperLoginRequired'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
import VahiGrid from '~/components/VahiGrid'
import VahiRatingProgress from '~/components/VahiRatingProgress'
export default {
  components: {
    VahiWrapperLoginRequired,
    VahiBreadcrumbs,
    VahiGrid,
    VahiRatingProgress
  },
  data: function() {
    return {
      eye: false,
      eyeLoaded: false,
      rating:  { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 },
      step: 1,
      vrating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 },
      hrating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 },
      irating: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0 },
      allDone: false
    }
  },
  methods: {
    resetDemo: function() {
      this.$vahi.resetDemo()
      .then((res) => {
        if(res.result === 'ok') {
          this.allDone = false
          this.eyeLoaded = false
          this.nextRating()
        } else {
          this.error = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
    },
    resetRating: function() {
      for(let i=1; i<14; i++) {
        this.rating[i] = 0
        this.vrating[i] = 0
        this.hrating[i] = 0
        this.irating[i] = 0
      }
    },
    loadRating: function(rating) {
      for(let i=1; i<14; i++) {
        this.rating[i] = rating[i]
      }
    },
    copyRating: function(rating) {
      return JSON.parse(JSON.stringify(rating))
    },
    back: function() {
      switch(this.step) {
        case 2:
          this.hrating = this.copyRating(this.rating)
          this.loadRating(this.vrating)
          this.step = 1
        break
        case 3:
          this.irating = this.copyRating(this.rating)
          this.loadRating(this.hrating)
          this.step = 2
        break
      }
    },
    save: function() {
      switch(this.step) {
        case 1:
          this.vrating = this.copyRating(this.rating)
          this.loadRating(this.hrating)
          this.step = 2
          break
        case 2:
          this.hrating = this.copyRating(this.rating)
          this.loadRating(this.irating)
          this.step = 3
          break
        case 3:
          this.irating = this.copyRating(this.rating)
          this.$vahi.addRating({
            v: this.vrating,
            h: this.hrating,
            i: this.irating,
            eye: this.eye.id
          })
          .then((res) => {
            if(res.result === 'ok') {
              this.eyeLoaded = false
              this.resetRating()
              this.step = 1
              this.nextRating()
            } else {
              this.error = true
            }
          })
      .catch((error) => {
        console.log(error)
      })
          break
      }
    },
    zones: function(pic) {
      let zones = {}
      for(let i=1; i<14; i++) {
        zones[i] = (pic['zone'+i] === '1') ? 1 : 0
      }
      return zones
    },
    toggleIrating: function() {
      let newRating;
      if(this.rating[1] === 3) {
        newRating = 0;
      } else {
        newRating = this.rating[1] + 1;
      }
      for(let i = 1; i < 14; i++) {
        this.rating[i] = newRating;
      }
    },
    updateZone: function(zone) {
      if(this.rating[zone] === 3) this.rating[zone] = 0
      else this.rating[zone]++
    },
    nextRating: function() {
      this.$vahi.loadRating()
      .then((res) => {
        if(res.result === 'ok') {
          this.eye = res.eye
          this.eyeLoaded = true
        } else if (res.result === 'done') {
          this.allDone = true
        } else {
          this.error = true
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
}
</script>

<style>
  ul.legend li {
    list-style-type: none;
  }
  ul.legend li div {
    margin-right: 5px;
    margin-bottom: 5px;
    color: white;
  }
  .foo {
    background: forestgreen;
  }
  .legend-0 {
    background: #228B22; 
  }
  .legend-1 {
    background: #CDBB32; 
  }
  .legend-2 {
    background: #FF9000; 
  }
  .legend-3 {
    background: #FF2D00; 
  }
  img.irate {
    border: 10px solid white;
  }
  img.irate-0 { border-color: #228B22; }
  img.irate-1 { border-color: #CDBB32; }
  img.irate-2 { border-color: #FF9000; }
  img.irate-3 { border-color: #FF2D00; }
</style>
