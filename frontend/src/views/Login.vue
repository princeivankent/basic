<template>
  <div class="mt-5">
    <div class="row">
      <div class="col-md-4"></div>
      <div class="col-md-4">
        <form novalidate>
          <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email" v-model="form.email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="form.password">
          </div>
          <button class="btn btn-primary" v-on:click="onSubmit">Submit</button>
        </form>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
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
    setDefaultState() {
      this.form = Object.assign({}, this.form, {
        email: '',
        password: ''
      })
    },
    async onSubmit(e) {
      e.preventDefault();
      
      let loginRequest = new Promise((resolve, reject) => {
        return axios.post(`http://localhost/pk-portal/api/login`, this.form)
          .then(({data}) => {
            this.$auth.setToken(data.access_token, data.expires_in + Date.now())
            resolve(true)
          })
          .catch(({err}) => {
            console.log(err.response);
            alert('Something went wrong! Please check console');
          })
      });
      let status = await loginRequest
      if (status) 
        this.$router.push('/courses')
    }
  }
}
</script>