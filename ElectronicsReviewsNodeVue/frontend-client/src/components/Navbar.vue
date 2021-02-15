<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="navbar-dark bg-primary">
      <router-link to="/" class="navbar-brand">Amazing Electronics</router-link>
      
      <b-navbar-nav>
        <b-nav-item href="/products">Products</b-nav-item>
        <b-nav-item-dropdown text="Browse">
          <div v-for="category in categories" :key="category.id">
            <b-dropdown-item :href="`/category/${category.id}`">{{ category.name }}</b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.state.products.categories
    }
  },
  created() {
    this.$store.dispatch("products/load_categories")
  }
};
</script>

<style>
</style>