<template>
  <div class="mt-[5rem]">
    <jobDetails />
  </div>
</template>
<script setup>
import jobDetails from "~/components/jobDetails.vue";
definePageMeta({
  layout: "default-page",
});
import { useRoute } from "vue-router";
const route = useRoute();
console.log("route.params.id ", route.params.id);
</script>
