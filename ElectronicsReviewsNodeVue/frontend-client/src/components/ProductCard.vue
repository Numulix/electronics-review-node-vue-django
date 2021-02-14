<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h3 class="text-center">{{ product.product_name }}</h3>
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