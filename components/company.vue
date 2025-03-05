<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const currentIndex = ref(0);
const carouselRef = ref(null); // Reference to the carousel instance
const intervalTime = 500;
const colorStore = useColorModeStore();
let interval;
// const res=
const images = ref([
  "https://res.cloudinary.com/hahujobs/image/upload/v1664454560/basic/entities/ybp8bfvpl2o0zulfdrmd.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1664368377/basic/entities/wnsmsbotilunefummpor.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1663847220/basic/entities/qllc8bgppgakuhpumjrp.png",
  "https://cdn.hahu.jobs/public/aggregator/telegram_channel_post/000aecc6fa8a77e0d4f2b115ffae1e8bdc4ba11876cc1c1a322bdd9d15e6c2ee97fd6d7e11e3f705cf77672c8b6a5d67cdf8.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1664368377/basic/entities/wnsmsbotilunefummpor.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1663930196/basic/entities/hidu4b0onvxcb9duz6md.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1663847220/basic/entities/qllc8bgppgakuhpumjrp.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1663847871/basic/entities/wmys08tpufajg7b4hoym.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1664368377/basic/entities/wnsmsbotilunefummpor.png",
  "https://res.cloudinary.com/hahujobs/image/upload/v1664368377/basic/entities/wnsmsbotilunefummpor.png",
  "https://cdn.hahu.jobs/public/aggregator/entityLogo/6246e9896c8773ce541edc503e26eea749887b3c2ed05bc90346f9cb3b2194dcaa7d3f2d6acb93dc16b39dca1d4d01577446",
  "https://res.cloudinary.com/hahujobs/image/upload/v1621927136/basic/entities/lgpa2cfikpvm1ez9d8ib.png",
  "https://cdn.hahu.jobs/public/aggregator/entityLogo/6246e9896c8773ce541edc503e26eea749887b3c2ed05bc90346f9cb3b2194dcaa7d3f2d6acb93dc16b39dca1d4d01577446",
  "https://res.cloudinary.com/hahujobs/image/upload/v1664368377/basic/entities/wnsmsbotilunefummpor.png",
  "https://cdn.hahu.jobs/public/aggregator/entityLogo/6246e9896c8773ce541edc503e26eea749887b3c2ed05bc90346f9cb3b2194dcaa7d3f2d6acb93dc16b39dca1d4d01577446",
]);
const breakpoints = {
  640: { itemsToShow: 1.25 },
  1024: { itemsToShow: 3 },
  1122: { itemsToShow: 4 },
  1280: { itemsToShow: 7 },
};
onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }, intervalTime);
});
onUnmounted(() => {
  // Clear the interval when the component unmounts
  clearInterval(interval);
});
</script>

<template>
  <div
    class="mt-4 relative"
    :class="colorStore.colorMode === 'light' ? 'bg-slate-100' : 'bg-gray-800'"
  >
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-gradient-to-r from-slate-200 via-slate-200 to-transparent'
          : 'bg-gradient-to-r from-gray-800 via-gray-800 to-transparent',
      ]"
      class="absolute md:top-0 md:h-[450px] h-[280px] top-[14rem] lg:top-[8rem] opacity-100 left-0 sm:h-[485px] lg:h-[264px] w-20 lg:w-[14rem] z-30"
    ></div>
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-gradient-to-l from-slate-200 via-slate-200 to-transparent'
          : 'bg-gradient-to-l from-gray-800 via-gray-800 to-transparent',
      ]"
      class="absolute md:top-0 md:h-[450px] h-[280px] top-[14rem] lg:top-[8rem] opacity-100 right-0 sm:h-[485px] lg:h-[264px] w-20 lg:w-[14rem] z-30"
    ></div>

    <h1
      class="font-bold text-center lg:text-4xl text-3xl p-3"
      :class="
        colorStore.colorMode === 'light'
          ? 'font-extrabold text-gray-600'
          : 'text-white'
      "
    >
      HaHuJobs Top Posting Companies
    </h1>
    <p
      class="text-center sm:text-sm text-[15px] mt-3 px-[24px]"
      :class="
        colorStore.colorMode === 'light'
          ? 'text-slate-500 font-bold'
          : 'text-white'
      "
    >
      Below are some of the companies with a high number of vacancy
      announcements since 2019.
    </p>

    <div class="relative overflow-hidden h-64 mt-9">
      <Carousel
        ref="carouselRef"
        :breakpoints="breakpoints"
        :wrap-around="true"
        :autoplay="1"
        pause-autoplay-on-hover
        :transition="2000"
        snapAlign="start"
        class="mt-10"
      >
        <Slide v-for="(company, index) in images" :key="index">
          <div
            class="flex items-center justify-center sm:w-[8rem] w-[9rem] h-[140px] p-2 sm:h-[120px] rounded-lg sm:p-1 bg-white"
          >
            <img
              :src="company"
              alt="Company Logo"
              class="w-[9rem] h-[6rem] object-contain"
            />
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>
