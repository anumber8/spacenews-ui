export default function ({ $axios, redirect }) {
  $axios.onError(error => {
    if(error.code === 401) {
      redirect('/login')
    }
  })
}
