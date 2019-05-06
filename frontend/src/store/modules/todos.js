import {TodoService} from '../../services/todos.service'

const todos = {
  namespaced: true,
  state: {
    todos: [],
    todo: {},
    form: {}
  },
  getters: {
    getAllTodos (state) {
      return state.todos
    }
    // getCompletedTodos (state) {
    //   return state.todos.filter(item => item.is_completed)
    // }, 
    // getPendingTodos (state) {
    //   return state.todos.filter(item => !item.is_completed)
    // }
  },
  mutations: {
    FILL_TODOS (state, todos) {
      state.todos = todos
    },
    getTodo (state, todo) {
      state.todo = todo
    },
    REMOVE_TODO (state, id) {
      state.todos.splice(id,1)
    }
  },
  actions: {
    async fillTodos ({commit}) {
      const todos = await TodoService.getTodos()
      commit('FILL_TODOS', todos.data)
    },
    removeTodo ({commit}, index) {
      commit('REMOVE_TODO', index)
    }
  }
}

export default todos