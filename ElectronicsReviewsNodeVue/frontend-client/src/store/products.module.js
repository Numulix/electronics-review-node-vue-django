import ProductService from "../services/ProductService.js";

export const products = {
  namespaced: true,
  state: {
    products: [],
    category_products: [],
  },
  mutations: {
    set_products: (state, products) => {
      state.products = products;
    },
    add_product: (state, product) => {
      state.products.push(product);
    },
    remove_product: (state, id) => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i].id === id) {
          state.products.splice(i, 1);
          break;
        }
      }
    },
    clear_products: (state) => {
      state.products = [];
    },
    set_category_products: (state, products) => {
      state.category_products = products;
    },
  },
  actions: {
    load_products: ({ commit }) => {
      ProductService.all_products()
        .then((products) => {
          commit("set_products", products);
          return Promise.resolve(products);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    load_product: ({ commit }, id) => {
      ProductService.get_product(id)
        .then((product) => {
          commit("add_product", product);
          return Promise.resolve(product);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    load_category_products: ({ commit }, id) => {
      ProductService.get_category_products(id)
        .then((products) => {
          commit("set_category_products", products);
          return Promise.resolve(products);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
