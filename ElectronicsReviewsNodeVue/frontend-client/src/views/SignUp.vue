<template>
  <div>
    <Navbar/>
    <br/>
    <h1 class="text-center">Sign Up!</h1>
    <div>
      <div class="row mt-5">
        <div class="col-md-6 m-auto">
          <div class="card card-body">
            <b-alert v-if="message" show variant="danger">{{
              message
            }}</b-alert>
            <b-form @submit="signUp">
              <b-form-group
                id="input-group-1"
                label="Username"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="username"
                  placeholder="Enter your username"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Password Confirmation"
                label-for="input-3"
              >
                <b-form-input
                  id="input-3"
                  v-model="password_repeat"
                  type="password"
                  placeholder="Confirm your password"
                ></b-form-input>
              </b-form-group>

              <b-button variant="primary" type="submit">Sign Up</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import Navbar from '@/components/Navbar.vue'

export default {
  data() {
    return {
      username: "",
      password: "",
      password_repeat: "",
      message: "",
    };
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    async signUp(e) {
      e.preventDefault();
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        const response = await AuthService.signUp(credentials);
        this.message = response.message;
        this.$router.push("/");
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
  },
  components: {
    Navbar
  }
};
</script>

<style>
</style>