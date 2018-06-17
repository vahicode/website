<template>
    <svg 
      :style="'top: '+y+'px; left: '+x+'px;'"
      id="eye"
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:svg="http://www.w3.org/2000/svg" 
      :width="width"
      :height="width"
      viewBox="0 0 1200 1200" 
      :class="flash">
        <template v-for="(d, index) in paths">
            <path v-if="zones[index]" :key="'path-'+index" :d="d" @click="emitToggle(index)" :class="'rated-'+rating[index]" />
        </template> 
        <circle v-if="zones[13]" @click="emitToggle(13)" cx="600" cy="600" r="200" :class="'rated-'+rating[13]" />
        <template v-for="(t, index) in text">
            <text v-if="zones[index]" :key="'text-'+index" :x="t.x" :y="t.y" @click="emitToggle(index)">
                {{ rating[index] }}
            </text>
        </template> 
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
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      },
      rating: {
        type: Object,
        required: true
      },
      zones: {
        type: Object,
        required: true
      },
    },
    methods: {
        emitToggle: function(zone) {
            this.flash = 'flash';
            this.$emit('toggle', zone);
            let self = this;
            window.setTimeout(function(){
                self.flash = '';
            }, 500);
        },
    },
    data() {
        return {
            flash: '',
            text: {
                1:  { x:  770, y:  180 },
                2:  { x: 1070, y:  450 },
                3:  { x: 1070, y:  810 },
                4:  { x:  770, y: 1100 },
                5:  { x:  420, y: 1100 },
                6:  { x:  140, y:  810 },
                7:  { x:  140, y:  450 },
                8:  { x:  440, y:  180 },
                9:  { x:  600, y:  340 },
                10: { x:  890, y:  630 },
                11: { x:  600, y:  940 },
                12: { x:  300, y:  630 },
                13: { x:  600, y:  630 }
            },
            paths: {
                1:  "m 600,0 0,200 A 400,400 0 0 1 882.66,317.334 L 1024.264,175.736 A 600,600 0 0 0 600,0 Z",
                2:  "M 1024.264,175.736 882.666,317.334 A 400,400 0 0 1 1000,600 l 200,0 A 600,600 0 0 0 1024.264,175.736 Z",
                3:  "m 1000,600 a 400,400 0 0 1 -117.334,282.668 L 1024.264,1024.266 A 600,600 0 0 0 1200,600 l -200,0 z",
                4:  "M 882.666,882.668 A 400,400 0 0 1 600,1000 L 600,1200 a 600,600 0 0 0 424.264,-175.734 L 882.666,882.668 Z",
                5:  "M 317.33398,882.668 175.736,1024.266 A 600,600 0 0 0 600,1200 l 0,-200 a 400,400 0 0 1 -282.666,-117.332 z",
                6:  "M 0,600 A 600,600 0 0 0 175.736,1024.266 L 317.334,882.668 A 400,400 0 0 1 200,600 l -200,0 z",
                7:  "M 175.736,175.736 A 600,600 0 0 0 0,600 L 200,600 A 400,400 0 0 1 317.334,317.334 L 175.736,175.736 Z",
                8:  "M 600,0 A 600,600 0 0 0 175.736,175.736 L 317.334,317.334 A 400,400 0 0 1 600,200 L 600,0 Z",
                9:  "m 458.579,458.58 a 200,200 0 0 1 282.843,0 L 882.843,317.158 a 400,400 0 0 0 -565.685,0 l 141.421,141.421 z",
                10: "m 741.421,458.58 a 200,200 0 0 1 0,282.843 l 141.421,141.421 a 400,400 0 0 0 0,-565.685 L 741.421,458.58 Z",
                11: "m 741.422,741.422 a 200,200 0 0 1 -282.843,0 l -141.421,141.421 a 400,400 0 0 0 565.685,0 L 741.422,741.422 Z",
                12: "m 458.579,741.422 a 200,200 0 0 1 0,-282.843 L 317.157,317.158 a 400,400 0 0 0 0,565.685 l 141.421,-141.421 z"
            }
        } 
    }
}
</script>

<style>
    path,
    circle {
        fill: #fff; 
        fill-opacity: 0.1;
        stroke: #000; 
        stroke-opacity: 0.5;
        stroke-width: 9px; 
        transition: fill-opacity 0.4s;
    }
    path:hover,
    circle:hover {
        cursor: pointer;
        stroke-width: 9px;
        stroke-opacity: 1;
    }
    path.rated-0, circle.rated-0 {
        stroke: #228B22; 
        fill: #228B22; 
    }
    path.rated-1, circle.rated-1 {
        stroke: #CDBB32; 
        fill: #CDBB32; 
    }
    path.rated-2, circle.rated-2 {
        stroke: #FF9000; 
        fill: #FF9000; 
    }
    path.rated-3, circle.rated-3 {
        stroke: #FF2D00; 
        fill: #FF2D00; 
    }
    text {
        font-size: 120px; 
        fill: #fff;
        stroke: none;
        font-family: $font-family-base;
        text-anchor: middle;
        transition: fill-opacity 0.4s;
    }
    text:hover {
        cursor: pointer;
    }
    #eye {position: absolute;}
    #eye text { fill-opacity: 0; }
    #eye path, #eye circle { fill-opacity: 0; }
    #legend path, #legend circle { fill-opacity: 1; stroke-width: 0;}
    #eye.flash path, #eye.flash circle, #eye.flash text {fill-opacity: 0.5; transition: fill-opacity 0s;}
    #eye.flash text, #eye.flash circle{ display: initial;}
</style>
