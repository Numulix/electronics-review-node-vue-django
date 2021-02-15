import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class ProductService {
  all_products() {
    return axios
      .get(API_URL + "products")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  post_product(product) {
    return axios
      .post(API_URL + "products", product)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  get_product(id) {
    return axios
      .get(API_URL + "products/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  get_category_products(id) {
    return axios
      .get(API_URL + "categories/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new ProductService();
