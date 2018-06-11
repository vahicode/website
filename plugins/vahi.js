import Vue from 'vue'
import axios from 'axios'
import Storage from './storage'
import Conf from './config'

export default ({ app, store, route }, inject) => {

  const storage = new Storage()
  const ax = {
    data: axios.create({
        baseURL: process.env.VAHI_API || 'https://api.vahi.eu',
      timeout: 15000
    })
  }

  const authMethod = () => {
    return new Promise(function(resolve, reject) {
      ax.data.get('/account', { headers: {'Authorization': 'Bearer '+storage.get('token')} })
        .then((res) => {
          if(typeof res.data === 'object') {
            resolve(true)
          }
        })
        .catch((res) => {
          store.dispatch('ejectAccount', {})
          console.log('Authentication failed | plugin')
          resolve(false)
        })
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
                store.dispatch('adminLogin', res.data)
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
        return authMethod()
      },

      // Sync methods
      logout() {
        setToken('')
        store.dispatch('userLogout')
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

    }

  }))
}
