<template>
  <div>
    <Navbar />
    <br />
    <div v-if="product[0]">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h1 class="text-center">{{ product[0].product_name }}</h1>
            <p>
              <strong>Description: </strong>{{ product[0].product_description }}
            </p>
            <p><strong>Price: </strong>${{ product[0].price }}</p>
          </b-col>

          <b-col align-self="center">
            <div v-if="!this.$store.getters.isLoggedIn">
              <h1>You need to login to add a review.</h1>
            </div>
            <div v-else class="text-center ">
              <router-link
                :to="`/newreview/${product[0].id}`"
                class="btn btn-primary btn-lg"
                :id_of_product="product[0].id"
                >Add a review for this product</router-link
              >
            </div>
          </b-col>
        </b-row>
      </b-container>

      <hr />
      <h1 class="text-center">Reviews:</h1>
      <hr />

      <div v-for="review in reviews" :key="review.id">
        <ReviewCard :review="review" />
      </div>
    </div>
    <div v-else>
      <h1>Product doesn't exist</h1>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ReviewCard from "@/components/ReviewCard.vue";

export default {
  computed: {
    product() {
      this.$store.dispatch("products/load_product", this.$route.params.id);
      return this.$store.state.products.products[0];
    },

    reviews() {
      this.$store.dispatch(
        "products/load_product_reviews",
        this.$route.params.id
      );
      return this.$store.state.products.reviews;
    },
  },
  components: {
    Navbar,
    ReviewCard,
  },
  methods: {},
};
</script>

<style>
</style>