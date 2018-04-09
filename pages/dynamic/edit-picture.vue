<template>
  <div>
    <h1>{{ $t('eye') }} {{ api.id }}</h1>
    <h2> {{ $t('placeGrid') }}</h2>
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
        class="stack"
        xmlns="http://www.w3.org/2000/svg" 
        :width="clientWidth*scale" 
        :height="clientWidth*scale" 
        viewBox="0 0 1200 1200">
        <path id="z1" d="m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z"></path>
        <path id="z2" d="M 1024.264,175.7363 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z"></path>
        <path id="z3" d="m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z"></path>
        <path id="z4" d="M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z"></path>
        <path id="z5" d="M 317.33398,882.66797 175.73633,1024.2657 A 600,600 0 0 0 600,1200 l 0,-200.00003 a 400,400 0 0 1 -282.66602,-117.332 z"></path>
        <path id="z6" d="M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z"></path>
        <path id="z7" d="M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z"></path>
        <path id="z8" d="M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z"></path>
        <path id="z9" d="m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z"></path>
        <path id="z10" d="m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z"></path>
        <path id="z11" d="m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z"></path>
        <path id="z12" d="m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"></path>
        <circle class="i" id="z13" cx="600" cy="600" r="200"></circle>
        <circle class="o" cx="600" cy="600" r="500"></circle>
        <circle class="e" cx="600" cy="600" r="400"></circle>
        <circle class="e" cx="600" cy="600" r="600"></circle>
      </svg>
       </vue-draggable-resizable>

  </div>
    <v-btn large color="primary" @click="savePosition">Save position</v-btn>
    <v-btn large :to="'/admin/show/eye/'+api.eye"><v-icon class="mr-3">undo</v-icon>{{$t('cancel')}}</v-btn>

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
      clientY: 0
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
    },
    //clientScale () {
      //return this.$refs.picture.clientWidth/this.api.width
   // }
  },
  mounted: function() {
    this.clientScale = this.$refs.picture.clientWidth/this.api.width
    this.clientWidth = this.$refs.picture.clientWidth
    this.clientHeight = this.$refs.picture.clientHeight
    if(this.api.scale === 0) this.scale = 0.5
    else this.scale = this.api.scale
    if(this.api.x === 0) this.initX = 25
    else this.initX = this.api.x * this.clientWidth
    if(this.api.y === 0) this.initY = 25
    else this.initY = this.api.y * this.clientHeight
    this.initWidth = this.$refs.picture.clientWidth
    this.initHeight = this.$refs.picture.clientHeight
  },
  methods: {
    dump: function() {
      console.log(this.$refs.picture) 
      this.clientScale = this.$refs.picture.clientWidth/this.api.width
      this.clientWidth = this.$refs.picture.clientWidth
      this.clientHeight = this.$refs.picture.clientHeight
      if(this.api.scale === 0) this.scale = 0.5
      else this.scale = this.api.scale
      if(this.api.x === 0) this.clientX = 25
      else this.clientX = this.api.x * this.clientWidth
      if(this.api.y === 0) this.clientY = 25
      else this.clientY = this.api.y * this.clientHeight
      //this.initWidth = this.$refs.picture.clientWidth
      //this.initHeight = this.$refs.picture.clientHeight
      console.log(this.api.x)
      console.log(this.clientX)
    },
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
  },
  asyncData: async function ({ app, route }) {
      const api = await app.$axios.$get(process.env.api+'/admin/picture/'+route.params.id)
      if(api.scale == 0) api.scale = 0.5
      return { api: api }  
  }
}
</script>

<style scoped>
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
</style>
