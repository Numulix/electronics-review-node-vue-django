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

  get_review_username(user_id) {
    return axios
      .get(API_URL + "user/" + user_id)
  }
}

export default new ReviewService();
