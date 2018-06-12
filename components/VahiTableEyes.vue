<template>
  <v-data-table
    :headers="headers"
    :items="eyes"
    :pagination.sync="pagination"
    select-all
    must-sort
    class="elevation-1"
    v-model="selected"
    :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
    :rows-per-page-text="$t('rowsPerPage')"
    @input="updateSelectedModels()"
  >
    <template slot="items" slot-scope="props">
      <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>
      <td>
        <nuxt-link :to="$vahi.path('/admin/eyes/'+props.item.id)">
          {{ props.item.id }}
        </nuxt-link>
      </td>
      <td>
        <nuxt-link v-for="pic in props.item.pictures" :key="pic.id" :to="'/admin/pictures/'+pic.hash">
          <img :src="$vahi.eyeSrc(pic.hash)" class="elevation-3"/>
        </nuxt-link>
      </td>
      <td>{{ props.item.notes }}</td>
      <td>
        <v-icon v-if="$vahi.eyeIsCalibrated(props.item)" color="success">check_circle</v-icon>
        <v-icon v-else color="warning">panorama_fish_eye</v-icon>
      </td>
      <td>{{ props.item.login }}</td>
    </template>
    <template slot="pageText" slot-scope="props">
      {{ $t('rowsFromToOfTotal', {from: props.pageStart, to: props.pageStop, total: props.itemsLength}) }}
    </template>
    <template slot="no-data">
      <blockquote class="warning vahi-m600 vahi-bq mt-5 mb-5">
        <h3>{{ $t('noUsersFound') }}</h3>
      </blockquote>
    </template>
  </v-data-table>
</template>

<script>

export default {
  name: 'VahiTableEyes',
  props: {
    eyes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: ' #', value: 'id', align: 'center' },
        { text: ' '+this.$t('pictures'), value: 'picture' },
        { text: ' '+this.$t('notes'), value: 'notes' },
        { text: ' '+this.$t('calibrated'), value: 'calibrated' },
      ],
      selected: [],
      pagination: {
        sortBy: 'id',
        descending: true
      },
    }
  },
  methods: {
    updateSelectedModels() {
      this.$store.commit('setSelectedModels', this.selected )
    }
  }
}
</script>

<style scoped>
img {
  max-height: 100px;
  float: left;
  padding: 4px;
  margin: 4px;
}
</style>
