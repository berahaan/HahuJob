<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import BASIC_SECTORS from "~/graphql/query/BASIC_SECTORS.graphql";
import hahuLogo from "./hahuLogo.vue";
const trackJob = ref(false);
const route = useRoute();
const isMobileMenuOpen = ref(false);
const colorStore = useColorModeStore();
const GotoPage = (id) => {
  trackJob.value = false;
  navigateTo({
    path: "/jobs",
    query: {
      sid: id,
      page: 1,
    },
  });
};
const truncateText = (text, limit) => {
  if (text?.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
};

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

if (error.value) {
  console.error("Error fetching sectors:", error.value);
}
function applyBodyClass(mode) {
  document.body.classList.toggle("bg-customGreen", mode === "dark");
  document.body.classList.toggle("text-white", mode === "dark");
  document.body.classList.toggle("bg-slate-200", mode === "light");
  document.body.classList.toggle("text-black", mode === "light");
}
const GotoJobPage = async () => {
  trackJob.value = false;
  await navigateTo({
    path: "/jobs",
    query: {
      page: 1,
    },
  });
};
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
const toggleColor = () => {
  // here trying to apply color for body fields
  colorStore.toggleColorMode();
  applyBodyClass(colorStore.colorMode);
};

const handle = () => {
  document.body.classList.add("no-scroll");
  isMobileMenuOpen.value = false;
  trackJob.value = true;
};
const closeModals = () => {
  document.body.classList.remove("no-scroll");
  trackJob.value = false;
};
const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  colorStore.loadColorMode();
  applyBodyClass(colorStore.colorMode);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 shadow-slate-400 bg-opacity-90 backdrop-blur-md h-[4rem]"
  >
    <div class="lg:hidden flex items-center justify-between">
      <div class="ml-1 sm:ml-6 mt-4">
        <div v-if="colorStore.colorMode === 'light'" class="mt-1">
          <img
            src="https://www.hahu.jobs/images/Hahu_logo_footer.png"
            alt="Hahu Logo"
            class="w-full h-[28px]"
          />
        </div>
        <div v-else class="flex items-center justify-items-center">
          <hahuLogo class="w-full h-[30px]" />
        </div>
        <p
          class="lg:text-[9px] text-[16px]"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white',
          ]"
        >
          Primary
        </p>
      </div>
      <div class="flex gap-4 items-center">
        <div class="mb-[3px]">
          <button v-if="colorStore.colorMode === 'dark'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              :class="[
                colorStore.colorMode === 'light' ? 'text-white' : 'text-white',
              ]"
              @click="toggleColor"
              class="w-[20px] h-[20px] mt-2 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </button>
          <button v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.2"
              stroke="currentColor"
              class="w-[20px] h-[20px] mt-2 text-gray-600"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              @click="toggleColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </button>
        </div>
        <button @click="toggleMobileMenu" class="lg:hidden mr-2 flex">
          <svg
            v-if="!isMobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[20px] h-[20px] text-gray-600"
            :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[20px] h-[20px] text-gray-600"
            :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="hidden lg:flex justify-between items-center">
      <div class="ml-2">
        <div v-if="colorStore.colorMode === 'light'" class="ml-1 sm:ml-2 mt-4">
          <img
            src="https://www.hahu.jobs/images/Hahu_logo_footer.png"
            alt="Hahu Logo"
            class="w-[100px] h-[20px]"
          />
        </div>
        <div v-else class="mt-3 -ml-[3.6rem] mr-[4rem]">
          <hahuLogo class="mr-10" />
        </div>
        <p class="text-[9px] ml-2">Primary</p>
      </div>
      <div class="lg:flex justify-between items-center mr-4 mt-3">
        <ul
          class="flex justify-between items-center space-x-6 text-[16px] mr-4 font-normal text-gray-700"
        >
          <nuxt-link
            to="/"
            :class="[
              route.path === '/' && !route.hash
                ? 'text-teal-500 font-bold'
                : colorStore.colorMode === 'light'
                ? ''
                : 'text-gray-50',
            ]"
          >
            <li>Home</li>
          </nuxt-link>

          <nuxt-link
            to="/#about"
            :class="[
              route.hash === '#about' ? 'text-teal-500 font-extrabold' : '',
              colorStore.colorMode === 'light'
                ? ''
                : 'text-gray-50 hover:text-teal-500',
            ]"
          >
            <li>About</li>
          </nuxt-link>

          <li
            @click="handle"
            class="cursor-pointer"
            :class="[
              route.path.startsWith('/jobs')
                ? 'text-teal-600 font-extrabold'
                : '',
              colorStore.colorMode === 'light'
                ? ''
                : 'text-gray-50 hover:text-teal-500',
            ]"
          >
            Jobs
          </li>

          <nuxt-link
            to="/#post-vacancy"
            :class="[
              route.hash === '#post-vacancy'
                ? 'text-teal-500 font-extrabold'
                : '',
              colorStore.colorMode === 'light'
                ? ''
                : 'text-gray-50 hover:text-teal-500',
            ]"
          >
            <li>Post Vacancy</li>
          </nuxt-link>

          <a
            href="https://www.hahujobs.io/#contact"
            class="group flex items-center hover:text-teal-500"
            :class="[
              colorStore.colorMode === 'light'
                ? ''
                : 'text-white hover:text-teal-500',
            ]"
          >
            <li>Contact</li>
            <!-- Arrow element that shows on hover -->
            <span
              class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              →
            </span>
          </a>
          <p>
            <button v-if="colorStore.colorMode === 'dark'">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
                @click="toggleColor"
                class="w-5 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            </button>
            <button v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.2"
                stroke="currentColor"
                class="size-4"
                :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
                @click="toggleColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            </button>
          </p>
        </ul>
        <div class="flex items-center space-x-2 mr-2 text-sm">
          <button
            class="bg-teal-600 text-white rounded px-3 py-1 text-xs hover:bg-teal-500 hover:text-gray-700 transition"
          >
            Login
          </button>
          <span>or</span>
          <button
            class="bg-teal-600 text-white rounded px-3 py-1 text-xs hover:bg-teal-500 hover:text-gray-700 transition"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </header>

  <div
    v-if="isMobileMenuOpen"
    class="lg:hidden fixed top-14 left-0 w-full min-h-[20rem] backdrop-blur-lg opacity-95 z-50"
  >
    <div class="py-4">
      <ul
        class="flex text-[16px] mr-4 flex-col gap-1 font-normal text-gray-700"
      >
        <nuxt-link
          @click="closeMenu"
          to="/"
          :class="[
            'text-teal-600 sm:text-[12px] text-[16px] flex gap-3 font-bold',
            route.path === '/' && !route.hash
              ? 'text-teal-600 text-[13px] '
              : 'text-white',
            colorStore.colorMode === 'light' ? '' : 'text-white',
          ]"
        >
          <span
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-teal-600 border-teal-600'
                : 'bg-cyan-400 text-white border-cyan-400',
            ]"
            class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
          ></span>
          <li class="mt-2">Home</li>
        </nuxt-link>
        <nuxt-link
          to="/#about"
          @click="closeMenu"
          :class="[
            'flex gap-2  sm:text-[12px] text-[16px] font-bold',
            route.hash === '#about'
              ? 'text-teal-500 font-bold'
              : colorStore.colorMode === 'light'
              ? 'text-gray-700 font-medium'
              : 'text-white',
          ]"
        >
          <span
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-teal-700 border-teal-700'
                : 'bg-cyan-400 text-white border-cyan-400',
            ]"
            class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
          ></span>
          <li class="mt-2">About</li>
        </nuxt-link>

        <li
          @click="handle"
          class="cursor-pointer"
          :class="[
            'flex gap-2 sm:text-[12px] text-[16px] font-bold ',
            colorStore.colorMode === 'light'
              ? 'text-gray-700 font-medium'
              : 'text-white',
          ]"
        >
          <span
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-teal-700 border-teal-700'
                : 'bg-cyan-400 text-white border-cyan-400',
            ]"
            class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
          ></span>
          <span class="mt-2">Jobs</span>
        </li>

        <nuxt-link
          to="/#post-vacancy"
          @click="closeMenu"
          :class="[
            'flex gap-2 sm:text-[12px] text-[16px] font-bold',
            route.hash === '#post-vacancy'
              ? 'text-teal-500 font-bold'
              : colorStore.colorMode === 'light'
              ? 'text-gray-700 font-medium'
              : 'text-white',
          ]"
        >
          <span
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-teal-700 border-teal-700'
                : 'bg-cyan-400 text-white border-cyan-400',
            ]"
            class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
          ></span>
          <li class="mt-2">Post Vacancy</li>
        </nuxt-link>
        <nuxt-link
          to="/contact"
          class="flex gap-2 sm:text-[12px] text-[16px] font-bold"
          :class="[
            colorStore.colorMode === 'light'
              ? 'text-gray-700 font-medium'
              : 'text-white',
          ]"
        >
          <span
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-teal-700 border-teal-700'
                : 'bg-cyan-400 text-white border-cyan-400',
            ]"
            class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
          ></span>
          <li class="mt-2">Contact</li>
        </nuxt-link>
        <li
          class="py-3 flex flex-col gap-4"
          :class="[
            colorStore.colorMode === 'light'
              ? 'border border-gray-300 '
              : 'border-t-[1px] border-white',
          ]"
        >
          <p>
            <button
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-400 font-medium'
                  : 'text-white',
              ]"
              class="rounded text-gray-600 py-1 text-xs transition text-[12px] flex gap-2 font-bold"
            >
              <span
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'bg-teal-700 border-teal-700'
                    : 'bg-cyan-400 text-white border-cyan-400',
                ]"
                class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
              ></span>
              <span class="mt-2 sm:text-[12px] text-[16px]"> Login </span>
            </button>
          </p>
          <p>
            <button
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-600 font-medium'
                  : 'text-white',
              ]"
              class="rounded text-gray-600 py-1 text-xs transition text-[12px] flex gap-2 font-bold"
            >
              <span
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'bg-teal-700 border-teal-700'
                    : 'bg-cyan-400 text-white border-cyan-400',
                ]"
                class="border sm:w-[2px] sm:py-4 sm:h-6 font-bold w-[3px] h-10"
              ></span>
              <span class="mt-2 sm:text-[12px] text-[16px]"> Sign up </span>
            </button>
          </p>
        </li>
      </ul>
    </div>
  </div>

  <div
    v-if="trackJob"
    class="h-[140rem] fixed top-0 inset-0 left-0 right-0 w-full z-50 bg-opacity-0 backdrop-blur-sm overflow-hidden"
  >
    <div
      :class="[colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800']"
      class="relative top-6 mx-auto h-[90vh] max-h-[98vh] md:w-[88rem] w-[17rem] z-50 overflow-y-auto md:overflow-hidden"
    >
      <div class="md:p-6 p-4 flex md:justify-between">
        <p class="flex md:gap-6 gap-1 items-center justify-center">
          <span class="py-[6px] rounded-md px-[6px] hover:bg-cyan-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              :onclick="closeModals"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-gray-400 font-bold"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
          <span
            :class="[
              colorStore.colorMode === 'light'
                ? 'text-gray-600 font-bold'
                : 'text-white font-bold',
            ]"
            class="md:text-lg text-[14px]"
            >Jobs by sector</span
          >
        </p>
        <p>
          <button
            class="group border hover:bg-teal-600 text-teal-600 border-teal-600 ml-5 rounded-full lg:rounded-none md:px-3 py-[10px] px-[10px] flex items-center justify-center gap-2 transition-all duration-500 ease-in-out"
          >
            <span
              @click="GotoJobPage"
              class="font-bold text-xs group-hover:text-gray-800 dark:group-hover:text-gray-800"
            >
              View All
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 group-hover:text-black dark:group-hover:text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </p>
      </div>
      <div>
        <div>
          <div
            class="px-10 py-[1px] grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 mr-5 md:gap-[1px] gap-1"
          >
            <!-- Job Sectors -->
            <div
              v-for="(sectors, index) in basic_sectors"
              :key="sectors.id"
              @click="GotoPage(sectors.id)"
              :class="[index >= 8 ? 'md:col-span-1' : '']"
            >
              <div
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'bg-gray-100'
                    : 'bg-gray-600 rounded-md',
                ]"
                class="lg:w-[320px] cursor-pointer w-[220px] lg:h-[7rem] h-auto flex md:py-6 md:px-6 mb-2 group transition-all duration-200 py-3 px-3"
              >
                <div
                  :class="[
                    colorStore.colorMode === 'light' ? '' : 'bg-cyan-200',
                  ]"
                  class="h-[32px] mt-5 px-1 py-1 rounded-md mr-2"
                >
                  <img
                    :src="imageMapping[index]"
                    alt="Hahu images"
                    class="md:w-[40px] w-[60px] h-[21px] flex-shrink-0"
                  />
                </div>
                <div>
                  <h1
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'font-black text-gray-600'
                        : 'text-white font-bold',
                    ]"
                    class="text-[16px] mb-2 flex items-center gap-4"
                  >
                    {{ truncateText(sectors.name, 15) }}
                    <span
                      class="text-[9px] px-2 rounded-full text-teal-600 font-bold bg-green-100"
                      >37
                    </span>
                  </h1>
                  <p
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'text-gray-600'
                        : 'text-white',
                    ]"
                    class="text-xs font-normal w-auto"
                  >
                    {{ truncateText(sectors?.description, 70) }}
                  </p>
                </div>
                <div
                  class="h-4 mt-8 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 text-teal-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Image Section -->
            <div class="md:col-start-4 flex md:row-start-3 md:row-span-2">
              <div>
                <img
                  src="https://www.hahu.jobs/images/mascot-half.svg"
                  alt="hahu robots"
                  class="w-[17rem] h-[15rem]"
                />
              </div>
            </div>
          </div>
          <div class="flex justify-end right-0">
            <div class="text-[12px] font-normal text-gray-600">
              <span>Powered by</span>
            </div>
            <div class="mt-4 mr-3">
              <img
                src="https://www.hahu.jobs/images/Hahu_logo_footer.png"
                alt="Hahu logo"
                class="w-14 h-[10px]"
              />
            </div>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
<style>
.no-scroll {
  overflow: hidden;
}
</style>
