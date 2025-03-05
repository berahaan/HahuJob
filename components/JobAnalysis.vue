<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import JOB_ANALYSIS from "~/graphql/query/JOB_ANALYSIS.graphql";
const route = useRoute();
const storeAnalysis = ref([]);

const fetchJobAnalysis = async () => {
  try {
    const { data } = await useAsyncQuery({
      query: JOB_ANALYSIS,
      variables: {
        JobID: route.params.id,
      },
    });
  } catch (error) {
    console.log("Error while fetching job analysis ".error);
  }
};
</script>

<template>
  <div class="rounded-md shadow-md w-full border border-gray-500">
    <div class="p-4">
      <div class="flex items-center justify-between">
        <p class="text-teal-600 font- text-[13px]">Vacancy match with ESCO</p>
        <p class="flex items-center gap-x-2">
          <img
            src="https://www.hahu.jobs/icons/esco.png"
            alt="Esco group images"
            class="w-[6rem] object-cover"
          />
          <span class="text-blue-400 font-bold"> ESCO</span>
        </p>
      </div>
    </div>
  </div>
</template>
