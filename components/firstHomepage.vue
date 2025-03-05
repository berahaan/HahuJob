<script setup>
import { ref } from "vue";
const reszInput = ref(false);
const colorStore = useColorModeStore();
const handleInputClick = () => {
  reszInput.value = true;
};
const checkValue = () => {
  if (reszInput.value != "") return true;
  else return false;
};
const handleContainerClick = () => {
  reszInput.value = true;
};

const handleDocumentClick = () => {
  reszInput.value = false;
};

const inputClasses = computed(() => {
  // Base classes applied to all states
  const base =
    "text-sm w-full md:ml-28 border-none outline-none p-[13px] transition-all duration-700 ease-in-out";
  // Classes for the resizing state
  const resizeClasses = reszInput.value
    ? "lg:w-auto md:w-[60%] bg-transparent font-bold md:ml-[3rem] placeholder:text-gray-300 lg:placeholder:text-sm placeholder:text-[11px] lg:ml-8 text-gray-400"
    : "lg:ml-8 font-bold  bg-transparent lg:placeholder:text-sm placeholder:text-[11px] placeholder:text-gray-300";

  // Classes based on the current color mode
  const colorClasses =
    colorStore.colorMode === "light"
      ? "bg-gray-50 text-gray-600 text-[14px] placeholder:text-gray-600 font-normal placeholder:font-bold placeholder:text-[15px]"
      : "bg-gray-600 text-white placeholder:font-bold placeholder:text-[16px]";

  // Combine all classes in the desired order. Later classes in the string can override earlier ones.
  return [base, resizeClasses, colorClasses].join(" ");
});
// Attach and detach the document click listener
onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>

<template>
  <div class="text-center mt-28">
    <h1
      class="sm:font-black text-4xl mt-8 font-[700]"
      :class="[
        colorStore.colorMode === 'light' ? 'text-slate-700' : 'text-white',
      ]"
    >
      <span>All Ethiopian Jobs in One Place.</span>
    </h1>
    <p
      class="lg:font-bold lg:text-sm sm:font-black mt-3 px-2 lg:px-0 font-[700]"
      :class="[
        colorStore.colorMode === 'light'
          ? 'text-gray-700 font-[700]'
          : 'text-gray-200',
      ]"
    >
      Find career opportunities in Ethiopia
    </p>

    <div
      class="mt-4 lg:flex lg:items-center ml-2 lg:ml-24 gap-2 lg:gap-[2px] justify-center grid grid-cols-1"
    >
      <div
        :class="[
          'flex items-center md:ml-[18rem]  lg:ml-[8px] float-right border hover:border-teal-700 transition-all duration-700 ease-in-out',
          colorStore.colorMode === 'light'
            ? 'bg-white'
            : 'bg-gray-600 border-none ',
          reszInput
            ? 'w-[95%] lg:w-[350px] md:w-[45rem] rounded-tl-lg '
            : 'w-[95%] lg:w-64 md:w-[40rem] lg:rounded-l-lg lg:rounded-r-none rounded-md',
        ]"
        @click.stop="handleContainerClick"
      >
        <input
          type="text"
          @click="handleInputClick"
          :class="inputClasses"
          placeholder="Job title, city or keyword..."
        />
      </div>

      <div class="ml-6 lg:ml-0">
        <button
          title="Search is Empty"
          :class="[
            reszInput && checkValue ? 'bg-teal-800' : '',
            'lg:bg-teal-600 md:ml-[32rem] lg:w-[9rem] md:w-[7rem] bg-teal-600 font-bold px-4 mt-3 lg:mt-0 py-3 lg:px-[6px] lg:ml-1 ml-14 lg:py-[11px] flex items-center lg:gap-4 gap-0 text-white sm:rounded-r-lg lg:rounded-l-none rounded-md',
            'lg:rounded-tr-lg ',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4 sm:w-5 sm:h-5 sm:ml-3 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <span class="text-white font-bold"> Find Job</span>
        </button>
      </div>
    </div>

    <div>
      <div
        class="flex justify-center lg:gap-[4rem] gap-[4.5rem] mt-4 text-[20px] lg:text-2xl text-teal-600 font-bold"
      >
        <p>1069<br /></p>
        <p>253 <br /></p>
        <p>14 <br /></p>
      </div>

      <div
        class="flex justify-center lg:gap-[54px] gap-[4rem] text-teal-600 font-bold lg:mr-2 mr-4"
      >
        <p
          class="text-gray-600 font-bold text-[11px] lg:text-sm ml-8 mt-0"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Jobs
        </p>

        <p
          class="text-gray-600 font-bold text-[11px] lg:text-sm"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Companies
        </p>

        <p
          class="text-gray-600 font-bold text-[11px] lg:text-sm"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Sectors
        </p>
      </div>
    </div>
    <div class="lg:mt-6 mt-10">
      <img
        src="https://cdn.hahu.jobs/public/aggregator/hahu.jobs/default-new-size.svg"
        alt="HahuPhotos"
      />
      <div class="mt-14">
        <h1
          class="lg:text-4xl text-3xl font-black text-gray-600"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Featured Jobs
        </h1>
        <p
          class="mt-6 first-letter:text-balance font-semibold text-gray-600 text-sm"
          :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
        >
          Explore our handpicked selection of top job openings. Find your dream
          career match today.
        </p>
      </div>
    </div>
  </div>
</template>
