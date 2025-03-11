<script setup>
import Vue3Slider from "vue-3-slider-component";
const colorStore = useColorModeStore();
import { correctTypeNm } from "../utils/textUtils";
const { selectRegions, selectedRegionIds } = useRegionSelected();
const { state } = useJobs();
const checkSelectedExper = () => {
  state.isSelcExpTen = !state.isSelcExpTen;
  if (state.isSelcExpTen) {
    state.holdExpTen = 10;
    console.log("Selected experience is now ::", state.holdExpTen);
  } else {
    state.holdExpTen = null;
  }
  console.log("Is selected Exp Ten ", state.isSelcExpTen);
};
const selectedButtons = ref({
  bid: false,
  contract: false,
  full_time: false,
  internship: false,
  part_time: false,
});
</script>

<template>
  <div
    class="lg:w-[20%] sticky top-0 w-full lg:px-[1px] sm:px-5 h-[64rem]"
    :class="[
      colorStore.colorMode === 'light' ? 'text-gray-500 ' : 'text-white',
    ]"
  >
    <div class="w-full p-2">
      <!--this div contains all elements under left divs-->
      <div
        class="relative flex items-center justify-between p-2"
        @click="handleFilterClicked"
      >
        <p class="text-lg font-bold flex gap-3 md:ml-5 -ml-5 md:px-2 px-0 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="lg:w-5 lg:h-5 w-6 h-6 mt-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
            />
          </svg>
          <span
            class="lg:text-[18px] md:text-lg"
            :class="[
              colorStore.colorMode === 'light'
                ? 'text-gray-700 font-bold '
                : 'text-white',
            ]"
          >
            Additional Filters</span
          >
        </p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-4 h-4 cursor-pointer"
            :class="{ 'rotate-180': state.checkFilter }"
          >
            <path d="M5 9l7 7 7-7" />
          </svg>
        </p>
      </div>

      <div v-if="state.checkFilter" class="max-h-[15rem] z-50 w-auto">
        <div
          class="lg:max-w-[15rem] md:w-[44rem] py-[1px] md:ml-auto mt-10 lg:mx-5 mx-auto"
        >
          <div class="w-[22rem] ml-3 md:w-full">
            <Vue3Slider
              v-model="state.rangeValue"
              :min="0"
              :disabled="isSelcExpTen"
              :max="10"
              :step="1"
              :height="9"
              range
              class="slider-width"
              :slider-width="600"
              :dot-size="14"
              :track-height="16"
              :tooltip="'always'"
              :lazy="true"
              :tooltip-style="{
                backgroundColor: '#0D9488',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '12px',
                padding: '2px 1px 1px 1px',
                borderRadius: '1px',
                minWidth: '18px',
              }"
              :track-style="{ backgroundColor: '#0D9488' }"
              :process-style="{
                backgroundColor: '#0D9488',
                height: '9px',
                padding: '3px 3px 3px 3px ',
                color: '#FFFFFF',
              }"
              :dot-style="{
                backgroundColor: '#0D9488',
                border: '2px solid white',
                cursor: 'grabbing',
              }"
            />
          </div>
          <div class="flex items-center justify-between mb-1">
            <p class="mt-2 md:text-sm ml-2 md:ml-0 text-[17px]">
              <span class="mr-1">0</span>-
              <span class="mr-1">{{ state.rangeValue[1] }}</span> year of
              experience
            </p>
            <p class="flex items-center mt-2 mr-2 md:mr-0">
              <span>
                <input
                  v-model="isSelcExpTen"
                  @click="checkSelectedExper"
                  type="checkbox"
                  class="w-10 mt-2 h-[17px]"
              /></span>
              <span>>10</span>
            </p>
          </div>
          <p class="border-b-[0.5px] mt-3 mb-4 border-gray-500"></p>
          <div>
            <h2 class="text-[20px] md:text-[16px]">Type</h2>
            <div
              class="mt-3 flex flex-wrap flex-shrink-0 items-center md:gap-2 gap-3"
            >
              <button
                v-for="(selected, type, index) in selectedButtons"
                :key="type"
                @click="toggleButton(type)"
                :class="[
                  'border text-sm flex items-center justify-center border-teal-400 rounded-full md:px-[5px] md:py-[1.5px] px-[9px] py-[3px]',
                  state.selectedALlJobTypes.includes(type)
                    ? 'bg-teal-500 text-white'
                    : '',
                  index >= 3 ? 'sm:basis-1/2 md:basis-auto' : '', // First 3 stay in one row, others take half width on new rows in small screens
                ]"
              >
                <p class="flex items-center justify-center mb-[1px]">
                  <span class="md:text-[13px] text-[16px]">
                    {{ correctTypeNm(type) }}
                  </span>
                  <span class="text-[12px] font-bold ml-[2px]">
                    {{ selected ? "-" : "+" }}
                  </span>
                </p>
              </button>
            </div>

            <div class="mt-7">
              <Citymap />
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-1 mt-3">
                <div
                  v-for="(region, index) in selectRegions"
                  :key="index"
                  class="m-1 bg-teal-600 flex items-center text-white px-[9px] text-[13px] py-[2px] rounded-full"
                >
                  {{ region }}
                </div>
              </div>
              <div v-if="selectRegions.length > 0">
                <button
                  @click="handleClearAllMap"
                  class="text-[11px] px-2 text-teal-600 border border-teal-600 rounded-full"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
