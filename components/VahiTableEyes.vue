<template>
  <section>
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
      @input="ratingCount()"
    >
      <template slot="items" slot-scope="props">
        <td><v-checkbox primary hide-details v-model="props.selected"></v-checkbox></td>
        <td>
          <nuxt-link :to="$vahi.path('/admin/edit/eye/'+props.item.id)">
            {{ props.item.id }}
          </nuxt-link>
        </td>
        <td>
          <nuxt-link v-for="pic in props.item.pictures" :key="pic.id" :to="'/admin/edit/picture/'+pic.hash">
            <img :src="$vahi.eyeSrc(pic.hash)" class="elevation-3"/>
          </nuxt-link>
        </td>
        <td>{{ props.item.notes }}</td>
        <td>
          <v-icon v-if="$vahi.eyeIsCalibrated(props.item)" color="success">check_circle</v-icon>
          <v-icon v-else color="warning">panorama_fish_eye</v-icon>
        </td>
        <td>
          <v-icon v-if="props.item.active === '1'" color="success">check_circle</v-icon>
          <v-icon v-else color="warning">panorama_fish_eye</v-icon>
        </td>
      </template>
      <template slot="pageText" slot-scope="props">
        {{ $t('rowsFromToOfTotal', {from: props.pageStart, to: props.pageStop, total: props.itemsLength}) }}
      </template>
      <template slot="no-data">
        <blockquote class="warning vahi-m600 vahi-bq mt-5 mb-5">
          <h3>{{ $t('noEyesFound') }}</h3>
        </blockquote>
      </template>
    </v-data-table>
    <blockquote v-if="deleteConfirmation">
      <h3>{{ $t('deleteEyes-title') }}</h3>
      <p>{{ $t('deleteEyes-msg1') }}</p>
      <ul>
        <li>{{ $t('eyes') }}: {{selected.length}}</li>
        <li>{{ $t('ratings') }}: {{ratings}}{{ratingCount()}}</li>
      </ul>
      <p>
        <v-btn color="error" :disabled="loading && !removing" @click="bulkDeleteEyes()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">delete</v-icon>{{ $t('onlyDeleteEyes') }}
        </v-btn>
        <v-btn color="error" :disabled="loading && !removing" @click="bulkDeleteEyesAndRatings()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <div v-else>
            <v-icon>delete</v-icon>
            <v-icon class="mr-3">delete</v-icon>{{ $t('deleteEyesAndRatings') }}
          </div>
        </v-btn>
        <v-btn color="primary" @click="deleteConfirmation=false">
          <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
        </v-btn>
      </p>
    </blockquote>
    <blockquote v-if="bulkNotes">
      <h6> {{ $t('notes') }}</h6>
        <v-text-field 
          :label="$t('notes')"
          v-model="notes"
          textarea
        ></v-text-field>
      <p>
        <v-btn color="primary" :disabled="loading" @click="bulkSetEyeNotes()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="loading" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">save</v-icon>{{ $t('saveNotes') }}
        </v-btn>
        <v-btn color="primary" @click="bulkNotes=false">
          <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
        </v-btn>
      </p>
    </blockquote>
    <div v-if="selected.length > 0 && !deleteConfirmation && !bulkNotes" class="mt-3">
      <v-btn color="error" :disabled="loading && !removing" @click="deleteConfirmation=true">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading">{{ selected.length }}</span>
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">delete</v-icon>{{ $t('delete') }}
        </v-badge>
      </v-btn>
      <v-btn color="success" :disabled="loading" @click="bulkNotes=true">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading">{{ selected.length }}</span>
          <v-icon class="mr-3">edit</v-icon>{{ $t('setNotes') }}
        </v-badge>
      </v-btn>
      <v-btn color="warning" :disabled="loading" @click="bulkDetachEyePictures()">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading">{{ selected.length }}</span>
          <v-icon class="mr-3">lock_open</v-icon>{{ $t('detachPictures') }}
        </v-badge>
      </v-btn>
    </div>
  </section>
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
        { text: ' '+this.$t('active'), value: 'active' },
      ],
      selected: [],
      loading: false,
      removing: false,
      bulkNotes: false,
      ratings: 0,
      notes: '',
      deleteConfirmation: false,
      pagination: {
        sortBy: 'id',
        descending: true
      },
    }
  },
  methods: {
    selectedAsArray: function() {
      let eyes = []
      for(let i in this.selected) {
        if(this.selected[i].id !== '1') eyes.push(this.selected[i].id)
      }
      return eyes
    },
    ratingCount: function() {
      this.$vahi.adminCountRatings({ eyes: this.selectedAsArray() })
      .then((result) => {
        this.ratings = result.count
      })
      .catch((error) => { this.error = true })
    },
    bulkDeleteEyes: function() {
      this.loading = true
      this.removing = true
      this.$vahi.adminBulkRemoveEyes({eyes: this.selectedAsArray()})
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
    bulkDeleteEyesAndRatings: function() {
      this.loading = true
      this.removing = true
      this.$vahi.adminBulkRemoveEyesAndRatings({eyes: this.selectedAsArray()})
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
    bulkSetEyeNotes: function() {
      this.loading = true
      this.$vahi.adminBulkSetEyeNotes({eyes: this.selectedAsArray(), notes: this.notes})
      .then((result) => {
        this.loading = false
        this.bulkNotes = false
        this.selected = []
      })
      .catch((error) => { this.loading = false; this.error = true })
    },
    bulkDetachEyePictures: function() {
      this.loading = true
      this.$vahi.adminBulkDetachEyePictures({eyes: this.selectedAsArray()})
      .then((result) => {
        this.loading = false
        this.bulkNotes = false
        this.selected = []
      })
      .catch((error) => { this.loading = false; this.error = true })
    },
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
