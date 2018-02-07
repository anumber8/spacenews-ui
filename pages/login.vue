<template>
  <div>
    <b-alert variant="danger" :show="loginFailed" dismissible>Sorry, invalid username or password.</b-alert>
    <b-form @submit.prevent="submit" novalidate>
      <b-form-group label="Username" :invalid-feedback="errors.first('username')" :state="!errors.has('username')">
        <b-form-input type="text" name="username" v-model="form.username" v-validate="'required'"></b-form-input>
      </b-form-group>
      <b-form-group label="Password" :invalid-feedback="errors.first('password')" :state="!errors.has('password')">
        <b-form-input type="password" name="password" v-model="form.password" v-validate="'required'"></b-form-input>
      </b-form-group>
      <b-button variant="primary" size="lg" type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loginFailed: false
    }
  },
  methods: {
    async submit () {
      await this.$auth.login({ data: this.form })
        .then(() => {
          // redirect not happening, so run manually
          console.log('auth', this.$store.state.auth.loggedIn)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.loginFailed = true
        })
    }
  }
}
</script>
