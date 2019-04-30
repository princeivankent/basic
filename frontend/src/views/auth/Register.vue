<template>
  <div>
    <AuthNavigation />
    <div class="container-fluid mt-5">
      <div class="row justify-content-md-center">
        <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 col-xl-3">
          <h3 class="text-center">Register</h3>
          <form @submit.prevent="register" novalidate>
            <div class="form-group">
              <label>Name</label>
              <input 
              type="text" 
              class="form-control" 
              placeholder="Enter name"
              v-model="name"
              autofocus
              >
            </div>
            <div class="form-group">
              <label>Email address</label>
              <input 
              type="email" 
              class="form-control" 
              aria-describedby="emailHelp" 
              placeholder="Enter email"
              v-model="email">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input 
              type="password" 
              class="form-control" 
              placeholder="Password"
              v-model="password">
            </div>
            <div class="form-group">
              <div v-if="registrationError" class="alert alert-danger">
                {{ registrationError }}
              </div>
            </div>
            <button class="btn btn-success btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthNavigation from './AuthNavigation'
import { mapState } from 'vuex'

export default {
  name: 'Register',
  components: {AuthNavigation},
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  computed: mapState('register', ['registrationError']),
  methods: {
    register () {
      this.$store.dispatch('register/register', {
        name: this.name, 
        email: this.email, 
        password: this.password
      })
    }
  }
}
</script>
