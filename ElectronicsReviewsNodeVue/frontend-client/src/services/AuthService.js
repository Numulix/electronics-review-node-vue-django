import axios from "axios";

const url = "http://localhost:8080/api/";

export default {
  login(credentials) {
    return axios
      .post(url + "login/", credentials)
      .then((response) => response.data);
  },
  signUp(credentials) {
    return axios
      .post(url + "sign-up/", credentials)
      .then((response) => response.data);
  },
  getTestAuthRoute() {
    return axios
      .get(url + "test-auth-route/")
      .then((response) => response.data);
  },
};
