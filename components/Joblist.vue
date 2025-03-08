<script setup>
import Sidebar from "./Sidebar.vue";
import TopJoblist from "./TopJoblist.vue";
const colorStore = useColorModeStore();
const { state, correctTypeNm } = useJobs();
const truncateText = (html, limit) => {
  // Remove HTML tags
  const plainText = html?.replace(/<\/?[^>]+(>|$)/g, "") || "";
  // Truncate text safely
  return plainText.length > limit
    ? plainText.substring(0, limit) + "..."
    : plainText;
};
console.log("state.Jobs ", state.jobs);
// Build filters based on route query
</script>

<template>
  <div class="flex h-screen">
    <Sidebar />
    <!-- No Jobs Found (Only shown after loading is complete) -->

    <div class="overflow-y-auto h-screen w-full">
      <TopJoblist />

      <div
        v-if="state.jobs.length > 0"
        :class="[
          colorStore.colorMode === 'light'
            ? 'bg-white text-gray-600'
            : 'bg-gray-800 text-white',
        ]"
        class="mt-[5rem] p-[8px] w-full max-h-[10rem] flex gap-2"
      >
        <!-- This divisions contains images of jobs and its title in flex ways plus some desciptions-->
        <div>
          <img
            src="https://www.hahu.jobs/images/sectors/natural-science.png"
            alt="natural-science"
            class="lg:w-[20px] w-[80px] md:h-8 lg:h-6 md:mr-3 md:w-8 h-8 mt-[0px] mr-2 lg:mr-0"
          />
        </div>
        <div class="py-2">
          <p class="font-bold leading-[2px] ml-5 lg:ml-0">
            {{ state.jobs[0]?.sub_sector?.sector?.name }} jobs
          </p>
          <p
            class="lg:text-[9px] md:text-[15px] text-[15px] mt-2 font-normal"
            :class="[
              colorStore.colorMode === 'light' ? 'text-black' : 'text-gray-300',
            ]"
          >
            {{ state.jobs[0]?.sub_sector?.sector?.description }}
          </p>
        </div>
      </div>
      <div :class="[state.jobs.length === 0 ? 'mt-[6rem]' : '']">
        Showing {{ state.pagination.totalJobs || 0 }} Joblist now ....
      </div>
      <div v-if="state.isLoading" class="mt-[2rem]">
        <loading />
      </div>
      <div
        v-else-if="state.jobs.length === 0"
        class="flex flex-col justify-center items-center mb-[12rem] mt-[4rem]"
      >
        <img
          src="https://www.hahu.jobs/images/search-not-found.svg"
          alt="Result not found"
          class="mx-auto w-auto h-auto max-w-[24rem]"
        />
        <p class="mt-4 text-2xl font-bold">
          Sorry, we couldn’t find any match for your search
        </p>
      </div>
      <div
        v-else
        class="grid grid-cols-1 h-screen w-full gap-x-1 lg:grid-cols-3 xl:gap-4 md:grid-col-2 xl:grid-col-2 2xl:grid-col-2"
      >
        <div
          v-for="job in state.jobs"
          :key="job.id"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white hover:border-teal-500 rounded-md border-white'
              : 'bg-gray-800 hover:border-teal-500 rounded-md ',
          ]"
          class="relative w-[390px] cursor-pointer flex items-center justify-self-center md:w-[34rem] lg:w-[394px] mb-[1px] border-gray-800 mt-4 rounded-md border hover:border-teal-600"
        >
          <div class="p-4">
            <!-- Job Card Header -->

            <div class="flex justify-between items-center">
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 text-teal-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <span class="text-teal-600 text-sm" v-if="job.expired"
                  >Expired</span
                >
              </div>
              <button
                class="flex hover:bg-cyan-300 hover:text-black transition-all duration-700 ease-in-out items-center px-[13px] py-[2px] justify-center gap-1 border border-teal-600 rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4 text-teal-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
                <span class="text-teal-600 text-[13px]">Save</span>
              </button>
            </div>

            <!-- Job Card Body -->
            <div
              class="flex flex-col md:flex-row gap-6 md:mt-10 mt-2"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white',
              ]"
            >
              <!-- Company Logo and Name -->
              <div class="h-24 md:mt-6 mt-0 w-[6rem] ml-[7rem] md:ml-0">
                <img
                  v-if="job.entity?.logo"
                  :src="job.entity?.logo"
                  alt="Company Logo"
                  class="w-32 h-24"
                />
                <p v-else>
                  <img
                    src="https://www.hahu.jobs/images/logo_150.png"
                    alt="Logo"
                    class="w-32 h-24"
                  />
                </p>
                <p class="md:mt-2 mt-3">
                  {{ truncateText(job.entity?.name, 10) }}
                </p>
              </div>
              <!-- Job Details -->
              <div class="py-1 mb-[3px] px-3 md:px-0">
                <p
                  class="font-bold mb-2 mt-3 md:mt-0 lg:text-[14px] md:text-[20px] flex items-center"
                >
                  {{ truncateText(job.position?.name, 25) }}
                </p>
                <div class="leading-7 md:ml-3 lg:ml-0">
                  <p class="flex items-center gap-2 mb-1 md:mb-[5px] lg:mb-0">
                    <img
                      src="https://www.hahu.jobs/images/sectors/natural-science.png"
                      alt="Sectors name"
                      class="md:w-[18px] md:h-[13px] w-[20px] h-[20px]"
                    />
                    <span class="md:text-[18px] lg:text-[13px] text-[17px]">
                      {{ job?.sub_sector?.sector?.name }}
                    </span>
                  </p>
                  <p class="flex gap-3 items-center mb-1 md:mb-[5px] lg:mb-0">
                    <img
                      src="https://www.hahu.jobs/icons/job/job-type.svg"
                      alt="Job-type"
                      class="md:w-[16px] md:h-[12px] w-[20px] h-[20px]"
                    />
                    <span class="md:text-[18px] lg:text-[13px] text-[17px]">{{
                      job?.sub_sector?.name
                    }}</span>
                  </p>
                  <p class="flex gap-1 mb-1 md:mb-0">
                    <svg
                      data-v-a5575039=""
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      class="w-5 h-5 md:w-4 mr-1.5 text-teal-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      class="md:text-[18px] lg:text-[12px] text-[17px] mb-1 md:mb-0"
                      v-if="job.job_cities.length > 0"
                    >
                      {{
                        job.job_cities.map((city) => city.city?.name).join(", ")
                      }}
                    </span>
                    <span
                      v-else
                      class="text-[12px] lg:text-[12px] md:text-[18px]"
                      >Addis Ababa
                    </span>
                  </p>
                  <p class="flex gap-1 mb-1 md:mb-0">
                    <svg
                      data-v-a5575039=""
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      class="w-5 h-5 mr-2 md:w-4 text-teal-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z"
                      ></path>
                    </svg>
                    <span class="md:text-[18px] text-[17px] lg:text-[14px]">
                      {{ job.years_of_experience }}
                      <span v-if="job.max_years_of_experience"
                        >-{{ job.max_years_of_experience }}</span
                      >
                      years
                    </span>
                  </p>

                  <p class="flex gap-1">
                    <svg
                      data-v-a5575039=""
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      class="w-5 h-5 mr-2 sm:w-4 text-teal-600"
                    >
                      <path
                        d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z"
                      ></path>
                    </svg>
                    <span class="md:text-[16px] text-[17px] lg:text-[13px]">
                      {{
                        job.position?.sub_sectors_positions_aggregate?.aggregate
                          .count
                      }}
                      positions
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p class="flex justify-center items-center mb-4">
              <span
                class="bg-teal-600 justify-center items-centertext-xs md:rounded-xl flex sm:w-24 md:gap-2 gap-3 md:py-[3px] py-[8px] mt-2 w-[108px] rounded-full"
              >
                <img
                  src="https://www.hahu.jobs/icons/time-person.svg"
                  alt=""
                  class="md:w-[14px] md:h-[14px] w-[16px] h-[16px]"
                />
                <span class="md:text-[12px] text-white text-[16px]">{{
                  correctTypeNm(job.type)
                }}</span>
              </span>
            </p>
            <p class="border-t-[1px] border-gray-500 mb-2"></p>
            <!-- Job Description -->
            <div
              class="text-[14px] md:text-[18px] lg:text-[14px] mb-4"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-500'
                  : 'text-gray-300',
              ]"
            >
              {{ truncateText(job.summary, 170) }}
            </div>
            <div class="mt-4 mb-4 flex gap-2 justify-center">
              <button
                :class="[
                  colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800',
                ]"
                class="sm:px-4 sm:text-[12px] sm:py-[7px] px-5 py-[9px] border border-teal-500 text-teal-500 font-medium rounded-md hover:bg-teal-100 transition duration-300 ease-in-out"
              >
                Read More
              </button>
              <button
                class="sm:px-2 px-[14px] py-[1px] border border-teal-500 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-500 transition duration-300 ease-in-out"
              >
                Apply Now
              </button>
            </div>
            <!-- Job Footer -->

            <div
              class="absolute bottom-0 left-0 w-full px-4 py-2 flex justify-between items-center"
            >
              <!-- View Icon and Count -->
              <div class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-gray-500'
                      : 'text-white',
                  ]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span
                  class="ml-2 lg:text-sm text-sm md:text-[16px]"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-gray-500'
                      : 'text-gray-300 text-[12px]',
                  ]"
                  >{{ job.total_view_count }}</span
                >
              </div>

              <!-- Share Icon -->
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-gray-500 hover:text-teal-500'
                      : 'text-white hover:text-teal-500 ',
                  ]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
