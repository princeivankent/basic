import { UserService, RegistrationError } from '../services/user.service'

const register = {
  namespaced: true,
  state: {
    isRegistered: false,
    registrationErrorCode: 0,
    registrationError: '',
    registration: false
  },

  mutations: {
    registrationRequest(state) {
      state.registration = true
      state.registrationErrorCode = 0
      state.registrationError = ''
    },

    registrationSuccess(state) {
      state.registration = false
      state.isRegistered = true
    },

    registrationError (state, {errorCode, errorMessage}) {
      state.registration = false
      state.registrationErrorCode = errorCode
      state.registrationError = errorMessage
    }
  },

  actions: {
    async register ({commit}, payload) {
      commit('registrationRequest')
      
      try {
        await UserService.register(payload.name, payload.username, payload.password);
        commit('registrationSuccess')

        return true
      } 
      catch (e) {
        if (e instanceof RegistrationError)
          commit('registrationError', {errorCode: e.errorCode, errorMessage: e.message})

        return false
      }
    }
  }
}

export default register
