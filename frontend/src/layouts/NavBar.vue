<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" to="/home">
          <img src="@/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/home" active-class="active">Home <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about" active-class="active">About</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact" active-class="active">Contact</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/profile" active-class="active">Profile</router-link>
            </li>
          </ul>
        </div>
        <form class="form-inline">
          <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
          <h5 class="mr-4 text-white">{{ $store.state.login.user.name }}</h5>
          <button 
          class="btn btn-sm btn-outline-danger my-2 my-sm-0"
          @click="logout"
          >
          logout
          </button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout () {
      if (confirm('Are you sure to logout?'))
        this.$store.dispatch('login/logout')
    }
  }
}
</script>