<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h4>{{ review.username }}</h4>
        <p>
          {{ review.review_text }}
        </p>
        <p><small>Last updated: {{ review.last_updated }}</small></p>
        <div v-if="this.$store.getters.isAdmin || review.user_id == this.$store.getters.getUser.id" class="text-end">
          <b-button @click="deleteReview">Delete</b-button>
          <router-link :to="`/editreview/${review.id}`" class="btn">Edit</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReviewService from "@/services/ReviewService.js"

export default {
  props: {
    review: Object,
  },
  methods: {
    deleteReview() {
      ReviewService.delete_review(this.review.id);
      this.$router.push(`/products/${this.review.product_id}`)
    }
  }
};
</script>

<style>
</style>