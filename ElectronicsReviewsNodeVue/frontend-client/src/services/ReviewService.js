import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class ReviewService {
  get_product_reviews(product_id) {
    return axios
      .get(API_URL + "reviews/" + product_id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  post_review(review) {
    return axios
      .post(API_URL + "reviews", review)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  delete_review(id) {
    return axios
      .delete(API_URL + "reviews/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  get_review(id) {
    return axios
      .get(API_URL + "review_info/" + id)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  update_review(id, data) {
    return axios
      .put(API_URL + "reviews/" + id, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new ReviewService();
