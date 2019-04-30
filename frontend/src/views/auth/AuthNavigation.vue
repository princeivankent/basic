<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" to="/home">
        <img src="@/assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
      </a>
      <button class="navbar-toggler" 
      type="button" data-toggle="collapse" 
      data-target="#navbarNav" aria-controls="navbarNav" 
      aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <button 
      @click="$router.push($route.path == '/login' ? '/register' : '/login')"
      class="btn btn-sm btn-success my-2 my-sm-0"
      >
      {{ $route.path == '/login' ? 'REGISTER' : 'LOGIN' }}
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AuthNavigation'
}
</script>

