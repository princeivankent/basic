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
      try {
        await UserService.register(payload.name, payload.email, payload.password);
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
