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
    return axios
      .post(API_URL + "categories", category)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  delete_category(id) {
    return axios
      .delete(API_URL + "categories/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  update_category(id, formData) {
    return axios
      .put(API_URL + "categories/" + id, formData)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new CategoryService();
