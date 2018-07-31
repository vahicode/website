import Vue from 'vue'
import axios from 'axios'
import Storage from './storage'
import Conf from './config'

export default ({ app, store, route }, inject) => {

  const storage = new Storage()
  const ax = {
    data: axios.create({
      baseURL: process.env.VAHI_API || 'https://api.vahi.eu',
      timeout: 5000
    })
  }

  const setToken = (token) => {
    return storage.set('token', token)
  }

  const token = () => {
    return storage.get('token')
  }

  const pathLocaleMethod = (path) => {
    for(let i in Conf.i18n.locales.enabled) {
      let loc = Conf.i18n.locales.enabled[i]
      if ('/'+loc+'/' === path.substr(0,4)) return loc
    }
    return 'en'
  }

  inject('vahi', new Vue({
    methods: {
      // Async methods (thenable)
      adminLogin(data) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/login', data)
            .then((res) => {
              if(res.data.result === 'ok') {
                setToken(res.data.token)
                store.dispatch('adminLogin', {
                  id: res.data.admin,
                  isSuperAdmin: res.data.superadmin
                })
                resolve(res.data)
              } else {
                reject(res.data)
              }
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      login(invite) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/login', {invite})
            .then((res) => {
              // Remove data for potention admin login
              setToken('')
              store.dispatch('adminLogout')
              // Then create user data
              setToken(res.data.token)
              store.dispatch('userLogin', {id: res.data.id})
              resolve(res.data)
            })
          .catch((error) => { reject(error.response.data) })
        })
      },

      auth() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/account', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              if(typeof res.data === 'object' && res.data.result === 'ok') {
                if(res.data.isAdmin) {
                    store.dispatch('adminLogin', {
                      id: res.data.admin,
                      isSuperAdmin: res.data.superadmin
                    })
                } else {
                    store.dispatch('userLogin', {id: res.data.id})
                }
                resolve(true)
              }
            })
            .catch((res) => {
              store.dispatch('ejectAccount', {})
              console.log('Authentication failed | plugin')
              resolve(false)
            })
        })
      },

      adminLoadUsers() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/users', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadPictures() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/pictures', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadAdmins() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/admins', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadEyes() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/eyes', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadOrphanPictures() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/pictures/orphans', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadUser(id) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/user/'+id, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadAdmin(id) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/admin/'+id, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadEye(id) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/eye/'+id, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminLoadPicture(id) {
        return new Promise(function(resolve, reject) {
          ax.data.get('/admin/picture/'+id, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminUpdateUser(id, payload) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/admin/user/'+id, payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminUpdateAdmin(id, payload) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/admin/admin/'+id, payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminUpdateEye(id, payload) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/admin/eye/'+id, payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminUpdatePicture(hash, payload) {
        return new Promise(function(resolve, reject) {
          ax.data.put('/admin/picture/'+hash, payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminDeleteUser(id) {
        return new Promise(function(resolve, reject) {
          ax.data.delete('/admin/user/'+id, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBundlePictures(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/eyes/bundle', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminAssignPictures(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/eyes/assign', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminAddUsers(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/users', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminAddEyes(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/eyes', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminAddAdmin(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/admin', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkActivateUsers(users, value=true) {
        return new Promise(function(resolve, reject) {
          const promises = []
          for( let i in users) {
            let user = users[i]
            promises.push(
              ax.data.put(
                '/admin/user/'+user.id,
                { active: value},
                { headers: {'Authorization': 'Bearer '+storage.get('token')} }
              )
            )
          }
          Promise.all(promises)
            .then(() => {
              resolve(true)
            })
          .catch(() => { reject(false) })
        })
      },

      adminBulkRemoveUsers(users) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/bulk/delete/users', users, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkRemoveRatings(users) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/bulk/delete/ratings', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkRemoveUsersAndRatings(users) {
        return new Promise(function(resolve, reject) {
          const promises = []
          promises.push(ax.data.post('/admin/bulk/delete/users', users, { headers: {'Authorization': 'Bearer '+storage.get('token')} }))
          promises.push(ax.data.post('/admin/bulk/delete/ratings', users, { headers: {'Authorization': 'Bearer '+storage.get('token')} }))
          Promise.all(promises)
            .then(() => {
              resolve(true)
            })
          .catch(() => { reject(false) })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkRemovePictures(pictures) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/bulk/delete/pictures', pictures, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkRemoveEyes(eyes) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/bulk/delete/eyes', eyes, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkRemoveEyesAndRatings(eyes) {
        return new Promise(function(resolve, reject) {
          const promises = []
          promises.push(ax.data.post('/admin/bulk/delete/eyes', eyes, { headers: {'Authorization': 'Bearer '+storage.get('token')} }))
          promises.push(ax.data.post('/admin/bulk/delete/ratings', eyes, { headers: {'Authorization': 'Bearer '+storage.get('token')} }))
          Promise.all(promises)
            .then(() => {
              resolve(true)
            })
          .catch(() => { reject(false) })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkSetEyeNotes(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/bulk/eyes/notes', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminBulkDetachEyePictures(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/bulk/eyes/detach', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      loadRating() {
        return new Promise(function(resolve, reject) {
          ax.data.get('/rating', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      addRating(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/rating', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      adminCountRatings(payload) {
        return new Promise(function(resolve, reject) {
          ax.data.post('/admin/ratings/count', payload, { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      resetDemo() {
        return new Promise(function(resolve, reject) {
          ax.data.delete('/rating/demo', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
            .then((res) => {
              resolve(res.data)
            })
          .catch((error) => { reject(error) })
        })
      },

      // Sync methods
      logout() {
        setToken('')
        store.dispatch('userLogout')
      },

      adminLogout() {
        setToken('')
        store.dispatch('adminLogout')
      },

      camelCase(input) {
        return input.replace(/_([a-z])/g, function (m, w) {
          return w.toUpperCase();
        });
      },

      pathLocale(path) {
        return pathLocaleMethod(path)
      },

      getToken() {
        return token()
      },

      path(path) {
        if(app.i18n.locale == app.i18n.fallbackLocale) return path
        else return '/'+app.i18n.locale+path
      },
      
      ucfirst(input) {
        if (typeof input === 'undefined') return input
        if (input.length === 0) return input
          return input[0].toUpperCase() + input.slice(1)
      },

      eyeSrc(hash) {
        let site = process.env.VAHI_API || 'https://api.vahi.eu'
        return site+'/i/'+hash+'.jpg'
      },

      pictureIsCalibrated(pic) {
        if(pic.scale === '0.5' && pic.x === '0.25' && pic.y === '0.15') return false
        return true
      },

      eyeIsCalibrated(eye) {
        for(let i in eye.pictures) {
          let pic = eye.pictures[i]
          if(pic.scale === '0.5' && pic.x === '0.25' && pic.y === '0.15') return false
        }
        return true
      }

    }

  }))
}
