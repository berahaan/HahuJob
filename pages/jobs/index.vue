<template>
  <div class="mt-[5rem]">
    <!-- <jobDetails /> -->
    <Joblist />
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
// import jobDetails from "~/components/jobDetails.vue";
import Joblist from "~/components/Joblist.vue";
const route = useRoute();
console.log("route in index.vue pages ", route.query.sid);
definePageMeta({
  layout: "default-page",
});
</script>
