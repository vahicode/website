<template>
  <section>
    <vahi-grid :width="(500)" :classes="classes" /> 
    rate eye here
  </section>
</template>

<script>
import VahiGrid from '~/components/VahiGrid'

export default {
  name: 'VahiRateEye',
  components: {
    VahiGrid
  },
  props: {
    eye: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      classes: {
        1: 'rate-0',
        2: 'rate-1',
        3: 'rate-2',
        4: 'rate-3',
        5: '',
        6: 'selected',
        7: 'nogo',
        8: '',
        9: '',
        10: '',
        11: '',
        12: '',
        13: ''
      }
    }
  }
}
</script>
