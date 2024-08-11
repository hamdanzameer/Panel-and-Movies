<template>
  <!-- <HeaderComp /> -->
  <div class="container-xl bg-color text-white my-5">
    <!-- row-cols-3 row-cols-sm-5 row-cols-md-6 row-cols-xxl-5 -->
    <div
      class="p-3 row row-cols-3 row-cols-sm-5 row-cols-md-6 justify-center"
      v-if="movies.length"
    >
      <div class="mb-4" v-for="movie in movies" :key="movie._id">
        <div class="bcolor">
          <img
            class="img-res rounded-3"
            :src="getImageUrl(movie.imageId)"
            alt="Movie Poster"
          />
        </div>
        <div class="d-flex flex-column gap-1">
          <p class="truncate">{{ movie.title }}</p>
          <p class="gern">Genre :{{ movie.genre }}</p>
          <p class="quality">Quality :{{ movie.quality }}</p>
          <a
            @click="deleteMovie(movie._id)"
            class="btn btn-danger"
            >Delete</a
          >
        </div>
      </div>
    </div>
    <p v-else>Add Movies First ! There is no Movie in DataBase </p>
  </div>
  <!-- <FooterComp /> -->
</template>

<!-- script section -->
<script>
import axios from "axios";
// import HeaderComp from "./HeaderComp.vue";
// import FooterComp from "./FooterComp.vue";
export default {
  name: "DeleteMoviePage",
  components: {
    // HeaderComp,
    // FooterComp,
  },
  data() {
    return {
      movies: [],
      link: "",
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:4000/getmovies");
      console.log("Data from frontend", response);
      this.movies = response.data;
      this.link = response.data.downloadUrl;
    } catch (error) {
      console.error("Error while Fetching movies", error);
    }
  },
  methods: {
    getImageUrl(imageId) {
      return imageId ? `http://localhost:4000/image/${imageId}` : "";
    },
    async deleteMovie(movieId) {
      try {
        const response =  await axios.delete(`http://localhost:4000/deletemovie/${movieId}`);
        console.log(response);
        if(response.status === 204){
        this.movies = this.movies.filter((movie) => movie._id !== movieId);
        alert("Movie deleted Successfully");
        }
      } catch {
        console.error("Error while deleting movie");
        alert("Failed to Delete a movie");
      }
    },
  },
};
</script>

<!-- style section -->
<style scoped>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0px;
}
.img-res {
  height: 180px;
  width: 100%;
  object-fit: cover;
}
.bcolor {
  border: 1px solid red;
  padding: 2px;
  border-radius: 10px;
}
#des p {
  margin-bottom: 1px;
}
.gern {
  font-size: 10px;
  margin: 0px;
}
.quality {
  font-size: 11px;
  color: yellow;
  margin: 0px;
}
.bg-color {
  background-color: #161212;
}
@media (min-width: 1100px) {
  .img-res {
    height: 220px;
    width: 100%;
    object-fit: cover;
  }
}
</style>
