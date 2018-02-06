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
import { mapActions } from 'vuex'

export default {
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
      await this.$validator.validateAll()
      if (this.errors.any()) {
        return
      }
      try {
        this.loginFailed = false
        // baseURL should point to nodeJS instead of the usual location
        // might need to configure this later with proxies etc
        const resp = await this.$axios.post(
          '/auth/login',
          this.form, {
          baseURL: ''
        })
        this.login(resp.data.token)
        this.$router.push('/')
      } catch (e) {
        this.loginFailed = true
      }
    },
    ...mapActions(['login'])
  }
}
</script>
