import Vue from 'vue'
import axios from 'axios'
import Storage from './storage'
import Conf from './config'

export default ({ app, store, route }, inject) => {

  const storage = new Storage()
  const ax = {
    data: axios.create({
      baseURL: process.env.VAHI_API || 'https://api.vahi.eu',
      timeout: 1500
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

      // Sync methods
      logout() {
        setToken('')
        store.dispatch('userLogout')
      },

      adminLogout() {
        setToken('')
        store.dispatch('adminLogout')
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
