<template>
  <div>
    <form @submit.prevent="submitForm">
      <HeaderComp />
      <div class="container-fluid mt-5 mb-5">
        <!-- Form Start -->
        <div class="row justify-content-center">
          <div
            class="col-md-6 p-sm-5 border rounded-5"
            style="background-color: #f4d992"
          >
            <div class="form-floating m-4 mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInputEmail"
                placeholder="name@example.com"
                v-model="email"
              />
              <label for="floatingInputEmail">Email address</label>
            </div>
            <div class="form-floating m-4 mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputName"
                placeholder="John Doe"
                v-model="name"
              />
              <label for="floatingInputName">Full Name</label>
            </div>
            <div class="form-floating m-4 mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputUsername"
                placeholder="johndoe"
                v-model="username"
              />
              <label for="floatingInputUsername">Username</label>
            </div>
            <div class="form-floating m-4">
              <input
                type="password"
                class="form-control"
                id="floatingInputPassword"
                placeholder="Password"
                v-model="password"
              />

              <label for="floatingInputPassword">Password</label>
              <div id="passwordHelpBlock" class="form-text">
                Your password can contain letters , numbers,or special
                characters and must not contain spaces.
              </div>
            </div>
            <div class="form-floating m-4">
              <input
                type="password"
                class="form-control"
                id="floatingInputConfirmPassword"
                placeholder="Confirm Password"
                v-model="confirmpassword"
              />
              <label for="floatingInputConfirmPassword">Confirm Password</label>
            </div>
            <div v-if="password && confirmpassword && password !== confirmpassword" style="color: red">
              Password and condirm Password  do not match.
            </div>
            <div class="mb-3 form-check m-4">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                v-model="terms"
              />
              <label class="form-check-label" for="exampleCheck1"
                >Agree to Terms and Conditions</label
              >
            </div>
            <button
              type="submit"
              style="background-color: #c1a14a; margin-left: 3%"
              class="btn mb-3"
              :disabled="!terms"
            >
              Sign Up
            </button>
            <router-link
              to="/login"
              class="text-decoration-none"
              style="color: #c1a14a"
              ><p class="text-center text-decoration-none text-hover">
                Already Have an Account?
                <a style="color: #c1a14a" class="fw-bold text-hover" href="#"
                  >Login</a
                >
              </p>
            </router-link>
          </div>
        </div>
        <!-- Form Start End -->
      </div>
    </form>
    <FooterComp />
  </div>
</template>
focus
<script>
import FooterComp from "./FooterComp.vue";
import HeaderComp from "./HeaderComp.vue";
import axios from "axios";

export default {
  name: "SignUpComp",
  components: {
    HeaderComp,
    FooterComp,
  },
  data() {
    return {
      email: "",
      name: "",
      username: "",
      password: "",
      confirmpassword: "",
      terms: false,
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post("http://localhost:4000/signup", {
          email: this.email,
          name: this.name,
          username: this.username,
          password: this.password,
        });
        // console.log(response.data);
        if (response.status === 200) {
          alert("Signup Successful");
          this.$router.push({ name: "Home" });
        }
        if (response.status === 201) {
          alert("Signup Successful");
          this.$router.push({ name: "LoginComp" });
        }
      } catch (error) {
        console.error("Axios Error:", error);
        alert("Signup Failed");
      }
    },
    async submitForm() {
      if (this.password !== this.confirmpassword) {
        alert("Password and Confirm Password are not same");
        return;
      }
      if (!this.terms) {
        alert("Please accept terms and conditions");
      }

      await this.signup();
    },
  },
  mounted() {
    // this.$refs.password.focus();
    if (localStorage.getItem("user")) {
      this.$router.push("/");
    }
  },
};
</script>
