<script setup>
import { ref } from "vue";
const colorStore = useColorModeStore();
const activeIndex = ref(0);
const cards = ref([
  {
    id: 1,
    date: "3 Nov 2024",
    title: "STEEP Launching Program Ethiopian",
    content:
      "We have successfully held a launching of the STEM Education for Empowerment Project (STEEP) in Ethiopia. The project will enhance the interest, skills, and confidence of adolescent girls...",
    image:
      "https://res.cloudinary.com/hahu-io/image/upload/v1733253049/hahuIO/images/blogs/fifth_wlgrif.jpg",
  },
  {
    id: 2,
    date: "10 Nov 2024",
    title: "Tech Summit 2024",
    content:
      "Join us for the Tech Summit 2024 to explore groundbreaking innovations and network with tech leaders from around the world.",
    image:
      "https://cdn.hahu.jobs/public/aggregator/hahujobs/1cf6eec9b5520b2e825c82d054f7e309af66e9d09b97ccde36f804039da87d7e6e9189b28ddd4a0175b3e400560de4956679.webp",
  },
  {
    id: 3,
    date: "20 Nov 2024",
    title: "Job Fair Event",
    content:
      "We are organizing a job fair to connect talented professionals with leading organizations. Don’t miss this opportunity!",
    image:
      "https://res.cloudinary.com/db90fgpov/image/upload/v1671355648/HaHuJobs/Blogs/hahujobs-employment-center-launch_dxmzg5.jpg",
  },
  {
    id: 4,
    date: "25 Nov 2024",
    title: " Bootcamp Graduation",
    content: "Celebrate the achievements of software developers.",
    image:
      "https://res.cloudinary.com/db90fgpov/image/upload/v1671355915/HaHuJobs/Blogs/vacancy_post_ps61tz.jpg",
  },
  {
    id: 5,
    date: "25 Nov 2024",
    title: "Coding Bootcamp Graduation",
    content:
      "Celebrate the achievements of our bootcamp graduates and learn about their journey to becoming software developers.",
    image:
      "https://res.cloudinary.com/db90fgpov/image/upload/v1671355890/HaHuJobs/Blogs/new_year_gift_thumbnail_d2cv9c.jpg",
  },
]);
const breakpoints = {
  640: { itemsToShow: 1 },
  1024: { itemsToShow: 2 },
  1122: { itemsToShow: 2.25 },
  1280: { itemsToShow: 3.4 },
};
</script>

<template>
  <section
    class="flex flex-col-reverse lg:flex-row lg:justify-between lg:p-8 p-4"
  >
    <div class="lg:w-[27rem] w-full lg:ml-20 p-2">
      <h1
        class="font-extrabold sm:text-[28px] text-[24px] flex justify-center lg:text-4xl text-gray-600 mt-8"
        :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
      >
        What makes us standout from the rest
      </h1>
      <p
        class="font-semibold text-[14px] lg:text-[13px] mt-4 lg:w-[29rem]"
        :class="[
          colorStore.colorMode === 'light' ? 'text-gray-700' : 'text-white',
        ]"
      >
        HaHuJobs Primary services are deployments targeting the needs of the
        Ethiopian jobseeker, with both online and assisted models the platform
        is tool intended to assist the process of looking for a job at all
        levels of employment. It features vacancy aggregation and posting from
        various sources as well as enterprises, builds career profiles, apply
        for jobs, and subscribe to customized alerts for each user via a channel
        of their choice. HaHuJobs primary also offers standardized
        classification of all vacancies both sourced from HaHuJobs enterprise
        services and other manual and digital vacancy platforms.
      </p>
      <p
        class="font-semibold text-[14px] lg:text-[13px] mt-4 lg:w-[29rem]"
        :class="[
          colorStore.colorMode === 'light' ? 'text-gray-700' : 'text-white',
        ]"
      >
        Our vacancy classification follows a combination of ILOs ISCO 8 and the
        O*Net occupation classification with modifications to the Ethiopian
        labor market trend. Each vacancy will be given a four-digit occupation
        taxonomy identification code to determine it's overall standard
        requirements in terms of skill, knowledge, ability, and expected
        activities.
      </p>
      <p
        class="font-semibold text-[14px] ml-2 sm:ml-0 lg:text-[13px] mt-6 lg:w-[29rem]"
        :class="[
          colorStore.colorMode === 'light' ? 'text-gray-700' : 'text-white',
        ]"
      >
        Get Social with us !
      </p>
      <div class="sm:mt-4 mt-2 w-40 sm:ml-9 ml-1 lg:ml-0">
        <button
          class="bg-teal-600 text-gray-100 sm:px-4 px-6 py-3 sm:py-2 flex sm:items-center gap-4 sm:text-[10px] font-semibold text-[12px] rounded-md hover:bg-teal-700 transition-colors duration-300"
        >
          <span> Explore more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
      <div class="mt-4 flex gap-8 lg:ml-0 ml-4">
        <a href="https://t.me/Hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/telegram.svg"
            alt="Hahu telegram"
            class="sm:w-4 sm:h-4 w-6 h-6"
          />
        </a>
        <a href="https://www.facebook.com/Hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/facebook-circular.svg"
            alt="Hahu facebook"
            class="sm:w-4 sm:h-4 w-6 h-6"
          />
        </a>
        <a href="https://twitter.com/hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/x.svg"
            alt="Hahu Twitters"
            class="sm:w-4 sm:h-4 w-6 h-6"
          />
        </a>
        <a href="https://www.linkedin.com/company/hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/linkedin_color.svg"
            alt="Hahu Linkedin"
            class="sm:w-4 sm:h-4 w-6 h-6"
          />
        </a>
      </div>
    </div>
    <div
      class="lg:w-96 w-[95%] py-4 lg:mt-[8rem] mt-2 lg:mr-56 lg:ml-20 ml-2 text-sm"
    >
      <img
        class="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
        src="https://www.hahu.jobs/images/hahu_robot.svg"
        alt="Specialized robots Images"
      />
    </div>
  </section>

  <section
    class="flex flex-col lg:flex-row items-center sm:p-8 p-2 mt-5 sm:mb-16 mb-0.5"
    id="about"
  >
    <div class="sm:w-96 w-[14rem] sm:mt-[8rem] mt-3 sm:mr-56 mr-2">
      <img
        class="object-cover transition-transform duration-300 hover:scale-110 sm:ml-6 ml-1"
        src="https://www.hahu.jobs/_vercel/image?url=%2Fimages%2Fkeyboard.svg&w=768&q=100"
        alt="Keyboard images"
      />
    </div>
    <div class="lg:w-[27rem] w-[80%] sm:ml-20 ml-0">
      <h1
        class="font-extrabold flex sm:text-3xl text-2xl lg:text-4xl text-gray-600 mt-8"
        :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
      >
        Why choose us
      </h1>
      <p class="text-teal-600 font-black sm:text-2xl text-xl mt-4">
        Convenience
      </p>
      <p class="text-teal-600 font-bold sm:text-lg text-[15px] mt-1">
        You no longer look for jobs, jobs look for you
      </p>
      <p
        class="text-gray-800 font-normal mt-4 sm:w-[36rem] w-auto text-sm"
        :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
      >
        We offer aggregated, standardized and quality assure vacancy and
        career-related information from various digital as well as manual
        sources to set them into one searchable database.
      </p>
      <div>
        <p class="text-teal-600 font-bold sm:text-2xl text-xl mt-4">
          Accessibility
        </p>
        <p class="text-teal-600 font-bold sm:text-lg text-[15px] mt-1">
          Reachable across multiple channels and platforms
        </p>
        <p
          class="text-gray-800 font-normal mt-4 sm:w-[36rem] w-auto text-sm"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Use your mobile, tablet, or desktop to access our website, mobile app,
          Telegram, or Facebook bots and also get personalized job alerts via
          your designated medium.
        </p>
      </div>
      <div>
        <p class="text-teal-600 font-bold sm:text-2xl text-xl mt-4">
          Ease of use
        </p>
        <p class="text-teal-600 font-bold sm:text-lg text-[15px] mt-1">
          Both online and offline service options.
        </p>
        <p
          class="text-gray-800 font-normal mt-4 sm:w-[36rem] w-auto text-sm"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          HaHuJobs offers both in-person as well as virtual models for all its
          career-related service components through its employment offices
          across the nation and capital Addis Ababa.
        </p>
      </div>
    </div>
  </section>
  <section
    id="post-vacancy"
    class="flex flex-col items-center bg-gray-50 p-2 sm:p-8 lg:flex-row lg:justify-between"
    :class="colorStore.colorMode === 'light' ? '' : 'bg-gray-800'"
  >
    <!-- Left image container -->
    <div
      class="w-full md:w-3/5 lg:w-auto lg:mt-[3rem] lg:mr-56 md:mr-20 text-sm"
    >
      <img
        class="object-cover w-full h-full md:ml-14"
        :src="
          colorStore.colorMode === 'light'
            ? '/images/hahu.png'
            : '/images/hahujob.png'
        "
        alt="Keyboard images"
      />
    </div>

    <!-- Right text container -->
    <div class="w-full md:w-full lg:w-[40rem] mt-6 lg:mt-2 lg:ml-10 ml-2">
      <h1
        class="font-extrabold flex text-3xl lg:text-4xl ml-6 md:ml-[8rem]"
        :class="
          colorStore.colorMode === 'light' ? 'text-gray-600' : 'text-white'
        "
      >
        Post vacancy
      </h1>
      <p
        class="font-[400] mt-4 sm:p-2 px-5 py-3 lg:text-lg text-[17px] w-full lg:w-[37rem]"
        :class="
          colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white'
        "
      >
        HaHuJobs offers dedicated enterprise cloud services for a full human
        resource management platform with an affordable price package. Posting
        vacancy is completely free, and only requires to follow the below listed
        steps.
      </p>
      <div class="flex flex-col gap-4 p-2 mt-5 lg:hidden">
        <div>
          <div class="flex items-center">
            <h1
              class="font-bold text-gray-600 sm:text-4xl text-6xl"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              01
            </h1>
            <span
              class="font-semibold text-gray-700 ml-2 md:mt-4 mt-8"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              Recieve
            </span>
          </div>
          <p
            class="text-[16px] mt-3"
            :class="
              colorStore.colorMode === 'light'
                ? 'text-gray-500 font-normal'
                : 'text-white'
            "
          >
            You contact us through one of our outlets with the details of your
            vacancy. You can click the button below to review ways to share your
            vacancy and review the required information we need to publish your
            vacancy on all our outlets.
          </p>
        </div>

        <div>
          <div class="flex items-center">
            <h1
              class="font-bold text-gray-600 sm:text-4xl text-6xl"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              02
            </h1>
            <span
              class="font-semibold text-gray-700 ml-2 md:mt-4 mt-8"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              Validate
            </span>
          </div>
          <p
            class="text-[16px] mt-3"
            :class="
              colorStore.colorMode === 'light'
                ? 'text-gray-500 font-normal'
                : 'text-white'
            "
          >
            Our service officers will receive the details from your organization
            via the channel you communicated it in. They will review the details
            provided to validate all required information is available and build
            validate the legitimacy of the vacancy.
          </p>
        </div>
      </div>

      <!-- Large screen layout: side-by-side -->
      <div class="hidden lg:flex justify-between w-full gap-4 p-2 mt-5">
        <!-- Step 1 -->
        <div>
          <div class="flex items-center">
            <h1
              class="font-bold text-gray-600 text-6xl"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              01
            </h1>
            <span
              class="font-semibold text-gray-700 ml-2 mt-10"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              Recieve
            </span>
          </div>
          <p
            class="text-gray-500 mt-4 text-xs"
            :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
          >
            You contact us through one of our outlets with the details of your
            vacancy.
          </p>
        </div>
        <!-- Step 2 -->
        <div>
          <div class="flex items-center">
            <h1
              class="font-bold text-gray-600 text-6xl"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              02
            </h1>
            <span
              class="font-semibold text-gray-700 ml-2 mt-10"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              Validate
            </span>
          </div>
          <p
            class="text-gray-500 mt-4 text-xs"
            :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
          >
            Our service officers will review the details provided to validate
            your vacancy.
          </p>
        </div>
      </div>

      <!-- Next row: Publish and Sign up button -->
      <!-- Mobile/Medium layout -->
      <div class="flex flex-col gap-4 p-2 mt-4 lg:hidden">
        <div>
          <div class="flex items-center">
            <h1
              class="font-bold text-gray-600 sm:text-4xl text-6xl"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              03
            </h1>
            <span
              class="font-semibold text-gray-700 ml-2 md:mt-4 mt-8"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              Publish
            </span>
          </div>
          <p
            class="text-[16px] mt-3"
            :class="
              colorStore.colorMode === 'light'
                ? 'text-gray-500 font-normal'
                : 'text-white'
            "
          >
            All vacancy details will then go through our standardized
            categorization process for taxonomy identification and
            reorganization of information if required so it fits the publishing
            structure of our outlets, then will be approved for publishing.
          </p>
        </div>
        <div class="flex flex-col items-center">
          <p
            class="text-gray-500 mt-2 text-[16px]"
            :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
          >
            Sign up to HaHu Jobs Enterprise
          </p>
          <img
            src="https://www.hahu.jobs/_vercel/image?url=%2Ficons%2Fdownward-arrow.svg&w=321&q=100"
            alt="downward arrow"
            class="w-14 h-28"
          />
          <button
            class="bg-teal-600 text-gray-100 p-3 flex gap-3 text-sm font-semibold rounded-md hover:bg-teal-700 transition-colors duration-300 items-center justify-center"
          >
            <span> Post vacancy </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <!-- Large screen layout: side-by-side -->
      <div class="hidden lg:flex w-full p-2 mt-4 items-center gap-10">
        <div class="w-[20rem]">
          <div class="flex items-center">
            <h1
              class="font-bold text-gray-600 text-6xl"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              03
            </h1>
            <span
              class="font-semibold text-gray-700 ml-2 mt-10"
              :class="colorStore.colorMode === 'light' ? '' : 'text-teal-600'"
            >
              Publish
            </span>
          </div>
          <p
            class="text-gray-500 mt-4 text-xs"
            :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
          >
            Vacancy details go through our categorization process and are
            approved for publishing.
          </p>
        </div>
        <div class="flex flex-col items-start">
          <p
            class="text-gray-500 mt-4 text-xs"
            :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
          >
            Sign up to HaHu Jobs Enterprise
          </p>
          <img
            src="https://www.hahu.jobs/_vercel/image?url=%2Ficons%2Fdownward-arrow.svg&w=321&q=100"
            alt="downward arrow"
            class="w-14 h-28"
          />
          <button
            class="bg-teal-600 text-gray-100 p-3 flex gap-3 text-sm font-semibold rounded-md hover:bg-teal-700 transition-colors duration-300 items-center justify-center"
          >
            <span> Post vacancy </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="flex justify-center lg:mt-20 mt-6">
      <div class="mb-10">
        <h1
          class="font-extrabold flex lg:text-4xl text-[28px] text-gray-600 mt-8 justify-center"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Our Latest Statistics
        </h1>
        <div class="flex justify-between lg:w-[30rem] w-[10rem] mt-6 ml-3">
          <div>
            <p class="text-teal-600 font-bold lg:text-4xl text-3xl">623</p>
            <span
              class="text-gray-600 font-bold flex items-center"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >Enterprise</span
            >
          </div>
          <div>
            <p class="text-teal-600 font-bold lg:text-4xl ml-3 text-3xl">
              15.8k
            </p>
            <span
              class="text-gray-600 font-bold flex items-center ml-6"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >Users</span
            >
          </div>
          <div>
            <p
              class="text-teal-600 font-bold lg:text-4xl text-3xl ml-10 lg:ml-0"
            >
              63
            </p>
            <span
              class="text-gray-600 font-bold ml-1 lg:ml-0"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >Opportunity</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  -->
  <section
    :class="[
      'mt-4 p-4 relative',
      colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800',
    ]"
  >
    <div class="mt-[42px]">
      <h1
        class="font-extrabold flex md:text-4xl text-3xl text-gray-600 mt-8 justify-center mb-12 lg:mb-10"
        :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
      >
        News & Events
      </h1>
    </div>
    <div
      :class="[colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800']"
      class="hidden sm:block absolute top-0 mr-8 backdrop-blur-lg lg:top-[138px] left-0 h-[30rem] lg:h-[540px] w-20 lg:w-[3rem] z-40"
    ></div>

    <div
      :class="[colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800']"
      class="absolute hidden sm:block top-0 backdrop-blur-lg lg:top-[138px] right-0 h-[550px] lg:h-[540px] w-20 lg:w-[8rem] z-40"
    ></div>

    <Carousel
      :breakpoints="breakpoints"
      :wrap-around="true"
      :spacing="10"
      :autoplay="0"
      :transition="1000"
      snapAlign="start"
      @update:modelValue="activeIndex = $event"
      v-model="activeIndex"
      class="relative"
    >
      <Slide v-for="card in cards" :key="card.id">
        <div
          class="w-96 h-[540px] cursor-grabbing border rounded-lg flex flex-col overflow-hidden"
        >
          <!-- Image (Uniform Size) -->
          <div class="w-full h-[250px]">
            <img
              :src="card.image"
              :alt="card.title"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Content Wrapper (Uniform Height) -->
          <div class="flex-grow flex flex-col p-4">
            <p>
              <button
                class="bg-teal-400 py-1 px-4 text-black text-[10px] rounded-full"
              >
                HaHujobs News
              </button>
            </p>
            <p
              class="text-sm text-gray-500 mt-4"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
            >
              {{ card.date }}
            </p>
            <h1
              class="font-bold text-lg text-gray-900 mt-4"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
            >
              {{ card.title }}
            </h1>
            <p
              class="text-sm text-gray-700 font-normal mt-2 flex-grow"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
            >
              {{ card.content }}
            </p>

            <!-- Read Post Button (Always at Bottom) -->
            <p class="flex justify-center mt-6">
              <button
                class="bg-teal-600 text-gray-100 px-4 py-2 rounded-lg flex items-center justify-center"
              >
                <span> Read post </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 ml-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </p>
          </div>
        </div>
      </Slide>

      <!-- Pagination Buttons -->
      <template #addons>
        <div
          class="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          <button
            v-for="(job, index) in cards"
            :key="'dash-' + index"
            @click="activeIndex = index"
            class="w-3 h-[3px] rounded transition-all duration-300"
            :class="activeIndex === index ? 'bg-teal-500 w-3' : 'bg-gray-300'"
          ></button>
        </div>
      </template>
    </Carousel>

    <div
      :class="[
        'mt-10  mb-6',
        colorStore.colorMode === 'light' ? '' : 'bg-gray-800',
      ]"
    >
      <p class="mt-4 flex justify-center">
        <button
          class="bg-teal-600 text-gray-100 px-4 py-2 rounded-lg flex items-center justify-center"
        >
          <span class="">More blogs </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 3.5L12 3.5L12 9"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 10L12 4"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </p>
    </div>
  </section>
</template>
