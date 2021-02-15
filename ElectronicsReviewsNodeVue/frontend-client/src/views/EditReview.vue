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
      <h1 class="text-center">EDIT REVIEW:</h1>
      <div v-if="this.edit_rev_err">
        <b-alert show variant="danger">{{ this.edit_rev_err }}</b-alert>
      </div>
      <b-form @submit="editReview">
        <b-form-group label="Review text">
          <b-form-textarea
            v-model="edit_text"
            placeholder="Leave your review here"
            required
          >
          </b-form-textarea>
        </b-form-group>

        <b-button variant="primary" type="submit">Edit</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ReviewService from "@/services/ReviewService.js";
import Joi from "joi";

const editReviewSchema = Joi.object().keys({
  review_text: Joi.string()
    .min(5)
    .max(1024)
    .required()
    .error(
      new Error(
        "You must include your review description, max 1024 min 5 characters"
      )
    ),
})

export default {
  data() {
    return {
      edit_text: "",
      product_id: this.$store.state.products.reviews[0].product_id,
      edit_rev_err: "",
    };
  },
  components: {
    Navbar,
  },
  computed: {
    review() {
      this.$store.dispatch(
        "products/load_current_editing_review",
        this.$route.params.id
      );
      return this.$store.state.products.reviews[0];
    },
  },
  methods: {
    editReview(e) {
      e.preventDefault();
      let data = {
        review_text: this.edit_text,
      };

      let { error } = editReviewSchema.validate(data);
      if (error) {
        this.edit_rev_err = error;
        return;
      }

      ReviewService.update_review(this.$route.params.id, data);
      this.$router.push(`/products/${this.product_id}`);
    },
  },
};
</script>

<style>
</style>