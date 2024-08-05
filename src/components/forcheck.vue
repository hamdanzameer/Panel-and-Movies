<template>
    <div>
      <h1>Categories</h1>
      <select v-model="selectedCategory" @change="fetchServices">
        <option v-for="category in categories" :key="category._id.$oid" :value="category._id.$oid">
          {{ category.categoryName }}
        </option>
      </select>
  
      <h1>Services</h1>
      <select v-if="services.length" v-model="selectedServiceId" @change="showServiceDetails">
        <option v-for="service in services" :key="service.serviceId" :value="service.serviceId">
          {{ service.serviceName }}
        </option>
      </select>
      <!-- <p v-else>No services available for the selected category.</p> -->
  
      <div v-if="selectedService">
        <h2>Service Details</h2>
        <!-- <p>Service Name: {{ selectedService.serviceName }}</p> -->
        <p>Price: ${{ selectedService.price }}</p>
        <p>Average Time: {{ selectedService.averageTime }} hours</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name :"forCheck",
    data() {
      return {
        categories: [],
        services: [],
        selectedCategory: null,
        selectedServiceId: null,
        selectedService: null
      };
    },
    mounted() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await axios.get('http://localhost:4000/category');
          this.categories = response.data;
          console.log(this.categories);
        } catch (error) {
          console.log(error);
        }
      },
      fetchServices() {
        const category = this.categories.find(cat => cat._id.$oid === this.selectedCategory);
        this.services = category ? category.services : [];
        this.selectedServiceId = null;
        this.selectedService = null;
      },
      showServiceDetails() {
        this.selectedService = this.services.find(service => service.serviceId === this.selectedServiceId);
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 2em;
    margin-bottom: 0.5em;
  }
  select {
    margin-bottom: 1em;
  }
  </style>
  