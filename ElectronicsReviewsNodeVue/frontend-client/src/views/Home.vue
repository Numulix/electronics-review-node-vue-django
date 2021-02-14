<template>
  <div>
    <Navbar />
    <br />

    <b-jumbotron>
      <template #header>Welcome to Amazing Electronics</template>

      <template #lead>
        Browse for the latest electronic products and read reviews on them, to
        decide whether the product is right for you!
      </template>

      <hr class="my-4" />
      <div v-if="this.$store.getters.isLoggedIn">
        <h3>Welcome {{ this.$store.getters.getUser.username }}</h3>
        <b-button type="button" variant="primary" @click="logout"
          >Logout</b-button
        >
      </div>

      <div v-else>
        <router-link to="/login" class="btn btn-primary">Login</router-link>
        <router-link to="/sign-up" class="btn btn-primary">Sign up</router-link>
      </div>
    </b-jumbotron>

    <router-link to="/products" class="btn btn-primary btn-lg">Browse Products</router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>
