<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10 m-5 p-5 border">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" id="username" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
      </div>
      </div>
    </div>
  </template>
  
  <script>
    import Cookies from "js-cookie"
  export default {
    name: "AdminLogin",
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Simple check for demonstration purposes
        if (this.username === 'fadidon' || this.username === 'hami' && this.password === 'loginforadmin' ) {
          Cookies.set('adminLoggedIn', 'true');
          this.$router.push('/adminmovies');
        } else {
          alert('Invalid credentials');
        }
      },
     
    }
  }
  </script>
  
  <style scoped>
  /* Your styles for the login page */
  </style>
  