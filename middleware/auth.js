export default async function ({ app, store }) {
  if(!store.state.user.loggedIn) {
    if(app.$vahi.getToken()) {
      console.log('running auth check')
      app.$vahi.auth()
      .then((res) => {console.log('account loaded')})
      .catch((res) => {
        console.log('could not load account')
        console.log(res)
      })
    } else {
      store.dispatch('ejectAccount', {})
    }

  }
}
