<template>
  <div>
    <Navbar />
    <br />

    <h1>Products by category: {{ this.$route.params.id }}</h1>

    <div v-for="product in category_products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: {
    Navbar,
    ProductCard,
  },
  computed: {
    category_products() {
      return this.$store.state.products.category_products;
    },
  },
  mounted: function () {
    this.$store.dispatch(
      "products/load_category_products",
      this.$route.params.id
    );
  },
};
</script>

<style>
</style>