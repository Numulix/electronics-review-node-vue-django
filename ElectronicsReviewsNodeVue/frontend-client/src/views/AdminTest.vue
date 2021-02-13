<template>
  <div>
      <h1>Hi {{ this.username }}</h1>
      <p>{{ this.secretMessage }}</p>
      <b-button type="button" variant="primary" @click="logout">Logout</b-button>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      username: "",
      secretMessage: "",
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }

    if (this.$store.getters.isAdmin == 0) {
      this.$router.push("/");
    }

    this.username = this.$store.getters.getUser.username;
    this.secretMessage = await AuthService.getTestAdminRoute();
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>