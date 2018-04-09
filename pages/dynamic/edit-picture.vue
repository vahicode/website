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
        xmlns="http://www.w3.org/2000/svg" 
        :width="clientWidth*scale" 
        :height="clientWidth*scale" 
        viewBox="0 0 1200 1200">
        <circle class="i" cx="600" cy="600" r="200"></circle>
        <circle class="o" cx="600" cy="600" r="500"></circle>
        <circle class="e" cx="600" cy="600" r="400"></circle>
        <circle class="e" cx="600" cy="600" r="600"></circle>
      </svg>
       </vue-draggable-resizable>

  </div>
    <v-btn large color="primary" @click="savePosition">Save position</v-btn>
    <!--<v-btn large :to="'/admin/show/eye/'+api.eye"><v-icon>cancel</v-icon>{{$('cancel')}}</v-btn>-->

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
    fill: none;
    stroke: #00000099;
    stroke-width: 10px;
  }
  svg:hover {
    cursor: move;
  }
  circle.i, path.o {
    fill: #000;
    fill-opacity: 0.2;
  }
  circle.o {
    stroke: #000;
    stroke-opacity: 0.2;
    stroke-width: 200;
  }
</style>
