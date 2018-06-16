<template>
  <section>
    <vahi-breadcrumbs :crumbs="crumbs">{{ $t('picture') }} {{ $route.params.id }}</vahi-breadcrumbs>
    <vahi-wrapper-admin-required class="vahi-600">
    <h1>{{ $t('eye') }} {{ picture.id }}</h1>
    <h4> {{ $t('placeGrid') }}</h4>
    <h6> {{ $t('scale') }}</h6>
     <v-slider max="1" persistent-hint hint="Slide to adjust grid size" v-model="scale" step="0"></v-slider>
    <div class="grid-wrapper mt-5">
      <img class="ack elevation-3" :src="$vahi.eyeSrc(picture.hash)" ref="picture" />
      <no-ssr v-if="picture">
       <vue-draggable-resizable 
         v-if="clientX"
         v-on:dragstop="dragStop"
         :resizable="false" 
         ref="grid"
         :x="clientX"
         :y="clientY"
         >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        :width="clientWidth*scale" 
        :height="clientWidth*scale" 
        viewBox="0 0 1200 1200">
        <path :class="zoneClass(1)" d="m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z"></path>
        <path :class="zoneClass(2)" d="M 1024.264,175.7363 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z"></path>
        <path :class="zoneClass(3)" d="m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z"></path>
        <path :class="zoneClass(4)" d="M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z"></path>
        <path :class="zoneClass(5)" d="M 317.33398,882.66797 175.73633,1024.2657 A 600,600 0 0 0 600,1200 l 0,-200.00003 a 400,400 0 0 1 -282.66602,-117.332 z"></path>
        <path :class="zoneClass(6)" d="M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z"></path>
        <path :class="zoneClass(7)" d="M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z"></path>
        <path :class="zoneClass(8)" d="M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z"></path>
        <path :class="zoneClass(9)" d="m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z"></path>
        <path :class="zoneClass(10)"  d="m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z"></path>
        <path :class="zoneClass(11)" d="m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z"></path>
        <path :class="zoneClass(12)" d="m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"></path>
        <circle class=" i" :class="zoneClass(13)" cx="600" cy="600" r="200"></circle>
      </svg>            
       </vue-draggable-resizable>
      </no-ssr>

  </div>
  <div v-if="picture.sameEyeOtherPics === false" class="mt-3">
    <v-btn large color="primary" @click="savePicture(true)">{{$t('savePicture')}}</v-btn>
    <v-btn large to="/admin/pictures"><v-icon class="mr-3">cancel</v-icon>{{$t('cancel')}}</v-btn>
  </div>
  <div v-else>
    <h4> {{ $t('selectZonesToRate') }}</h4>
    <v-btn color="primary" @click="selectAllZones"><v-icon class="mr-3">add_circle_outline</v-icon>{{$t('selectAll')}}</v-btn>
    <v-btn color="primary" @click="clearAllZones"> <v-icon class="mr-3">remove_circle_outline</v-icon>{{$t('clearAll')}}</v-btn>
    <div class="zones">
      <svg 
         class="picker"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 1200">
				<path class="p" @click="toggleZone(1)" :class="zoneClass(1)" d="m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z"></path>
        <path class="p" @click="toggleZone(2)" :class="zoneClass(2)" d="M 1024.264,175.7363 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z"></path>
        <path class="p" @click="toggleZone(3)" :class="zoneClass(3)" d="m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z"></path>
        <path class="p" @click="toggleZone(4)" :class="zoneClass(4)" d="M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z"></path>
        <path class="p" @click="toggleZone(5)" :class="zoneClass(5)" d="M 317.33398,882.66797 175.73633,1024.2657 A 600,600 0 0 0 600,1200 l 0,-200.00003 a 400,400 0 0 1 -282.66602,-117.332 z"></path>
        <path class="p" @click="toggleZone(6)" :class="zoneClass(6)" d="M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z"></path>
        <path class="p" @click="toggleZone(7)" :class="zoneClass(7)" d="M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z"></path>
        <path class="p" @click="toggleZone(8)" :class="zoneClass(8)" d="M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z"></path>
        <path class="p" @click="toggleZone(9)" :class="zoneClass(9)" d="m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z"></path>
        <path class="p" @click="toggleZone(10)" :class="zoneClass(10)" d="m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z"></path>
        <path class="p" @click="toggleZone(11)"  :class="zoneClass(11)" d="m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z"></path>
        <path class="p" @click="toggleZone(12)"  :class="zoneClass(12)" d="m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"></path>
				<circle class="p" @click="toggleZone(13)" :class="zoneClass(13)" cx="600" cy="600" r="200"></circle>
      </svg>                                     
    </div>                                       
    <v-btn large color="primary" @click="savePicture(false)">{{$t('savePicture')}} ++</v-btn>
    <v-btn large to="/admin/pictures"><v-icon class="mr-3">cancel</v-icon>{{$t('cancel')}}</v-btn>
  </div>                                         
    </vahi-wrapper-admin-required>
  </section>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import VahiBreadcrumbs from '~/components/VahiBreadcrumbs'
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
export default  {
  components: {
    VahiBreadcrumbs,
    VahiWrapperAdminRequired,
    VueDraggableResizable
  },
  data () {
    return {
      x: 0.25,
      y: 0.15,
      scale: 0.5,
      clientX: 0,
      clientY: 0,
      crumbs: [
        { to: this.$vahi.path('/admin'), 'title': this.$t('administration') },
        { to: this.$vahi.path('/admin/pictures'), 'title': this.$t('pictures') },
      ]
    } 
  },
  computed: { 
    initX: {
      get: function () {
        return 100
      },
      set: function(val) {
        this.clientX = val
      }
    },
    initY: {
      get: function () {
        return 100
      },
      set: function(val) {
        this.clientY = val
      }
    },
    initWidth: {
      get: function () {
        return 100
      },
      set: function(val) {
        this.clientWidth = val
      }
    },
    initHeight: {
      get: function () {
        return 100
      },
      set: function(val) {
        this.clientHeight = val
      }
    }
  },
  mounted: function() {
    this.clientScale = this.$refs.picture.clientWidth/this.picture.width
    this.clientWidth = this.$refs.picture.clientWidth
    this.clientHeight = this.$refs.picture.clientHeight
    this.scale = this.picture.scale
    this.initX = this.picture.x * this.clientWidth
    this.initY = this.picture.y * this.clientHeight
  },
  methods: {
    zoneClass: function(zone) {
      if(this.nogo[zone]) return 'nogo'
      else return (parseInt(this.picture.zones[zone])) ? 'selected' : ''
    },
    selectAllZones: function() {
      for (let i in this.picture.zones) {
        this.picture.zones[i] = '1'
      }
    },
    clearAllZones: function() {
      for (let i in this.picture.zones) {
        this.picture.zones[i] = '0'
      }
    },
    toggleZone: function(zone) {
      (parseInt(this.picture.zones[zone]) === 0) ? 
      this.picture.zones[zone] = '1' :
      this.picture.zones[zone] = '0' 
    },
    dragStop: function(x, y) {
      this.x = x/this.clientWidth
      this.y = y/this.clientHeight
    },
    savePicture: function(allZones=false) {
      if(allZones) this.selectAllZones()
      const self = this
      this.loading = true;
      this.$vahi.adminUpdatePicture(this.picture.hash, {
        x: this.x,
        y: this.y,
        scale: this.scale,
        zones: this.picture.zones
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/pictures'
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
    let nogo = {
      1: 0, 
      2: 0, 
      3: 0, 
      4: 0, 
      5: 0, 
      6: 0, 
      7: 0, 
      8: 0, 
      9: 0, 
      10: 0,
      11: 0,
      12: 0,
      13: 0
    }
    return {  
      picture: await app.$vahi.adminLoadPicture(route.params.id)
      .then(function (response) {
        if(response.result === 'ok') {
            if(typeof response.sameEyeOtherPics === 'object') {
              for(let i in response.sameEyeOtherPics) {
                let zones = response.sameEyeOtherPics[i].zones
                for (let z = 1; z < 14; z++) {
                  if(zones[z] === '1') nogo[z]++;
                }
              }
            }
            return response
        } else {
          app.error = true
        }
      })
      .catch(function (error) {
        app.error = true
      }),
      nogo: nogo
    } 
  }
}
</script>

<style scoped>
div.zones {
  max-width: 300px;
  padding: 25px;
}
path.p, circle.p {
  stroke: #000;
  stroke-width: 10px;
  fill: #fff;
}
path.selected, circle.selected {
  fill: green!important;
  fill-opacity: 0.4;
}
path.nogo, circle.nogo {
  fill: none!important;
  stroke: none!important
}
  div.grid-wrapper {
    position: relative;
  }
  .stack {
    position: absolute;
    top: 0;
    left: 0;
  }
  path, circle {
    stroke: #000;
    stroke-width: 5px;
    fill: none;
  }
  ircle.i {
    fill: #000000;
    fill-opacity: 0.2;
    stroke: #000;
    stroke-width: 10;
  }
  ircle.o {
    fill: none;
    stroke: #000;
    stroke-opacity: 0.2;
    stroke-width: 200;
  }
  ircle.e {
    fill: none;
    stroke: #000;
    stroke-width: 10;
  }
  svg:hover {
    cursor: move;
  }
  svg.picker:hover {
    cursor: pointer;
  }
</style>
