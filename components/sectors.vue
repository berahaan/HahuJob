<script setup>
const colorStore = useColorModeStore();
</script>
<template>
  <div>
    <h1
      :class="[
        'sm:font-bold lg:font-black p-2 flex font-bold justify-center lg:text-4xl text-3xl text-gray-600 mt-20',
        colorStore.colorMode === 'light' ? '' : 'text-white',
      ]"
    >
      Career sectors
    </h1>
    <p
      :class="[
        'mt-3 sm:mb-8 mb-5 ml-6 p-3 sm:ml-0 font-[500]  items-center text-balance sm:font-bold text-sm sm:text-gray-500 flex justify-center',
        colorStore.colorMode === 'light' ? 'text-gray-600' : 'text-white',
      ]"
    >
      Based on the local labor market trend in Ethiopia we categorize our
      vacancies into fourteen sectors
    </p>
  </div>
  <div
    class="sm:ml-6 ml-[5px] grid lg:grid-cols-7 md:grid-cols-5 grid-cols-2 gap-2 lg:gap-4"
  >
    <!-- Card 1: Natural Science -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="sm:ml-4 ml-2 p-2">
        <img
          src="https://www.hahu.jobs/images/sectors_big/natural-science.svg"
          alt="natural science"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-2"
        />
        <p class="text-teal-600 md:mt-1 font-bold sm:text-[17px] text-[11px]">
          Natural science
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          12 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 2: Business -->
    <div
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
    >
      <div class="lg:ml-4 ml-2 px-2">
        <img
          src="https://www.hahu.jobs/images/sectors_big/business.svg"
          alt="business"
          class="sm:w-32 lg:mt-3 sm:h-20 w-14 h-10 ml-3 sm:ml-0"
        />
        <p class="text-teal-600 font-bold ml-4 lg:ml-7 sm:text-lg text-[11px]">
          Business
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          22 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 3: Creative Arts -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="lg:ml-4 ml-2 p-2">
        <img
          src="https://www.hahu.jobs/images/sectors_big/creative-art.svg"
          alt="creative arts"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-2"
        />
        <p class="text-teal-600 font-bold ml-4 lg:ml-5 sm:text-lg text-[11px]">
          Creative Arts
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          12 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 4: Education -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="lg:ml-4 ml-2 p-2">
        <img
          src="https://www.hahu.jobs/images/sectors_big/education.svg"
          alt="education"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-2"
        />
        <p class="text-teal-600 font-bold ml-4 lg:ml-6 sm:text-lg text-[11px]">
          Education
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          12 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 5: Hospitality -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="lg:ml-6 ml-2 p-2">
        <img
          src="https://www.hahu.jobs/images/sectors_big/hospitality.svg"
          alt="hospitality"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-2 sm:ml-0 lg:mt-2"
        />
        <p class="text-teal-600 font-[700] ml-3 sm:text-lg text-[11px]">
          Hospitality
        </p>
        <p
          class="font-normal ml-1 sm:ml-0 mt-4 sm:mt-2 text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          20 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 6: Low and Medium Skilled Worker -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="lg:ml-6 ml-2 p-[1px]">
        <img
          src="https://www.hahu.jobs/images/sectors_big/low-and-medium-skilled-work.svg"
          alt="Low and Medium Skilled Worker"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0"
        />
        <p class="text-teal-600 font-[700] ml-4 sm:text-[16px] text-[10px]">
          Low and Medium Skilled Worker
        </p>
        <p
          class="font-normal sm:mb-0 mt-4 ml-3 sm:ml-0 sm:mt-0 text-slate-700 sm:text-base text-[10px]"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          61 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 7: Transportation & Logistics -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="http://hahu.jobs/images/sectors_big/transport-and-logistics.svg"
          alt="Transport and logistics"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0"
        />
        <p
          class="text-teal-600 font-[700] sm:ml-4 ml-1 sm:text-[16px] text-[10px]"
        >
          Transportation & Logistics
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          12 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 8: Engineering -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/engineering.svg"
          alt="Engineering"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p
          class="text-teal-600 font-[750] lg:mt-2 ml-4 lg:ml-6 sm:text-[17px] text-[10px]"
        >
          Engineering
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          150 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 9: Finance -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/finance.svg"
          alt="Finance"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p
          class="text-teal-600 font-[790] lg:mt-2 ml-4 lg:ml-8 sm:text-[17px] text-[10px]"
        >
          Finance
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          120 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 10: Legal Services -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/legal-service.svg"
          alt="Legal services"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p
          class="text-teal-600 font-[790] lg:mt-2 ml-4 lg:ml-5 sm:text-[17px] text-[10px]"
        >
          Legal services
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          12 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 11: ICT -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/ict.svg"
          alt="ICT"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p
          class="text-teal-600 font-[790] lg:mt-1 ml-8 lg:ml-14 sm:text-[16px] text-[10px]"
        >
          ICT
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          15 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 12: Health Care -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/health-care.svg"
          alt="Health care"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p
          class="text-teal-600 font-[790] lg:mt-2 ml-4 lg:ml-8 sm:text-[17px] text-[10px]"
        >
          Health care
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          12 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 13: Manufacturing -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/manufacturing.svg"
          alt="manufacturing"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p class="text-teal-600 font-bold ml-4 sm:text-lg text-[11px]">
          Manufacturing
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          1 Open Positions
        </p>
      </div>
    </div>

    <!-- Card 14: Social Services -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white'
          : 'bg-gray-800 border-none',
      ]"
      class="border w-[128px] md:w-48 md:h-[186px] h-auto p-2 flex flex-col shadow-md hover:shadow-2xl rounded-lg"
    >
      <div class="ml-4">
        <img
          src="https://www.hahu.jobs/images/sectors_big/social-science.svg"
          alt="social services"
          class="sm:w-32 sm:h-20 w-14 h-10 ml-3 sm:ml-0 lg:mt-3"
        />
        <p
          class="text-teal-600 font-[790] lg:mt-1 ml-4 lg:ml-8 sm:text-[17px] text-[10px]"
        >
          Social Services
        </p>
        <p
          class="mt-2 font-normal text-slate-700 sm:text-base text-[10px] mb-4"
          :class="colorStore.colorMode === 'light' ? '' : 'text-white'"
        >
          10 Open Positions
        </p>
      </div>
    </div>
  </div>
</template>
