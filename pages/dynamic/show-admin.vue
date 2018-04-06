<template>
  <div>
    <h1>{{ $t('admin.edit.admins.title') }} {{ api.username }}</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th class="key">{{ $t('admin.edit.admins.prop') }}</th>
          <th class="val">{{ $t('admin.edit.admins.value') }}</th>
        </tr>
      </thead>
    <tbody>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.id') }}</td>
        <td class="val">{{ api.adminid }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.username') }}</td>
        <td class="val">{{ api.username }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.role') }}</td>
        <td class="val">{{ api.role }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.userid') }}</td>
        <td class="val">{{ api.id }}</td>
      </tr>
      <tr>
        <td class="key">{{ $t('login.field') }}</td>
        <td class="val"><pre>{{ api.invite }}</pre></td>
      </tr>
      <tr>
        <td class="key">{{ $t('admin.edit.admins.notes') }}</td>
        <td class="val">{{ api.notes }}</td>
      </tr>
    </tbody>
    </table>
    <p class="text-xs-right">
    <v-btn color="primary" :to="'/admin/edit/admin/'+api.adminid">
      <v-icon class="mr-3">edit</v-icon> Edit admin
    </v-btn>
    <v-btn :to="'/admin/edit/user/'+api.id">
      <v-icon class="mr-3">edit</v-icon> Edit linked user
    </v-btn>
    </p>
  </div>
</template>

<script>
export default  {
  asyncData: async function ({ app, route }) {
    return { 
      api: await app.$axios.$get(process.env.api+'/admin/admin/'+route.params.id)
      .then(function (response) {
        if(response.result === 'ok') {
            return response
        } else {
          self.error = true
        }
      })
      .catch(function (error) {
        self.error = true
      })
    }
  }
}
</script>

<style scoped>
  table.table thead th.key {
    text-align: right;
    font-size: 1rem;
  }
  table.table thead th.val {
    text-align: left;
    font-size: 1rem;
  }
  table.table tbody td.key {
    font-weight: bold;
    max-width: 150px;
    text-align: right;
    font-size: 0.8rem;
  }
  table.table tbody td.val {
    font-size: 0.8rem;
  }
</style>
