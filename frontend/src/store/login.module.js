import { UserService } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../router'

const login = {
  namespaced: true,
  state: {
    authenticating: false,
    refreshTokenPromise: null,  // Holds the promise of the refresh token
    isSessionExpires: false,
    authenticationErrorCode: 0,
    authenticationError: '',
    accessToken: TokenService.getToken(),
    user: TokenService.getUserInstance()
  },

  getters: {
    loggedIn: (state) => {
      return state.accessToken ? true : false
    },

    authenticationErrorCode: (state) => {
      return state.authenticationErrorCode
    },

    authenticationError: (state) => {
      return state.authenticationError
    },

    authenticating: (state) => {
      return state.authenticating
    }
  },

  mutations: {
    loginRequest (state) {
      state.authenticating = true;
      state.authenticationError = ''
      state.authenticationErrorCode = 0
    },

    loginSuccess (state, response) {
      state.accessToken = response.access_token
      state.user = response.user
      state.authenticating = false
    },

    loginError (state, {errorCode, errorMessage}) {
      state.authenticating = false
      state.authenticationErrorCode = errorCode
      state.authenticationError = errorMessage
    },

    cancelAuthentication (state) {
      state.authenticating = false
    },

    logoutSuccess (state) {
      state.accessToken = ''
    },

    refreshTokenPromise (state, promise) {
      state.refreshTokenPromise = promise
    },

    refreshAccessToken (state, response) {
      state.accessToken = response.access_token
      state.authenticating = false
    },

    // Error hooks
    unAuthorized (state, res) {
      state.authenticationErrorCode = res.status
      state.authenticationError = res.message
    }
  },

  actions: {
    async login({ commit }, payload) {
      commit('loginRequest');

      try {
        const response = await UserService.login(payload.email, payload.password);
        commit('loginSuccess', response)

        // Redirect the user to the page he first tried to visit or to the home view
        router.push(router.history.current.query.redirect || '/');

        return true
      } 
      catch (e) {
        commit('cancelAuthentication')

        // if (e instanceof AuthenticationError) {
        //   commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
        // }

        return false
      }
    },

    logout({ commit }) {
      UserService.logout()
      commit('logoutSuccess')
      router.push('/login')
    },

    refreshToken({ commit, state }) {
      // If this is the first time the refreshToken has been called, make a request
      // otherwise return the same promise to the caller

      if(!state.refreshTokenPromise) {
        const p = UserService.refreshToken()
        commit('refreshTokenPromise', p)

        // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
        // Clear the promise on error as well.
        p.then(
          response => {
            commit('refreshTokenPromise', null)
            commit('refreshAccessToken', response)
          },
          () => {
            commit('refreshTokenPromise', null)
          }
        )
      }

      return state.refreshTokenPromise
    },

    unAuthorized ({ commit }, message) {
      UserService.logout()
      commit('logoutSuccess')
      commit('unAuthorized', message)
      router.push('/login')
    }
  }
}

export default login
