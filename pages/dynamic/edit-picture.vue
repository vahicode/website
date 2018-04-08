<template>
  <div>
    <h1>{{ $t('eye') }} {{ api.id }}</h1>
    <h2> {{ $t('placeGrid') }}</h2>
    <h6> {{ $t('scale') }}</h6>
     <v-slider max="1" persistent-hint hint="Slide to adjust grid size" v-model="api.scale" step="0"></v-slider>
    <div class="grid-wrapper mt-5">
      <img class="stack" :src="prefix+'/i/'+api.hash+'.jpg'"/>
       <vue-draggable-resizable :resizable="false" v-on:dragstop="dragStop">
      <svg 
        class="stack"
        xmlns="http://www.w3.org/2000/svg" 
        :width="1200*api.scale" 
        :height="1200*api.scale" 
        viewBox="0 0 1200 1200">
        <path d="m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z"></path>
        <path d="M 1024.264,175.7363 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z"></path>
        <path d="m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z"></path>
        <path d="M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z"></path>
        <path d="M 317.33398,882.66797 175.73633,1024.2657 A 600,600 0 0 0 600,1200 l 0,-200.00003 a 400,400 0 0 1 -282.66602,-117.332 z"></path>
        <path d="M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z"></path>
        <path d="M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z"></path>
        <path d="M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z"></path>
        <path d="m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z"></path>
        <path d="m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z"></path>
        <path d="m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z"></path>
        <path d="m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"></path>
        <circle cx="600" cy="600" r="200" class="rated-0"></circle>
      </svg>
       </vue-draggable-resizable>

  </div>
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
      valid: false,
      roles: ['disabled','admin','superadmin'],
      changePassword: false,
      password: '',
      loading: false,
      error: false,
      remove: false
    }
  },
  computed: { 
    prefix () {
      return process.env.api
    },
  },
  methods: {
    dragStop: function(x, y) {
      console.log('drag stopped')
      console.log('X is '+x)
      console.log('Y is '+y)
    }
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
</style>
