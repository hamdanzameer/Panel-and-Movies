<template>
  <div class="container">
    <div class="row justify-content-between">
      <div class="col-md-5 border border-warning-emphasis p-5 m-4">
        <form @submit.prevent="submitForm">
          <h1 class="text-center">Add Movie</h1>
          <div class="mb-3">
            <label for="image" class="form-label">Image</label>
            <input
              @change="handleImageUpload"
              type="file"
              class="form-control"
              id="image"
              required
            />
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              v-model="movie.title"
              type="text"
              class="form-control"
              id="title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="genre" class="form-label">Genre</label>
              <select v-model="movie.genre" class="form-control" id="genre">
              <option value="" disabled>Select Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="quality" class="form-label">Quality</label>
            <select v-model="movie.quality" class="form-control" id="quality">
              <option value="" disabled>Select Quality</option>
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="HD">HD</option>
              <option value="SD">SD</option>
              <option value="4K">4K</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="downloadUrl" class="form-label">Download URL</label>
            <input
              v-model="movie.downloadUrl"
              type="text"
              class="form-control"
              id="downloadUrl"
              required

            />
          </div>
          <button type="submit" class="btn btn-primary">Add movie</button>
          <button @click="deleteMovie()" class="btn btn-danger mx-5">
            Delete a Movie
          </button>
        </form>
      </div>
      <!-- IMAGE PREVIEW SECTION START  -->
      <div
        class="col-md-5 border border-warning-emphasis d-flex justify-content-center bg-dark p-5 m-4"
      >
        <div class="movie-preview">
          <h3 class="text-center">Preview</h3>

          <div class="">
            <img :src="previewImageUrl" alt="Movie Poster" class="img-res"  />
            <div class="movie-details text-white">
              <h4>{{ movie.title }}</h4>
              <p>Genre :{{ movie.genre }}</p>
              <p>Quality : {{ movie.quality }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "AdminPage",
  data() {
    return {
      movie: {
        title: "",
        genre: "",
        quality: "",
        image: null,
        downloadUrl: "",
        imageUrl: "",
      },
      previewImageUrl: null,
    };
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.movie.imageUrl = file;
        this.previewImageUrl = URL.createObjectURL(file);
      }
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append("title", this.movie.title);
        formData.append("genre", this.movie.genre);
        formData.append("quality", this.movie.quality);
        formData.append("downloadUrl", this.movie.downloadUrl);
        formData.append("image", this.movie.imageUrl);

        await axios.post("http://localhost:4000/addmovie", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Use toast notification
        this.toast.success("Movie added successfully!");

        this.movie = {
          title: "",
          genre: "",
          quality: "",
          imageUrl: "",
          downloadUrl: "",
        };
      } catch (error) {
        console.error("Error while adding movie:", error);
        this.toast.error("Failed to Add Movie.Please try again.",{
          position: top,
          timeout : 5000, 
        })
      }
    },
    handleFileUpload(event) {
      this.movie.imageUrl = event.target.files[0];
    },
    getImageUrl(imageId) {
      return imageId ? `http://localhost:4000/movies/${imageId}` : "";
    },
    deleteMovie() {
      this.$router.push("/deletemovie");
    },
  },
};
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 15 px;
  border-radius: 5px;
}

.img-res {
  height: 180px;
  width: 100%;
  object-fit: cover;
}
@media (min-width: 1100px) {
  .img-res {
    height: 220px;
    width: 100%;
    object-fit: cover;
  }
}
</style>
