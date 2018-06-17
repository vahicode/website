<template>
  <section>
    <v-layout row wrap>
      <v-flex md6 class="px-1">
        <span class="body-1">{{ $t('thisEye') }}: {{step-1}}/3</span>
    <v-progress-linear :value="(step-1)*33" class="mt-0" color="success"></v-progress-linear>
      </v-flex>
      <v-flex md6 class="px-1">
        <span class="body-1">{{ $t('overall') }}: {{done}}/{{total}}</span>
    <v-progress-linear :value="(done === 0) ? '0' : total/done" class="mt-0"></v-progress-linear>
      </v-flex>
    </v-layout>
  </section>
</template>

<script>
export default {
  name: 'VahiRatingProgress',
  props: {
    total: {
      type: Number,
      required: true
    },
    done: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      required: true
    },
  }
}
</script>

