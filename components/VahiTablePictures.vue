<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="pictures"
      :pagination.sync="pagination"
      select-all
      must-sort
      class="elevation-1"
      v-model="selected"
      :rows-per-page-items="[10,25,50,{text: $t('all'),value:-1}]"
      :rows-per-page-text="$t('rowsPerPage')"
    >
      <template slot="items" slot-scope="props">
        <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>
        <td>
          <nuxt-link :to="$vahi.path('/admin/edit/picture/'+props.item.hash)">
            {{ props.item.id }}
          </nuxt-link>
        </td>
        <td>
          <nuxt-link :to="$vahi.path('/admin/edit/eye/'+props.item.eye)">
            {{ props.item.eye }}
          </nuxt-link>
        </td>
        <td>
          <nuxt-link :to="'/admin/edit/picture/'+props.item.hash">
            <img :src="$vahi.eyeSrc(props.item.hash)" class="elevation-3"/>
          </nuxt-link>
        </td>
        <td v-for="n in 13" class="zone" :key="'zone'+n" :class="(props.item['zone'+n] === '1') ? 'active' : 'inactive'"></td>
        <td>
          <v-icon v-if="$vahi.pictureIsCalibrated(props.item)" color="success">check_circle</v-icon>
          <v-icon v-else color="warning">panorama_fish_eye</v-icon>
        </td>
        <td>
          <nuxt-link :to="$vahi.path('/admin/edit/admin/'+props.item.admin)">
            {{ props.item.adminname }}
          </nuxt-link>
        </td>
      </template>
      <template slot="pageText" slot-scope="props">
        {{ $t('rowsFromToOfTotal', {from: props.pageStart, to: props.pageStop, total: props.itemsLength}) }}
      </template>
      <template slot="no-data">
        <blockquote class="warning vahi-m600 vahi-bq mt-5 mb-5">
          <h3>{{ $t('noPicturesFound') }}</h3>
        </blockquote>
      </template>
    </v-data-table>
    <div v-if="selected.length > 0"  class="mt-3">
      <v-btn color="error" :disabled="loading && !removing" @click="bulkDeletePictures()">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading || removing">{{ selected.length }}</span>
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">delete</v-icon>{{ $t('delete') }}
        </v-badge>
      </v-btn>
    </div>
  </section>
</template>

<script>

export default {
  name: 'VahiTablePictures',
  props: {
    pictures: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: ' #', value: 'id', align: 'center' },
        { text: ' '+this.$t('eye'), value: 'eye', align: 'center' },
        { text: ' '+this.$t('picture'), value: 'hash', sortable: false },
        { text:  1, value:  'zone1', sortable: false, class: 'zone', align: 'center'},
        { text:  2, value:  'zone2', sortable: false, class: 'zone', align: 'center'},
        { text:  3, value:  'zone3', sortable: false, class: 'zone', align: 'center'},
        { text:  4, value:  'zone4', sortable: false, class: 'zone', align: 'center'},
        { text:  5, value:  'zone5', sortable: false, class: 'zone', align: 'center'},
        { text:  6, value:  'zone6', sortable: false, class: 'zone', align: 'center'},
        { text:  7, value:  'zone7', sortable: false, class: 'zone', align: 'center'},
        { text:  8, value:  'zone8', sortable: false, class: 'zone', align: 'center'},
        { text:  9, value:  'zone9', sortable: false, class: 'zone', align: 'center'},
        { text: 10, value: 'zone10', sortable: false, class: 'zone', align: 'center'},
        { text: 11, value: 'zone11', sortable: false, class: 'zone', align: 'center'},
        { text: 12, value: 'zone12', sortable: false, class: 'zone', align: 'center'},
        { text: 13, value: 'zone13', sortable: false, class: 'zone', align: 'center'},
        { text: ' '+this.$t('calibrated'), value: 'calibrated' },
        { text: ' '+this.$t('addedBy'), value: 'adminname' },
      ],
      selected: [],
      loading: false,
      removing: false,
      pagination: {
        sortBy: 'id',
        descending: true
      },
    }
  },
  methods: {
    selectedAsArray: function() {
      let pictures = []
      for(let i in this.selected) {
        if(this.selected[i].id !== '1') pictures.push(this.selected[i].id)
      }
      return pictures
    },
    bulkDeletePictures: function() {
      this.loading = true
      this.removing = true
      this.$vahi.adminBulkRemovePictures({pictures: this.selectedAsArray()})
      .then((result) => {
        this.loading = false
        this.removing = false
        this.deleteConfirmation = false
        for (let i in this.selected) {
          this.selected[i] = undefined
        }
        this.selected = []
      })
      .catch((error) => { this.error = true })
    },
  }
}
</script>

<style>
table.table img {
  max-height: 100px;
  float: left;
  padding: 4px;
  margin: 4px;
}
table.table thead th.zone:not(:nth-child(1)) {
  padding: 0 2px!important;
}
td.zone.active {
  background: #4caf5044 ;
}
td.zone.inactive {
}
</style>
