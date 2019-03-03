<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-3">
        <form novalidate>
          <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="form.email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="form.password">
          </div>
          <button class="btn btn-primary" @click="login">Submit</button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
      
      this.$store.dispatch('auth/login', {
        email: this.form.email, 
        password: this.form.password
      })
    }
  }
}
</script>