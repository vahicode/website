<template>
  <vahi-wrapper-login-required :callback="nextRating">
    <vahi-breadcrumbs>{{ $t('rateEyes') }}</vahi-breadcrumbs>
    <blockquote v-if="allDone" class="success thanks"> 
      <h3 class="text-xs-left">{{ $t('thankYou') }}</h3>
      <p class="text-xs-left">{{ $t('thankYou-msg') }}</p>
    </blockquote>
    <section v-else>
      <h1 class="text-xs-center">
            <span v-if="step === 1">{{ $t('rateVascularity') }}</span>
            <span v-if="step === 2">{{ $t('rateHaze') }}</span>
            <span v-if="step === 3">{{ $t('rateIntegrity') }}</span>
      </h1>
      <p class="text-xs-center mt-3">
        <v-btn color="primary" flat outline @click="back()" v-if="step>1">
          <v-icon class="mr-3">arrow_back</v-icon>
          <span v-if="step === 2">{{ $t('rateVascularity') }}</span>
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
      <vahi-rating-progress :step="step" :total="eye.total" :done="eye.done" v-if="eye" />
      <div v-for="(picture, index) in eye.pictures" :key="'picture-'+index" class="mt-4">
        <!--<img class="elevation-3" :src="$vahi.eyeSrc(picture.hash)" id="picture"/>-->
        <vahi-grid 
          v-if="eyeLoaded"
          :height="(picture.height)" 
          :width="(picture.width)" 
          :scale="(picture.scale)" 
          :x="(picture.x)" 
          :y="(picture.y)" 
          :rating="rating" 
          :zones="zones(picture)" 
          :pic="$vahi.eyeSrc(picture.hash)"
          v-on:toggle="updateZone"/>
      </div>
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
          this.resetRating()
          this.step = 1
          this.$vahi.addRating({
            v: this.vrating,
            h: this.hrating,
            i: this.irating,
            eye: this.eye.id
          })
          .then((res) => {
            if(res.result === 'ok') {
              this.eyeLoaded = false
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
  div.rid-wrapper {
    position: relative;
    margin: auto
  }
  div.rid-wrapper img {
    width: 100%;
  }
</style>
