<template>
  <div>
    <Navbar />
    <br />
    <h1 class="text-center">Login!</h1>
    <div>
      <div class="row mt-5">
        <div class="col-md-6 m-auto">
          <div class="card card-body">
            <b-alert v-if="message" show variant="danger">{{
              message
            }}</b-alert>
            <b-form @submit="login">
              <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  placeholder="Username"
                  v-model="username"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
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
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import Navbar from "@/components/Navbar.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      message: "",
    };
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
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
  components: {
    Navbar,
  },
};
</script>

<style>
</style>