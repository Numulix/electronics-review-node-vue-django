import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import AdminTest from '../views/AdminTest.vue'
import Products from '../views/Products.vue'
import CategoryProducts from '../views/CategoryProducts.vue'
import ProductInfo from '../views/ProductInfo.vue'
import NewReview from '../views/NewReview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin-test',
    name: 'admin-test',
    component: AdminTest
  },
  {
    path: '/products',
    name: 'products',
    component: Products
  },
  {
    path: '/category/:id',
    name: 'category',
    component: CategoryProducts
  },
  {
    path: '/products/:id',
    name: 'product-info',
    component: ProductInfo
  },
  {
    path: '/newreview/:id',
    name: 'newreview',
    component: NewReview
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
