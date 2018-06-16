<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="width" 
    :height="width" 
    viewBox="0 0 1200 1200">
    <path v-for="(d, i) in paths" :key="i" @click="emit('zone-toggle', i)" :class="classes[i]"  :d="d"></path>
    <circle @click="emit('zone-toggle', 13)" :class="classes[13]" cx="600" cy="600" r="200"></circle>
  </svg>            
</template>

<script>
export default {
  name: 'VahiGrid',
  props: {
    width: {
      type: Number,
      required: true
    },
    classes: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      paths: {
        1: "m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z",
        2: "M 1024.264,175.736 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z",
        3: "m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z",
        4: "M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z",
        5: "M 317.334,882.668 175.736,1024.266 A 600,600 0 0 0 600,1200 l 0,-200 a 400,400 0 0 1 -282.666,-117.332 z",
        6: "M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z",
        7: "M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z",
        8: "M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z",
        9: "m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z",
        10: "m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z",
        11: "m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z",
        12: "m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"
      }
    }
  }
}
</script>

<style >
  path, circle {
    fill: none;
    stroke: #000;
    stroke-width: 5
  }
  path.selected, circle.selected {
    fill: green!important;
    fill-opacity: 0.4;
  }
  path.nogo, circle.nogo {
    fill: none!important;
    stroke: none!important
  }
</style>
