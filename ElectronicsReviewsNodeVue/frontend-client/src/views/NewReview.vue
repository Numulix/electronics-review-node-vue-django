<template>
  <div>
    <Navbar />
    <br />
    <div v-if="!this.$store.getters.isLoggedIn" class="text-center">
      <h1>Login first to leave a review</h1>
      <router-link to="/login" class="btn btn-primary btn-lg"
        >Login</router-link
      >
    </div>
    <div v-else>
      <h1 class="text-center">REVIEW:</h1>
      <b-form @submit="onSubmit">
        <b-form-group label="Review text">
          <b-form-textarea
            v-model="text"
            placeholder="Leave your review here"
            required
          >
          </b-form-textarea>
        </b-form-group>

        <b-button variant="primary" type="submit">Submit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ReviewService from "@/services/ReviewService.js";

export default {
  data() {
    return {
      text: "",
    };
  },
  components: {
    Navbar,
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const request = {
        user_id: this.$store.getters.getUser.id,
        product_id: this.$route.params.id,
        review_text: this.text,
      };
      console.log(request);
      ReviewService.post_review(request);
      this.$router.push(`/products/${this.$route.params.id}`);
    },
  },
};
</script>

<style>
</style>