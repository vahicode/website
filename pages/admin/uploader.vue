<template>
  <vahi-wrapper-admin-required>
    <h1>{{ $t('uploadImages') }}</h1>
    <div class="dropzone">
      <h2>{{ $t('dropFilesToUpload') }}</h2>
      <div class="upload">
        <ul v-if="files.length" class="chiplist mt-5 mb-5">
          <li v-for="(file, index) in files" :key="file.id+index">
            <v-chip>
              <v-avatar v-if="file.error" class="error"><v-icon dark>error_outline</v-icon></v-avatar>
              <v-avatar v-else-if="file.success" class="success"><v-icon dark>check</v-icon></v-avatar>
              <v-avatar v-else-if="file.active" class="info"><v-icon dark>cloud_upload</v-icon></v-avatar>
              <v-avatar v-else class="primary"><v-icon dark>remove_red_eye</v-icon></v-avatar>
              {{file.name}} 
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
            :post-action="api+'/admin/pictures'"
            :multiple="true"
            :drop="true"
            :drop-directory="false"
            v-model="files"
            :headers="{authorization: 'Bearer '+$vahi.getToken()}"
            ref="upload">
          </file-upload>
          <v-btn large color="primary" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            <v-icon class="mr-3">cloud_upload</v-icon>
            {{ $t('startUpload') }}
          </v-btn>
          <v-btn large v-else @click.prevent="$refs.upload.active = false">
            <v-icon class="mr-3">cancel</v-icon>
            {{ $t('stopUpload') }}
          </v-btn>
        </div>
      </div>
    </div>
  </vahi-wrapper-admin-required>
</template>

<script>
import VueUploadComponent from 'vue-upload-component'
import VahiWrapperAdminRequired from '~/components/VahiWrapperAdminRequired'
export default {
  components: {
     FileUpload: VueUploadComponent,
     VahiWrapperAdminRequired
   },
  data () {
    return {
      files: [],
      api: process.env.VAHI_API || 'https://api.vahi.eu'

    }
  },
  methods: {
    getHeader: () => {
    return {authorization: 'Bearer: '+this.$vahi.getToke()}
    },
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
