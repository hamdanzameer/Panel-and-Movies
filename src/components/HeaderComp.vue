<template>
  <div>
    <!-- NAV-BAR START -->
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <router-link to="/">
          <a class="navbar-brand" href="#">
            <img class="img-fluid" style="height: 30px;" src="../assets/croped.png" alt="HONTOR SERVICES">
          </a>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link active  fw-bold " aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-bold" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link fw-bold" href="#">Pricing</a>
            </li>
            <li class="nav-item dropdown dropdown-hover">
              <a class="nav-link dropdown-toggle fw-bold" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                PKR
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">PKR</a></li>
                <li><a class="dropdown-item" href="#">INR</a></li>
                <li><a class="dropdown-item" href="#">USD</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <!-- CONFIRMATION MODAL START -->
              <div>
                <button type="button" class="btn text-decoration-none fw-bold" data-bs-toggle="modal"
                  data-bs-target="#confirmSignOutModal" v-if="isLoggedIn">
                  Sign Out
                </button>
                <!-- Confirmation Modal -->
                <div class="modal fade" id="confirmSignOutModal" tabindex="-1"
                  aria-labelledby="confirmSignOutModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="confirmSignOutModalLabel">Sign Out</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <p class="text-danger fw-bold">Are you sure you want to Sign Out?</p>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" @click="handleSignOut">Yes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- CONFIRMATION MODAL END -->
            </li>
          </ul>
          
          <ul class="navbar-nav d-flex flex-row-reverse fw-bold" v-if="isLoggedIn">
            
           UserName : {{  loginUser }}
          </ul>

        </div>
      </div>
    </nav>
    <!-- NAVBAR END -->
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
import Cookies from "js-cookie"

export default {
  name: "HeaderComp",
  data() {
    return {
      loginUser: '',
      isLoggedIn: false,

      // JSON.parse(localStorage.getItem("loginUser")),

    }
  },
  methods: {
    handleSignOut() {
      Cookies.remove("token");
      Cookies.remove("user");

      const modalElement = document.getElementById('confirmSignOutModal');
      if (modalElement) {
        const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
        modalInstance.hide();
      }
      this.isLoggedIn = false;
      this.loginUser = " ";
      this.$router.push('/login');
    }
  },
  mounted(){
    // window.addEventListner()
   const user = Cookies.get('user')
   if(user) {
   this.loginUser = user;
   this.isLoggedIn = true;
  } else {
    this.isLoggedIn = false;

  }
  
},
}
</script>

<style scoped>
.navbar {
  background-color: #c1a14a;
}
.fw-bold{
  font-weight : bold !important;
}

.dropdown-hover:hover .dropdown-menu {
  display: block;
}
</style>
