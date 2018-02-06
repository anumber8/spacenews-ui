export default function ({ redirect, store }) {
  if (!store.getters.isAuth) {
    return redirect('/login')
  }
}
