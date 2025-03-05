<script setup>
import { ref } from "vue";
const activeIndex = ref(1);
// const colorMode
const breakpoints = {
  // Small screens (sm)
  640: { itemsToShow: 1 },
  1024: { itemsToShow: 2 },
  1122: { itemsToShow: 3 },
  1280: { itemsToShow: 3 },
};
const colorStore = useColorModeStore();
const sectors = ref([
  {
    id: 1,
    image:
      "https://www.hahu.jobs/_vercel/image?url=%2Fimages%2Fservices%2Fbuild_career_profile.png&w=640&q=100",
    title: "Buld Career profile",
    descriptions:
      "compose your career profiles with contents standards and identifiers  to showcase your assessed competencies in the sectors of of your expertise Hahu jobs offers youa simple,clear ... ",
  },
  {
    id: 2,
    image:
      "https://www.hahu.jobs/_vercel/image?url=%2Fimages%2Fservices%2Fjob_application.png&w=640&q=100",
    title: "Job Applications",
    descriptions:
      "Apply for jobs with just a few clicks, and track the progress of your applications through notifications on multiple platforms.   Revolutionize your job applications with pre-prepared...",
  },
  {
    id: 3,
    image:
      "https://www.hahu.jobs/_vercel/image?url=%2Fimages%2Fservices%2Fvacancy_notification.png&w=640&q=100",
    title: "JOb Applications",
    descriptions:
      "Take advantage of every job opportunity using our multi-platform  vacancy notification services for jobseekers. Subscribe to a sector  of your choice with various specific notification specifications to...",
  },
]);
</script>

<template>
  <div class="mt-4 mb-20">
    <h1
      :class="[
        'font-bold flex justify-center text-4xl  mt-8',
        colorStore.colorMode === 'light' ? 'text-gray-600' : 'text-white',
      ]"
    >
      Services
    </h1>
    <div class="w-auto mt-2">
      <p
        :class="[
          'flex items-center justify-center text-balance text-center text-sm font-semibold ',
          'font-bold text-4xl mt-4 px-3 sm:mb-4 mb-1',
          colorStore.colorMode === 'light' ? 'text-slate-600' : 'text-white',
        ]"
      >
        HaHuJobs offers digital career profiling, job application and
        subscription based relevant vacancy announcement <br />
        notifications to job seekers that sign up on its primary service
        deployment.
      </p>
    </div>
    <div class="flex justify-center">
      <Carousel
        :breakpoints="breakpoints"
        :wrap-around="false"
        :transition="1000"
        snapAlign="start"
        v-model="activeIndex"
        @update:modelValue="activeIndex = $event"
        class="mt-4"
      >
        <Slide v-for="sector in sectors" :key="sector.id">
          <div
            class="sm:mt-4 mt-2 hover:border border-teal-700 sm:w-[22rem] rounded-md w-[17rem] max-h-[26rem] p-2 ml-4 mr-4 sm:mr-0 shadow-md hover:shadow-xl"
            :class="[
              colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800 ',
            ]"
          >
            <div class="flex items-center justify-center flex-col">
              <img
                :src="sector.image"
                alt="build carer profile"
                class="w-72 h-56 px-6 py-0 cursor-grabbing"
              />
              <p
                class="text-teal-600 text-lg font-bold mt-3"
                :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >
                {{ sector.title }}
              </p>
              <p
                class="sm:px-6 px-2 text-sm text-gray-500 mt-2 mb-11"
                :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >
                {{ sector.descriptions }}
              </p>
            </div>
          </div>
        </Slide>
        <template #addons>
          <div
            class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
          >
            <button
              v-for="(job, index) in sectors"
              :key="'dash-' + index"
              @click="activeIndex = index"
              class="w-3 h-[3px] rounded transition-all duration-300"
              :class="activeIndex === index ? 'bg-teal-500 w-3' : 'bg-gray-300'"
            ></button>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
</template>
