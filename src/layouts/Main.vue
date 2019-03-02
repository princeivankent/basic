<template>
  <div>
    <router-link to="/home" active-class="active">Home</router-link>
    <router-link to="/about" active-class="active">About</router-link>
    <router-link to="/contact" active-class="active">Contact</router-link>
    <router-link to="/profile" active-class="active">Profile</router-link>
    <router-view></router-view>
  </div>
</template>
