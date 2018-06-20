<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="users"
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
          <nuxt-link :to="$vahi.path('/admin/edit/user/'+props.item.id)">
            {{ props.item.id }}
          </nuxt-link>
        </td>
        <td :class="(props.item.id === '1') ? 'warning' : ''">
          <nuxt-link :to="$vahi.path('/admin/edit/user/'+props.item.id)">
            <big><pre>{{ props.item.invite }}</pre></big>
          </nuxt-link>
        </td>
        <td>{{ props.item.notes }}</td>
        <td>
          <v-icon v-if="props.item.active === '1'" color="success">check_circle</v-icon>
          <v-icon v-else color="warning">panorama_fish_eye</v-icon>
        </td>
        <td>{{ props.item.login }}</td>
        <td><nuxt-link :to="'/admin/show/admin/'+props.item.admin">{{ props.item.adminname }}</nuxt-link></td>
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
    <blockquote v-if="deleteConfirmation" class="arning">
      <h3>{{ $t('deleteUsers-title') }}</h3>
      <p>{{ $t('deleteUsers-msg1') }}</p>
      <ul>
        <li>{{ $t('users') }}: {{selected.length}}</li>
        <li>{{ $t('ratings') }}: {{ratings}}{{ratingCount()}}</li>
      </ul>
      <p>
        <v-btn color="error" :disabled="loading && !removing" @click="bulkDeleteUsers()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">delete</v-icon>{{ $t('onlyDeleteUsers') }}
        </v-btn>
        <v-btn color="error" :disabled="loading && !removing" @click="bulkDeleteUsersAndRatings()">
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <div v-else>
            <v-icon>delete</v-icon>
            <v-icon class="mr-3">delete</v-icon>{{ $t('deleteUsersAndRatings') }}
          </div>
        </v-btn>
        <v-btn color="primary" @click="deleteConfirmation=false">
          <v-icon class="mr-3">cancel</v-icon>{{ $t('cancel') }}
        </v-btn>
      </p>
      <p class="body-1"><v-icon small class="mr-2" color="warning">warning</v-icon>{{ $t('deleteUsers-msg2') }}</p>
    </blockquote>
    <div v-if="selected.length > 0" class="mt-3">
      <v-btn color="error" :disabled="loading && !removing" @click="deleteConfirmation=true" v-if="!deleteConfirmation">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading || removing">{{ selected.length }}</span>
          <v-progress-circular indeterminate color="#fff" class="mr-3" v-if="removing" :size="20" :width="2"></v-progress-circular>
          <v-icon v-else class="mr-3">delete</v-icon>{{ $t('delete') }}
        </v-badge>
      </v-btn>
      <v-btn color="success" :disabled="loading && !activating" @click="bulkActivate(true)">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading || activating">{{ selected.length }}</span>
          <v-icon class="mr-3">play_circle_outline</v-icon>{{ $t('activate') }}
        </v-badge>
      </v-btn>
      <v-btn color="warning" :disabled="loading && !deactivating" @click="bulkActivate(false)">
        <v-badge left color="accent" value="1"><span slot="badge" v-if="!loading || deactivating">{{ selected.length }}</span>
          <v-icon class="mr-3">pause_circle_outline</v-icon>{{ $t('deactivate') }}
        </v-badge>
      </v-btn>
    </div>
  </section>
</template>

<script>

export default {
  name: 'VahiTableUsers',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      headers: [
        { text: ' #', value: 'id', align: 'center' },
        { text: ' '+this.$t('inviteCode'), value: 'invite' },
        { text: ' '+this.$t('notes'), value: 'notes' },
        { text: ' '+this.$t('active'), value: 'active' },
        { text: ' '+this.$t('lastLogin'), value: 'login' },
        { text: ' '+this.$t('addedBy'), value: 'adminname' },
      ],
      selected: [],
      pagination: {
        sortBy: 'id',
        descending: true
      },
      removing: false,
      activating: false,
      deactivating: false,
      loading: false,
      deleteConfirmation: false,
      ratings: 0
    }
  },
  methods: {
    bulkActivate: function(value) {
      this.loading = true
      this.activating = true
      this.$vahi.adminBulkActivateUsers(this.selected, value)
      .then((result) => {
        this.loading = false
        this.activating = false
        this.deactivating = false
        for (let i in this.selected) {
          this.selected[i].active = (value) ? '1' : '0'
        }
        this.selected = []
      })
      .catch((error) => { this.error = true })
    },
    selectedAsArray: function() {
      let users = []
      for(let i in this.selected) {
        if(this.selected[i].id !== '1') users.push(this.selected[i].id)
      }
      return users
    },
    ratingCount: function() {
      this.$vahi.adminCountRatings({ users: this.selectedAsArray() })
      .then((result) => {
        this.ratings = result.count
      })
      .catch((error) => { this.error = true })
    },
    bulkDeleteUsers: function() {
      this.loading = true
      this.removing = true
      console.log('in method comp')
      this.$vahi.adminBulkRemoveUsers({users: this.selectedAsArray()})
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
    bulkDeleteUsersAndRatings: function() {
      this.loading = true
      this.removing = true
      console.log('in method component')
      this.$vahi.adminBulkRemoveUsersAndRatings({users: this.selectedAsArray()})
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
