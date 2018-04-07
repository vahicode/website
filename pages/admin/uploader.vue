<template>
  <section class="container">
    <h1>{{ $t('uploadImages') }}</h1>
    <div class="dropzone">
    <h2>{{ $t('dropFilesToUpload') }}</h2>
    <div class="upload">
      <ul v-if="files.length" class="chiplist mt-5 mb-5">
        <li v-for="(file, index) in files" :key="file.id+index">
          <v-chip>
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
          </v-chip>
        </li>
      </ul>

      <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
        <h3>{{ $t('dropFilesToUpload') }}</h3>
      </div>

      <div>
        <v-btn large @click="trigger">
          <v-icon class="mr-3">folder_open</v-icon>
          {{ $t('selectFiles') }}
        </v-btn>
        <file-upload
          :post-action="api+'/admin/upload'"
          :multiple="true"
          :drop="true"
          :drop-directory="true"
          v-model="files"
          ref="upload">
        </file-upload>
        <v-btn large color="primary" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          <v-icon class="mr-3">cloud_upload</v-icon>
          {{ $t('startUpload') }}
        </v-btn>
        <v-btn v-else @click.prevent="$refs.upload.active = false">
          <v-icon>cancel</v-icon>
          {{ $t('stopUpload') }}
        </v-btn>
      </div>
    </div>
</div>
  </section>
</template>

<script>
import VueUploadComponent from 'vue-upload-component'
export default {
  components: {
     FileUpload: VueUploadComponent
   },
  data () {
    return {
      files: [],
      api: process.env.api
    }
  },
  methods: {
    trigger: function() {
      document.getElementById("file").click()
    },
inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }
    },
inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
          return prevent()
        }
      }
 newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },
    submit: function() {
      //const self = this
      //this.loading = true;
      //const ip = this.$axios.$post(process.env.api+'/admin/admin', {
      //  username: this.username,
      //  password: this.password
      //})
      //.then(function (response) {
      //  self.loading = false;
      //  if(response.result === 'ok') {
      //    self.$router.push({
      //      path: '/admin/show/admin/'+response.id
      //    })
      //  } else {
      //    self.error = true
      //  }
      //})
      //.catch(function (error) {
      //  self.loading = false;
      //  self.error = true
      //});
    },
    randomPassword: function() {
      let text = ""
      var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789"
      for (var i = 0; i < 12; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      this.password = text
    }
  }
}
</script>

<style scoped>
ul.chiplist li {
  list-style-type: none;
  display: inline-block;
}
.dropzone {
  border: 1px dashed #ccc;
  padding: 1rem;
  padding-top: 100px;
  text-align: center;
  border-radius: 0.25rem;
  min-height: 600px;
}
.dropzone label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
.dropzone .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.dropzone .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
