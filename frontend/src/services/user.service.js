import ApiService from './api.service'
import { TokenService } from './storage.service'

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.errorCode = errorCode
    this.message = message
  }
}

class RegistrationError extends Error {
  constructor(errorCode, message) {
    super(message)
    this.name = this.constructor.name
    this.errorCode = errorCode
    this.message = message
  }
}

const UserService = {
  /**
    * Login the user and store the access token to TokenService. 
    * 
    * @returns access_token
    * @throws AuthenticationError 
  **/
  login: async function(email, password) {
    const requestData = {
      method: 'POST',
      url: "/api/login",
      data: {
        grant_type   : 'password',
        client_id    : process.env.VUE_CLIENT_ID,
        client_secret: process.env.VUE_CLIENT_SECRET,
        email        : email,
        password     : password
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)

      TokenService.saveUserInstance(response.data.user)
      TokenService.saveRefreshToken(response.data.refresh_token)
      TokenService.saveToken(response.data.access_token)
      ApiService.setHeader()
      
      // NOTE: We haven't covered this yet in our ApiService 
      //       but don't worry about this just yet - I'll come back to it later
      // ApiService.mount401Interceptor();

      return response.data
    } 
    catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.message)
    }
  },

  /**
    * Register the user 
    * 
    * @returns status
    * @throws RegistrationError 
  **/
  register: async (name, email, password) => {
    const requestData = {
      method: 'POST',
      url: "/api/register",
      data: {
        name: name,
        email: email,
        password: password
      }
    }
    
    try {
      const response = await ApiService.customRequest(requestData)

      return response.data
    } 
    catch (error) {
      throw new RegistrationError(error.response.status, error.response.data.message)
    }
  },

  /**
    * Refresh the access token.
  **/
  refreshToken: async function() {

    // Gets refresh token from LocalStorage
    const refreshToken = TokenService.getRefreshToken()

    const requestData = {
      method: 'POST',
      url: "/oauth/token",
      data: {
        grant_type   : 'refresh_token',
        refresh_token: refreshToken,
        client_id    : 2,
        client_secret: '7GBP7A007eKAW3vLO7knh2FpGveBFS28fxXKktRo',
      }
    }

    try {
      const response = await ApiService.customRequest(requestData)

      TokenService.saveToken(response.data.access_token)
      TokenService.saveRefreshToken(response.data.refresh_token)

      // Update the header in ApiService
      ApiService.setHeader()

      return response.data.access_token
    } 
    catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail)
    }

  },

    /**
     * Logout the current user by removing the token from storage. 
     * 
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout() {
      // Remove the token and remove Authorization header from Api Service as well 
      TokenService.removeToken()
      TokenService.removeRefreshToken()
      TokenService.removeUserInstance()
      ApiService.removeHeader()
      
      // NOTE: Again, we'll cover the 401 Interceptor a bit later. 
      // ApiService.unmount401Interceptor()
    }
}

export default UserService

export { UserService, AuthenticationError, RegistrationError }
