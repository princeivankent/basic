<template>
  <div>
    <NavBar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'

export default {
  name: 'Main',
  components: {NavBar}
}
</script>
