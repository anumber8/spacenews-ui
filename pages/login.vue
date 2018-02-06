<template>
  <div>
    <b-alert variant="danger" :show="loginFailed" dismissible>Sorry, invalid username or password.</b-alert>
    <b-alert variant="success" :show="authToken" dismissible>You've logged in! Authentication token is {{ authToken }}</b-alert>
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
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loginFailed: false,
      authToken: null
    }
  },
  methods: {
    async submit () {
      await this.$validator.validateAll()
      if (this.errors.any()) {
        return
      }
      try {
        this.loginFailed = false
        this.authToken = null
        // baseURL should point to nodeJS instead of the usual location
        // might need to configure this later with proxies etc
        const resp = await this.$axios.post(
          '/auth/login',
          this.form, {
          baseURL: ''
        })
        this.authToken = resp.data.token
        // this.$router.push('/')
      } catch (e) {
        console.log('login failed')
        this.loginFailed = true
      }
    }
  }
}
</script>
