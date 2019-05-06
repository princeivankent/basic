import Vue from 'vue'
import Vuex from 'vuex'
import login from './login.module';
import register from './register.module';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    login, register
  }
})