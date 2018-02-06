import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: null
}

const getters = {
  isAuth: state => !!state.user,
  user: state => state.user
}

const mutations = {
  LOGIN (state, user) {
    Vue.set(state, 'user', user)
  },

  LOGOUT (state) {
    Vue.set(state, 'user', null)
  }

}

const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authToken) {
      try {
        this.$axios.setToken(req.session.authToken, 'Token')
        const resp = await this.$axios.get('/api/auth/me/')
        commit('LOGIN', resp.data)
      } catch(e) {
        delete req.session.authToken
        commit('LOGOUT')
      }
    } else {
      console.log('REQ SESSION IS EMPTY', req.session)
      commit('LOGOUT')
    }
  },

  async login ({ commit }, authToken) {
    try {
      this.$axios.setToken(authToken, 'Token')
      const resp = await this.$axios.get('/api/auth/me/')
      commit('LOGIN', resp.data)
    } catch(e) {
      console.log(e)
      commit('LOGOUT')
    }
  },

  async logout ({ commit }) {
    // set baseURL to point to NodeJS server (better fix later...)
    await this.$axios.post('/auth/logout/', null, { baseURL: '' })
    commit('LOGOUT')
  }

}

export default () => new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
