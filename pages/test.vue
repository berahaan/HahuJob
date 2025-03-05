<script setup>
const { colorMode } = useColorModeStore();
const getSkeletonJobs = () => {
  const skeletonCount = 5; // Number of skeletons to render
  return Array.from({ length: skeletonCount }, (_, i) => i + 1);
};
</script>

<template>
  <div>
    <div class=" mt-2 ml-7 justify-between">
      <div
        class="border border-gray-700 rounded-md w-[400px] h-[80px] flex items-center justify-center bg-gray-600 animate-pulse mb-4"
      ></div>
      <div
        class="border border-gray-700 rounded-md w-[50px] h-[20px] flex items-center justify-center bg-gray-600 animate-pulse mb-4"
      ></div>
    </div>
  </div>
</template>
