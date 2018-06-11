export default async function ({ app, store }) {
  if(!store.state.user.loggedIn && !store.state.admin.loggedIn) {
    if(app.$vahi.getToken()) {
      app.$vahi.auth()
      .then((res) => {
          console.log(res)
      })
      .catch((res) => {
        console.log('could not load account')
        console.log(res)
      })
    } else {
      store.dispatch('ejectAccount', {})
    }

  }
}
