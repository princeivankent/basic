import ApiService from './api.service.js'

export const TodoService = {
  resource: 'api/todos',
  async getTodos () {
    const data = await ApiService.get(this.resource)
    return data
  }
}
