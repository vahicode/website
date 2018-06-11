<template>
  <div>
    <h1>{{ $t('eye') }} {{ api.id }}</h1>
    <h4> {{ $t('placeGrid') }}</h4>
    <h6> {{ $t('scale') }}</h6>
     <v-slider max="1" persistent-hint hint="Slide to adjust grid size" v-model="scale" step="0"></v-slider>
    <div class="grid-wrapper mt-5">
      <img class="ack" :src="prefix+'/i/'+api.hash+'.jpg'" ref="picture" />
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
        <path :class="{ 'selected': zones[1]}" d="m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z"></path>
        <path :class="{ 'selected': zones[2]}" d="M 1024.264,175.7363 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z"></path>
        <path :class="{ 'selected': zones[3]}" d="m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z"></path>
        <path :class="{ 'selected': zones[4]}" d="M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z"></path>
        <path :class="{ 'selected': zones[5]}" d="M 317.33398,882.66797 175.73633,1024.2657 A 600,600 0 0 0 600,1200 l 0,-200.00003 a 400,400 0 0 1 -282.66602,-117.332 z"></path>
        <path :class="{ 'selected': zones[6]}" d="M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z"></path>
        <path :class="{ 'selected': zones[7]}" d="M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z"></path>
        <path :class="{ 'selected': zones[8]}" d="M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z"></path>
        <path :class="{ 'selected': zones[9]}" d="m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z"></path>
        <path :class="{ 'selected': zones[10]}"  d="m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z"></path>
        <path :class="{ 'selected': zones[11]}" d="m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z"></path>
        <path :class="{ 'selected': zones[12]}" d="m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"></path>
        <circle class=" i" :class="{ 'selected': zones[13]}" cx="600" cy="600" r="200"></circle>
        <circle class=" o" cx="600" cy="600" r="500"></circle>
        <circle class=" e" cx="600" cy="600" r="400"></circle>
        <circle class=" e" cx="600" cy="600" r="600"></circle>
      </svg>            
       </vue-draggable-resizable>

  </div>
  <div v-if="api.sameEyeOtherPics === false">
    <v-btn large color="primary" @click="savePosition">{{$t('savePicture')}} --</v-btn>
    <v-btn large :to="'/admin/show/eye/'+api.eye"><v-icon class="mr-3">undo</v-icon>{{$t('cancel')}}</v-btn>
  </div>
  <div v-else>
    <h4> {{ $t('selectZonesToRate') }}</h4>
    <div class="zones">
      <svg 
         class="picker"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 1200">
        <path class="p" @click="toggleZone(1)" :class="{ 'selected': zones[1]}" d="m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z"></path>
        <path class="p" @click="toggleZone(2)" :class="{ 'selected': zones[2]}" d="M 1024.264,175.7363 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z"></path>
        <path class="p" @click="toggleZone(3)" :class="{ 'selected': zones[3]}" d="m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z"></path>
        <path class="p" @click="toggleZone(4)" :class="{ 'selected': zones[4]}" d="M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z"></path>
        <path class="p" @click="toggleZone(5)" :class="{ 'selected': zones[5]}" d="M 317.33398,882.66797 175.73633,1024.2657 A 600,600 0 0 0 600,1200 l 0,-200.00003 a 400,400 0 0 1 -282.66602,-117.332 z"></path>
        <path class="p" @click="toggleZone(6)" :class="{ 'selected': zones[6]}" d="M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z"></path>
        <path class="p" @click="toggleZone(7)" :class="{ 'selected': zones[7]}" d="M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z"></path>
        <path class="p" @click="toggleZone(8)" :class="{ 'selected': zones[8]}" d="M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z"></path>
        <path class="p" @click="toggleZone(9)" :class="{ 'selected': zones[9]}" d="m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z"></path>
        <path class="p" @click="toggleZone(10)" :class="{ 'selected': zones[10]}" d="m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z"></path>
        <path class="p" @click="toggleZone(11)"  :class="{ 'selected': zones[11]}" d="m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z"></path>
        <path class="p" @click="toggleZone(12)"  :class="{ 'selected': zones[12]}" d="m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"></path>
        <circle class="p" @click="toggleZone(13)" :class="{ 'selected': zones[13]}" cx="600" cy="600" r="200"></circle>
      </svg>                                     
    </div>                                       
    <v-btn large color="primary" @click="saveZonesAndPosition">{{$t('savePicture')}} ++</v-btn>
    <v-btn large :to="'/admin/show/eye/'+api.eye"><v-icon class="mr-3">undo</v-icon>{{$t('cancel')}}</v-btn>
  </div>                                         
  {{ zones }}
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
export default  {
  layout: 'big',
  components: {
    VueDraggableResizable
  },
  data () {
    return {
      x: 0.25,
      y: 0.15,
      scale: 0.5,
      clientX: 0,
      clientY: 0,
      zones: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false
      }
    } 
  },
  computed: { 
    prefix () {
      return process.env.api
    },
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
    this.clientScale = this.$refs.picture.clientWidth/this.api.width
    this.clientWidth = this.$refs.picture.clientWidth
    this.clientHeight = this.$refs.picture.clientHeight
    this.scale = this.api.scale
    this.initX = this.api.x * this.clientWidth
    this.initY = this.api.y * this.clientHeight
  },
  methods: {
    dragStop: function(x, y) {
      this.x = x/this.clientWidth
      this.y = y/this.clientHeight
    },
    savePosition: function() {
      const self = this
      this.loading = true;
      const ip = this.$axios.$post(process.env.api+'/admin/picture/'+this.api.id, {
        x: this.x,
        y: this.y,
        scale: this.scale
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/show/eye/'+self.api.eye
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
    saveZonesAndPosition: function() {
      const self = this
      const zones = []
      Object.keys(this.zones).forEach(function(zone) {
        if(self.zones[zone]) zones.push(zone)
        else console.log('Not selecting zone '+zone)
      })
      this.loading = true;
      const ip = this.$axios.$post(process.env.api+'/admin/picture/'+this.api.id, {
        x: this.x,
        y: this.y,
        scale: this.scale,
        zones: zones
      })
      .then(function (response) {
        self.loading = false;
        if(response.result === 'ok') {
          self.$router.push({
            path: '/admin/show/eye/'+self.api.eye
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
      const api = await app.$axios.$get(process.env.api+'/admin/picture/'+route.params.id)
  
      return { api: api }  
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
  div.grid-wrapper {
    position: relative;
  }
  .stack {
    position: absolute;
    top: 0;
    left: 0;
  }
  path, circle {
    stroke: none;
    fill: none;
  }
  circle.i {
    fill: #000000;
    fill-opacity: 0.2;
    stroke: #000;
    stroke-width: 10;
  }
  circle.o {
    fill: none;
    stroke: #000;
    stroke-opacity: 0.2;
    stroke-width: 200;
  }
  circle.e {
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
