<template>
  <div>
    <div class="card">
      <div class="card-body">
        <router-link :to="`/products/${product.id}`"><h3 class="text-center">{{ product.product_name }}</h3></router-link>
        <h5 class="text-center">{{ product.product_description }}</h5>
        <p class="text-center"><strong>Price: </strong>${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
  },
};
</script>

<style>
</style>