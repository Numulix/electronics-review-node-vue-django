import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class CategoryService {
  all_categories() {
    return axios
      .get(API_URL + "categories")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  add_category(category) {
    if (this.$store.getters.isAdmin == 1) {
      return axios
        .post(API_URL + "categories", category)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    }
    return;
  }

  delete_category(id) {
    if (this.$store.getters.isAdmin == 1) {
      return axios
        .delete(API_URL + "categories/" + id)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    }
    return;
  }

  update_category(id, formData) {
    if (this.$store.getters.isAdmin == 1) {
      return axios
        .put(API_URL + "categories/" + id, formData)
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    }
    return;
  }
}

export default new CategoryService();