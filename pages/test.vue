<script setup>
const seachQuery = ref();
const filters = computed(() => {
  console.log("filters is being called now ....");
  let conditions = [];
  if (seachQuery.value) {
    conditions.push(seachQuery.value);
  }
  return conditions;
});

watch(seachQuery, () => {
  console.log("filters ", filters.value);
});
</script>

<template>
  <div class="w-[20%] mt-[4rem] flex justify-self-center items-center">
    <input
      type="text"
      v-model="seachQuery"
      class="border border-gray-400 text-black"
    />
  </div>
</template>
