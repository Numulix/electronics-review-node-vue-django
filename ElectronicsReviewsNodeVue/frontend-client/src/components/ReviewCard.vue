<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h4>{{ review.username }}</h4>
        <p>
          {{ review.review_text }}
        </p>
        <p><small>Last updated: {{ review.last_updated }}</small></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    review: Object,
  },
};
</script>

<style>
</style>