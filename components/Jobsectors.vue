<script setup>
const imageMapping = [
  "https://www.hahu.jobs/images/sectors/natural-science.png",
  "https://www.hahu.jobs/images/sectors/business.png",
  "https://www.hahu.jobs/images/sectors/creative-art.png",
  "https://www.hahu.jobs/images/sectors/education.png",
  "https://www.hahu.jobs/images/sectors/hospitality.png",
  "https://www.hahu.jobs/images/sectors/low-and-medium-skilled-work.png",
  "https://www.hahu.jobs/images/sectors/transport-and-logistics.png",
  "https://www.hahu.jobs/images/sectors/engineering.png",
  "https://www.hahu.jobs/images/sectors/finance.png",
  "https://www.hahu.jobs/images/sectors/legal-service.png",
  "https://www.hahu.jobs/images/sectors/ict.png",
  "https://www.hahu.jobs/images/sectors/health-care.png",
  "https://www.hahu.jobs/images/sectors/manufacturing.png",
  "https://www.hahu.jobs/images/sectors/social-science.png",
];
const { data: basic_sectors, error } = await useAsyncData(
  "basic_sectors",
  async () => {
    const { data } = await useAsyncQuery(BASIC_SECTORS);
    return data.value?.basic_sectors || [];
  }
);
const fetchBasicSectors = async () => {
  try {
    const { data } = await useAsyncQuery(BASIC_SECTORS);
    return data.value?.basic_sectors || [];
  } catch (error) {
    console.log("error while fetching basic sectors ", error);
  }
};
</script>

<template>Jobs sectors</template>
