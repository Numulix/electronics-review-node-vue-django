<template>
  <div>
    <Navbar />
    <br />
    <h1 class="text-center">List of products:</h1>

    <div v-for="product in products" :key="product.id">
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default {
  components: {
    Navbar,
    ProductCard,
  },
  computed: {
    products() {
      return this.$store.state.products.products;
    },
  },
  mounted: function() {
      this.$store.dispatch("products/load_products")
  }
};
</script>

<style>
</style>