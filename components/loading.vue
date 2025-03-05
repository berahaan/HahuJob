<script setup>
const colorStore = useColorModeStore();
const getSkeletonJobs = () => {
  const skeletonCount = 20; // Number of skeletons to render
  return Array.from({ length: skeletonCount }, (_, i) => i + 1);
};
</script>

<template>
  <div v-for="n in getSkeletonJobs()" :key="'sector-' + n">
    <div
      v-for="i in 3"
      :key="'sub-sector-' + i"
      class="grid md:grid-cols-3 grid-col-1 mt-2 ml-7"
    >
      <div
        v-for="j in 3"
        :key="'job-' + j"
        :class="[
          colorStore.colorMode === 'light'
            ? 'bg-gray-300 border-none'
            : 'bg-gray-800',
        ]"
        class="p-4 border border-gray-700 rounded-md w-[360px] h-[380px] flex items-center justify-center animate-pulse mb-4"
      >
        <div
          :class="[colorStore.colorMode === 'light' ? '' : 'bg-gray-800']"
          class="h-4 w-1/2 flex items-center justify-center"
        >
          <img
            src="https://www.hahu.jobs/images/logo_150.png"
            alt=""
            class="w-[3rem] h-[3rem]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
