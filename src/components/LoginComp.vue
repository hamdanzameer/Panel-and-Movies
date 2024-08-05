<template>
  <HeaderComp />
  <div class="container-fluid bg-light">
    <!-- SMALL BANNER START -->
    <div class="row container-fluid">
      <div class="col mt-4 border rounded-5">
        <div
          class="row d-flex mt-6 justify-content-sm-center justify-content-md-center"
        >
          <div class="col-md-5 pt-3 d-flex">
            <h6>
              Before Start! <br />Please Read our <br />
              Documentation
            </h6>
            <a
              href="#"
              style="background-color: #c1a14a"
              class="btn pt-2 m-3 btn-sm"
              >Read Documentation</a
            >
          </div>

          <div class="col-md-5 pt-3 d-flex">
            <h6>
              Before Continuing!<br />
              Watch Our <br />Guide Videos
            </h6>
            <a
              href="#"
              style="background-color: #c1a14a"
              class="btn pt-2 m-3 btn-sm"
              >Watch Videos</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- SMALL BANNER END  -->
    <!-- Description and login boxes -->
    <div class="row justify-content-center">
      <div class="col-md-5 pt-5 text-center order-2 order-sm-1">
        <h2>Hontor Services</h2>
        <h4>
          Best and Cheapest Number#1 <br />Whole Sale SMM Services Provider
        </h4>
        <h6>
          <a
            style="color: #c1a14a"
            class="text-decoration-none fw-bold"
            href="#"
            >Hontorservices.com</a
          >
          is best Platform for resellers to grow in SMM Field. We Provide
          High-Quality Guaranteed Services with number of worldwide payment
          Gateways. Official Clicks is not restricted to any Single Country. It
          can be Used worldwide. <br />
          <br />
          We are working Since 2020 & Finished Up to 300k+ orders successfully
          in 2022. Our 24/7 Live
          <a
            style="color: #c1a14a"
            class="text-decoration-none fw-bold"
            href="https://wa.me/923196776552"
            >Whatsapp</a
          >
          Support gives best ever experience to the users as compared to other
          panels.
        </h6>
      </div>
      <!-- FORM START -->
      <div
        class="col-md-5 m-5 p-5 order-1 border rounded-5"
        style="background-color: #f4d992"
      >
        <form @submit.prevent="submitForm" class="mt-5">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Email or Username</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              v-model="email"
            />
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          </div>

          <label for="inputPassword5" class="form-label">Password</label>
          <input
            type="password"
            id="inputPassword5"
            class="form-control"
            aria-describedby="passwordHelpBlock"
            placeholder="Password"
            v-model="password"
          />
          <p v-if="passwordErrorMessage" class="error-message">
            {{ passwordErrorMessage }}
          </p>

          <button
            type="submit"
            style="background-color: #c1a14a"
            class="btn mb-5 mt-4"
          >
            Login
          </button>
          <router-link
            to="/signup"
            class="text-decoration-none text-none"
            style="color: #c1a14a"
            ><p class="text-center text-hover">
              Don't have an account?
              <a style="color: #c1a14a" class="fw-bold text-hover" href="#"
                >Sign Up
              </a>
            </p></router-link
          >
        </form>
      </div>
      <!-- FORM END -->
    </div>

    <!-- Description and login boxes END-->
  </div>
  <FooterComp />
</template>

<script>
import HeaderComp from "./HeaderComp.vue";
import FooterComp from "./FooterComp.vue";
import axios from "axios";
export default {
  name: "LoginComp",
  components: {
    HeaderComp,
    FooterComp,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      passwordErrorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:4000/login",{
          email: this.email,
          password: this.password,
        });


           const user = response.data.user;
           const token = response.data.token;
          
           console.log("Backend sa  ya data araha ha ",user)

           localStorage.setItem('user', user.name);
           localStorage.setItem("token",token);
           sessionStorage.setItem("token",token)

           axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
          this.errorMessage = "";
          this.passwordErrorMessage = "", 
          this.$router.push("/");
      } catch (error) {
        console.error(
          "Error logging in:",
          error.response?.data?.error || error.message
        );
        console.error("Error logingin ", error.message);
        if (
          error.message &&
          error.response.data &&
          error.response.data.error === "User not Found"
        ) {
          if (
            error.message &&
            error.response.data &&
            error.response.data.error !== "Password Incorrect"
          ) {
            this.passwordErrorMessage = "";
          }
          this.errorMessage = "Username not Found";
        } else if (
          error.message &&
          error.response.data &&
          error.response.data.error === "Password Incorrect"
        ) {
          if (
            error.message &&
            error.response.data &&
            error.response.data.error !== "User not Found"
          ) {
            this.errorMessage = "";
          }
          this.passwordErrorMessage = "Password Incorrect";
        } else {
          alert("Login Failed");
        }
      }
    },
  
    async submitForm() {
      await this.login();
    },
  },
  mounted() {
    // this.$router.push("/login")
    console.log(process.env.LOGIN_API)
    if (localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
  created(){
    const token = localStorage.getItem('token')
    if (token){
      this.token=token ;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
  // computed:{
  //   username(){
    
  //     const Data =localStorage.getItem('username');
  //     const userData =JSON.parse(Data)
  //     console.log(userData);
  //     return userData.username;
  //   }

    
  // },
};
</script>

<style>
.text-hover:hover {
  color: black;
  font-weight: bold;
}
.error-message {
  margin-top: 10px;
  color: red;
}
</style>
