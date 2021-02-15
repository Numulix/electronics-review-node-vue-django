<template>
  <div>
    <Navbar />
    <br />

    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <h1 class="text-center">New Category</h1>
          <div class="card">
            <div class="card-body">
              <div v-if="this.cat_error">
                <b-alert show variant="danger">{{ this.cat_error }}</b-alert>
              </div>
              <b-form @submit="newCategory">
                <b-form-group
                  id="group-1"
                  label="Category name"
                  label-for="cat-name"
                >
                  <b-form-input
                    id="cat-name"
                    v-model="category.name"
                    placeholder="Enter new category name"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary"
                  >Add Category</b-button
                >
              </b-form>
            </div>
          </div>
        </b-col>

        <b-col>
          <h1 class="text-center">New Product</h1>
          <div class="card">
            <div class="card-body">
              <div v-if="this.prod_error">
                <b-alert show variant="danger">{{ this.prod_error }}</b-alert>
              </div>
              <b-form @submit="newProduct">
                <b-form-group
                  id="prod-gr-1"
                  label="Product name"
                  label-for="prod-1"
                >
                  <b-form-input
                    id="prod-1"
                    placeholder="Product name"
                    v-model="product.p_name"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="prod-gr-2"
                  label="Category"
                  label-for="prod-2"
                >
                  <b-form-select v-model="product.c_id" :options="categories">
                  </b-form-select>
                </b-form-group>

                <b-form-group
                  id="prod-gr-3"
                  label="Product description"
                  label-for="prod-3"
                >
                  <b-form-textarea
                    id="prod-3"
                    v-model="product.prod_desc"
                    placeholder="Product description"
                  ></b-form-textarea>
                </b-form-group>

                <b-form-group id="prod-gr-4" label="Price" label-for="prod-4">
                  <b-form-input
                    id="prod-4"
                    type="number"
                    v-model="product.price"
                  ></b-form-input>
                </b-form-group>

                <b-button type="submit" variant="primary">Add Product</b-button>
              </b-form>
            </div>
          </div>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";
import CategoryService from "@/services/CategoryService.js";
import ProductService from "@/services/ProductService.js";
import Navbar from "@/components/Navbar.vue";
import Joi from "joi";

const schema = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
});

const prodSchema = Joi.object().keys({
  product_name: Joi.string().min(5).max(50).required().error(new Error('Name should not be empty, and between 5 and 50 characters')),
  category_id: Joi.number().integer().required(),
  product_description: Joi.string().min(5).max(1024).required().error(new Error('Description must not be empty, max 1024 characters')),
  price: Joi.number().integer().min(1).required().error(new Error('Must be at least $1')),
});

export default {
  data() {
    return {
      username: "",
      secretMessage: "",
      category: {
        name: "",
      },
      product: {
        p_name: "",
        c_id: 0,
        prod_desc: "",
        price: 0,
      },
      cat_error: "",
      prod_error: "",
    };
  },
  computed: {
    categories() {
      let category_options = [];
      for (let i = 0; i < this.$store.state.products.categories.length; i++) {
        let obj = {
          text: this.$store.state.products.categories[i].name,
          value: this.$store.state.products.categories[i].id,
        };
        category_options.push(obj);
      }
      return category_options;
    },
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

    newCategory(e) {
      e.preventDefault();
      const cat = {
        name: this.category.name,
      };

      let { error } = schema.validate(cat);

      if (error) {
        this.cat_error =
          "Name is required and must be between 3 and 30 characters";
        return;
      }

      CategoryService.add_category(cat);
      this.$router.push("/");
    },

    newProduct(e) {
      e.preventDefault();
      const prod = {
        product_name: this.product.p_name,
        category_id: this.product.c_id || 1,
        product_description: this.product.prod_desc,
        price: this.product.price,
      };

      let { error } = prodSchema.validate(prod);

      if (error) {
        this.prod_error =
          error;
        return;
      }
      ProductService.post_product(prod);
      this.$router.push("/products");
    },
  },
  components: {
    Navbar,
  },
};
</script>

<style>
</style>