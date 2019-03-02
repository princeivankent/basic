import Vue from 'vue'
import Vuex from 'vuex'

import todos from './todos.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    todos
  }
})