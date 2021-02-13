<template>
  <div>
    <h1>Login!</h1>
    <div>
      <b-alert v-if="message" show variant="danger">{{ message }}</b-alert>
      <b-form @submit="login">
        <b-form-group id="input-group-1" label="Username" label-for="input-1">
          <b-form-input
            id="input-1"
            placeholder="Username"
            v-model="username"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Password" label-for="input-2">
          <b-form-input
            id="input-2"
            placeholder="Password"
            v-model="password"
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const response = await AuthService.login(credentials);
        this.message = response.message;

        const token = response.token;
        const user = response.user;

        this.$store.dispatch("login", { token, user });

        this.$router.push("/");
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
  },
};
</script>

<style>
</style>