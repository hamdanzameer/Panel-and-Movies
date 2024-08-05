<template>
  <HeaderComp />
  <div>
    <form @submit.prevent="submitForm">
      <div class="containerfluid">
        <!--Form Start -->
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div
              class="row justify-content-evenly m-4 border rounded-5"
              style="background-color: #f4d992"
            >
              <div class="col-md-10 mt-5">
                <h1 class="text-center mb-4">Place Order</h1>
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button class="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <!-- Category -->
              <div class="col-md-10 my-2 fw-bold">
                <p>Category</p>
                <div
                  class="dropdown bg-light border rounded m-0"
                  style="background-color: #f4d992"
                >
                  <select
                    v-model="selectedCategory"
                    @change="fetchServices"
                    class="btn d-flex w-100 fw-bold dropdown-toggle"
                    id="category"
                  >
                    <option
                      v-for="category in categories"
                      selected
                      :key="category._id.$oid"
                      :value="category._id.$oid"
                      class="btn d-flex w-100 fw-bold dropdown-toggle"
                    >
                      {{ category.categoryName }}
                    </option>
                  </select>
                </div>
                <!-- CATEGORY END-->
                <!-- SERVICES START -->
                <div class="col-md-10 my-2 fw-bold w-100">
                  <p>SERVICES</p>
                  <div class="bg-light rounded border m-0 w-100">
                    <select
                      v-if="services.length"
                      v-model="selectedServiceId"
                      @change="handleChange"
                      class="w-100 p-1"
                    >
                      <option
                        v-for="service in services"
                        :key="service.serviceId"
                        :value="service.serviceId"
                        class="fw-bold p-5"
                      >
                        {{ service.serviceName }}
                      </option>
                    </select>
                    <p v-else class="my-1 mx-1">
                      Please select a category First.
                    </p>
                  </div>
                </div>
                <!-- SERVICES END -->

                <!-- AVERAGE TIME START -->
                <div class="col-md-10 mt-3 fw-bold w-100">
                  <label for="averageTime" class="form-label"
                    >Average Time</label
                  >
                  <div class="w-100">
                    <input
                      type="text"
                      name=""
                      id="averageTime"
                      class="w-100 border rounded p-1 my-1"
                      v-model="averageTime"
                      
                    />
                  </div>
                  <!-- AVERAGE TIME END -->
                  <!-- ENTER LINK START -->
                  <label for="link" class="form-label">Enter Link | Whatsapp</label>
                  <div class="w-100">
                    <input
                      type="text"
                      name=""
                      id="link"
                      v-model="link"
                      placeholder="https:"
                      class="w-100 border rounded p-1 my-1"
                      
                    />
                  </div>
                  <!-- ENTER LINK END -->
                  <!-- Amount start -->
                  <label for="amount" class="form-label">Amount</label>
                  <div class="w-100">
                    <input
                      type="number"
                      name=""
                      id="amount"
                      class="w-100 border rounded p-1 my-1"
                      @input="calculateCharges()"
                      v-model="amount"
                      required
                    />
                  </div>

                  <!-- AMOUNT  END -->

                  <!-- CHARGES START -->
                  <label for="charges" class="form-label">Charges</label>
                  <div class="w-100">
                    <input
                      type="text"
                      name=""
                      id="charges"
                      class="w-100 border rounded p-1"
                      v-model="charges"
                    />
                  </div>

                  <!-- CHARGES END -->
                  <!-- BUTTON START -->
                  <button
                    type="submit"
                    style="background-color: #c1a14a"
                    class="btn mb-5 mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Place Order
                  </button>

                  <!-- BUTTON END -->
                  <!-- MODEL CENTERED  START -->

                  <!-- Modal -->
                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1
                            class="modal-title fs-5 text-danger"
                            id="exampleModalLabel"
                          >
                            Important !!!! اہم اعلان
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          As you will click on "Close" Button you will be
                          redirected to Whatapp.Pay your charges there !!!!.Thanks
                          <hr>
                          جب آپ “بند کریں” کے بٹن پر کلک کریں گے آپ کو واٹس ایپ پر بھیج دیا جائے گا۔ وہاں اپنے چارجز ادا کریں!!!!. شکریہ
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-dismiss="modal"
                            @click="redirectToWhatsapp"
                          >
                            Close |
                            بند کریں
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- MODEL CENTERED  END -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Form End -->
      </div>
    </form>
  </div>
  <FooterComp />
  <!-- <LoginComp/> -->
</template>

<script>
import axios from "axios";
import HeaderComp from "./HeaderComp.vue";
import FooterComp from "./FooterComp.vue";

export default {
  name: "HomePage",
  components: {
    HeaderComp,
    FooterComp,
  },

  data() {
    return {
      categories: [],
      services: [],
      selectedCategory: null,
      selectedServiceId: null,
      selectedService: null,
      averageTime: null,
      amount: null,
      price: null,
      charges: null,
      link: "",
      serviceName: "",
    };
  },

  methods: {
    async submitForm() {
      try {
        const formData = {
          service: this.serviceName,
          amount: this.amount,
          link: this.link,
          charges: this.charges,
          time: this.averageTime,
        };
        console.log("Frontend, form data ie order is ", formData);
        const response = await axios.post(
          "http://localhost:4000/submit-order",
          formData
        );
        console.log("Form submitted sexfully", response.data.message);
        // alert("Order Placed");
        this.amount = 0;
        this.link = " ";
        this.charges = 0;
        this.selectedServiceId = null;
        this.selectedCategory = null;
        this.averageTime = null;
      } catch (error) {
        console.error("From Frontend Error loging in :", error.response);
      }
    },
    redirectToWhatsapp() {
      setTimeout(() => {
        
        const whatsappMessage = `I have Placed this Order  \nService: ${this.serviceName}\nLink: ${this.link}  \nAmount: ${this.amount} \nCharges: ${this.charges} \nPlease share with me payment details`;
        const whatsappUrl = `https://wa.me/+923196776552?text=${encodeURIComponent(
          whatsappMessage
        )}`;
        window.location.href = whatsappUrl;
      },);
    },

    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:4000/category");
        this.categories = response.data;
        console.log(this.categories);
      } catch (error) {
        console.log(error);
      }
    },
    fetchServices() {
      const category = this.categories.find(
        (cat) => cat._id.$oid === this.selectedCategory
      );
      this.services = category ? category.services : [];
      this.selectedServiceId = null;
      this.selectedService = null;
    },
    showServiceDetails() {
      this.selectedService = this.services.find(
        (service) => service.serviceId === this.selectedServiceId
      );
      this.averageTime = this.selectedService
        ? this.selectedService.averageTime
        : null;
      this.price = this.selectedService ? this.selectedService.price : null;
    },
    showServiceName() {
      const servicekanam = this.services.find(
        (service) => service.serviceId === this.selectedServiceId
      );
      if (servicekanam) {
        this.serviceName = servicekanam.serviceName;
      }
    },
    handleChange() {
      this.showServiceName();
      this.showServiceDetails();
    },

    calculateCharges() {
      this.charges = this.amount * this.price;
    },

    async placeOrder() {
      try {
        const userId = localStorage.getItem("user");
        const orderData = {
          userId,
          categoryId: this.selectedCategory,
          serviceId: this.selectedService,
          amount: this.amount,
          link: this.link,
        };
        await axios.post("http://localhost:4000/order", orderData);
        alert("Order Places Successfully");
      } catch (error) {
        console.log("Front end ,placeorder api error", error);
      }
    },
  },
  mounted() {
    this.fetchCategories();
    this.calculateCharges();
    const user = localStorage.getItem("user");
    if (!user) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.golden {
  background-color: #c1a14a;
}
.onhover:hover {
  background-color: #c1a14a;
  color: #f4d992;
}
.dropdown-menu {
  width: 100%;
  left: 0;
  right: 0;
}

.dropdown-menu .dropdown-item {
  white-space: nowrap;
}
</style>
