<script setup>
import BASIC_POSITIONS from "~/graphql/query/BASIC_POSITIONS.graphql";
import BASIC_SECTORS from "~/graphql/query/BASIC_SECTORS.graphql";
import BASIC_CITY from "~/graphql/query/BASIC_CITY.graphql";
const seachQuery = ref();
const {
  closeMainSearch,
  hndlMnInptSrch,
  topJoblist,
  state,
  handleSectorsId,
  HandleCtyFiltr,
  HandLeCitySearch,
  storeJobFilters,
  HandLeSectorSearch,
  HandlePositionInput,
  HandlePositionId,
} = useJobs();
const { handleSectorClicked } = useJobFIlters();
const colorStore = useColorModeStore();
const togglePositions = () => {
  console.log("toggle positions clicked now ....");
  storeJobFilters.isPositionOpen = !storeJobFilters.isPositionOpen;
  storeJobFilters.isCityOpen = false;
  storeJobFilters.isTitleClicked = false;
};
const checkSearchInputs = computed(() => {
  let conditions = [];
  if (seachQuery.value) {
    console.log("new values exist for this search query");
    conditions.push(seachQuery.value);
  }
  return conditions;
});
const toggleCity = () => {
  storeJobFilters.isCityOpen = !storeJobFilters.isCityOpen;
  storeJobFilters.isPositionOpen = false;
  storeJobFilters.isTitleClicked = false;
};

const handleTitleClick = () => {
  storeJobFilters.isTitleClicked = !storeJobFilters.isTitleClicked;
  storeJobFilters.isCityOpen = false;
  storeJobFilters.isPositionOpen = false;
};

const fetchCities = async () => {
  console.log("inside fetchCities");
  try {
    const { data, error } = await useAsyncQuery({
      query: BASIC_CITY,
    });

    if (error.value) {
      throw new Error("Failed to fetch cities: " + error.value.message);
    }

    // Update the reactive state
    storeJobFilters.baseCity = data.value?.basic_cities || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};
const fetchBasicPositions = async () => {
  console.log("inside fetchBasicPositions");
  try {
    const { data, error } = await useAsyncQuery({
      query: BASIC_POSITIONS,
    });

    if (error.value) {
      throw new Error("Failed to fetch positions: " + error.value.message);
    }
    // Update the reactive state
    storeJobFilters.basicPositions = data.value?.basic_positions || [];
  } catch (error) {
    console.error("Error fetching positions:", error);
  }
};
const fetchSectors = async () => {
  console.log("inside fetchSectors....");
  try {
    const { data, error } = await useAsyncQuery({
      query: BASIC_SECTORS,
    });

    if (error.value) {
      throw new Error("Failed to fetch sectors: " + error.value.message);
    }
    // Update the reactive state
    storeJobFilters.basicSectors = data.value?.basic_sectors || [];
  } catch (error) {
    console.error("Error fetching sectors:", error);
  }
};
onMounted(async () => {
  console.log("onmounting....");
  await Promise.all([fetchBasicPositions(), fetchSectors(), fetchCities()]);
});
</script>

<template>
  <div
    class="flex fixed top-[4rem] z-50 lg:flex-row py-8 lg:mr-[10px] flex-col-reverse items-center justify-center md:gap-7 gap-7 lg:gap-0 shadow-slate-400 backdrop-blur-md"
  >
    <!-- This div contains 4 thing input,select positions,titles and select city in flex ways for large screens -->
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white text-gray-400 border-gray-300 '
          : 'bg-gray-600 text-white border-none',
        topJoblist.showDropdown ? 'rounded-l-none' : 'rounded-l-lg',
      ]"
      class="relative md:ml-4 lg:ml-0 lg:rounded-tl-lg flex items-center md:w-[40rem] w-[22rem] lg:w-[28rem] lg:py-[6px] py-3 border"
    >
      <div class="flex-1 lg:ml-5">
        <input
          type="text"
          v-model="topJoblist.mainInputSearch"
          @input="hndlMnInptSrch"
          placeholder="Search..."
          class="w-full lg:placeholder:text-sm placeholder:text-[20px] outline-none focus:outline-none bg-transparent border-none px-4"
        />
      </div>
      <div class="flex lg:gap-2 gap-3 ml-auto pr-3">
        <button @click="closeMainSearch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="lg:w-4 lg:h-4 w-[24px] h-7 text-gray-400 font-bold"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <button @click="handleSearchJobs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="lg:w-4 lg:h-4 w-[24px] h-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      @click="togglePositions"
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white text-gray-500'
          : 'bg-gray-600 text-white',
      ]"
      class="relative rounded-md md:rounded-none lg:inline-flex ml-2 flex cursor-default items-center justify-between lg:w-[15rem] md:w-[40rem] w-[20rem] px-3 py-[4px] md:py-[4px] lg:py-1"
    >
      <p
        v-if="storeJobFilters.holdPositionName"
        class="py-[4px] lg:text-sm md:text-[20px] text-lg"
      >
        {{ storeJobFilters.holdPositionName }}
      </p>

      <p
        v-else
        class="py-[4px] lg:text-sm md:text-[20px] text-lg"
        :class="[colorStore.colorMode === 'light' ? '' : ' text-white']"
      >
        Select positions
      </p>
      <p v-if="storeJobFilters.holdPositionName">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          @click="handleCLoseButton('position')"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-3 cursor-pointer"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white',
          ]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </p>
      <p v-if="!storeJobFilters.holdPositionName">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-4 h-4"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white',
            storeJobFilters.isPositionOpen ? 'rotate-180' : '',
          ]"
        >
          <path d="M5 9l7 7 7-7" />
        </svg>
      </p>
    </div>
    <div
      v-if="storeJobFilters.isPositionOpen"
      @click.stop
      id="positions"
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white text-gray-500 border-t-white'
          : 'bg-gray-600 text-white border-t-gray-600',
      ]"
      class="absolute scroll-smooth left-[39px] md:mt-0 lg:mt-0 border overflow-y-auto max-h-[15rem] border-teal-400 mt-[20rem] z-50 lg:left-[458px] right-0 w-[20rem] md:w-[40rem] lg:w-[15rem] md:left-[85px] md:top-[180px] lg:top-[66px]"
    >
      <p
        class="rounded-lg mx-2 md:py-1 lg:py-[1px] mt-3 border border-teal-500"
      >
        <input
          type="text"
          v-model="topJoblist.PositionSearch"
          @click.stop
          @input="HandlePositionInput"
          class="w-[11rem] ml-3 md:py-2 lg:py-1 outline-none p-1 rouded-lg bg-transparent"
          placeholder="search..."
        />
      </p>
      <div class="mt-2">
        <div
          v-for="position in storeJobFilters.basicPositions"
          @click="HandlePositionId(position?.name, position?.id)"
          :key="position.id"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-700 font-bold' : '',
          ]"
          class="py-2 px-3 cursor-pointer border-b-[1px] text-[13px]"
        >
          {{ position?.name }}
        </div>
      </div>
    </div>
    <div
      v-if="storeJobFilters.isCityOpen"
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white text-gray-500 border-t-white'
          : 'bg-gray-600 text-white border-t-gray-600',
      ]"
      class="absolute border cursor-pointer md:py-1 lg:py-0 w-[324px] mt-[17rem] lg:mt-[277.5px] md:mt-[11rem] md:left-[84px] z-50 lg:left-[953px] right-0 left-10 lg:max-h-[15rem] md:max-h-[23rem] overflow-y-auto lg:w-[15rem] md:w-[40rem]"
    >
      <p class="rounded-lg mx-2 mt-2 border border-teal-500 flex items-center">
        <input
          type="text"
          v-model="topJoblist.citySearch"
          @click.stop
          @input="HandLeCitySearch"
          class="w-[11rem] lg:ml-3 md:ml-3 py-2 outline-none md:placeholder:text-[18px] lg:placeholder:text-[14px] lg:py-[2px] md:py-[10px] rouded-lg bg-transparent"
          placeholder="search..."
        />
      </p>

      <div class="mt-2">
        <!-- this one below is need to be filtered here based on the input setted by users  -->
        <div
          v-for="city in storeJobFilters.baseCity"
          :key="city.id"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-700 font-bold' : '',
          ]"
          @click="HandleCtyFiltr(city.id, city?.name)"
          class="py-2 px-3 md:mt-1 cursor-pointer md:font-bold border-b-2 lg:text-[13px] md:text-[17px]"
        >
          {{ city?.name }}
        </div>
      </div>
    </div>

    <div
      v-if="topJoblist.showDropdown"
      :class="[
        topJoblist.showDropdown ? 'rounded-none' : '',
        colorStore.colorMode === 'light'
          ? 'bg-white border-gray-400 text-gray-600 font-black '
          : 'bg-gray-600 border-teal-600',
      ]"
      class="absolute top-[68px] border-t-[1px] mt-2 lg:mt-0 z-50 lg:left-0 right-0 max-h-[15rem] overflow-y-auto lg:w-[28rem] w-[42rem] left-10"
    >
      <!-- Dropdown Items -->
      <div
        v-if="topJoblist.showDropdown && topJoblist.mainSearchJobs.length > 0"
      >
        <div
          v-for="position in topJoblist.mainSearchJobs"
          :key="position.id"
          @click="checkPositions(position?.id)"
          class="position border-b-[1px] lg:text-[12px] font-bold text-[18px] lg:p-2 cursor-pointer p-3"
        >
          <p>{{ position.name }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="storeJobFilters.isTitleClicked"
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white text-gray-500 border-t-white'
          : 'bg-gray-600 text-white border-t-gray-600',
      ]"
      class="absolute border mt-[524px] md:mt-0 lg:top-[62px] md:top-[117px] z-50 md:left-[86px] lg:left-[704px] left-[37px] w-[20rem] lg:max-h-[15rem] md:max-h-[22rem] overflow-y-auto lg:w-[15rem] md:w-[40rem]"
    >
      <p
        class="rounded-lg mx-2 md:py-1 lg:py-[4px] mt-3 border border-teal-500"
      >
        <input
          type="text"
          v-model="topJoblist.sectorSearch"
          @input="HandLeSectorSearch"
          @click.stop
          class="w-full lg:placeholder:text-sm placeholder:text-[20px] outline-none focus:outline-none bg-transparent border-none px-4"
          placeholder="search..."
        />
      </p>
      <div class="mt-2">
        <div
          v-for="sector in storeJobFilters.basicSectors"
          :key="sector.id"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-700 font-bold' : '',
          ]"
          @click="handleSectorClicked(sector?.id, sector?.name)"
          class="py-2 px-3 cursor-pointer border-b-2 text-[13px]"
        >
          {{ sector?.name }}
        </div>
      </div>
    </div>
    <!-- div for titles-->
    <div>
      <div
        @click="handleTitleClick"
        :class="[
          colorStore.colorMode === 'light'
            ? 'bg-white text-gray-500'
            : 'bg-gray-600 text-white',
        ]"
        class="ml-2 cursor-default rounded-md lg:rounded-none md:rounded-md items-center flex justify-between md:w-[40rem] lg:w-[15rem] w-[20rem] px-4 py-1 md:py-[4px] lg:py-1"
      >
        <p
          class="py-[4px] lg:text-sm md:text-[20px]"
          v-if="
            state.jobs[0]?.sub_sector?.sector?.name ||
            storeJobFilters.holdSectorName
          "
        >
          {{
            state.jobs[0]?.sub_sector?.sector?.name ||
            storeJobFilters.holdSectorName
          }}
        </p>
        <p class="py-[4px] md:text-sm text-lg" v-else>Select sectors</p>
        <p
          v-if="
            state.jobs[0]?.sub_sector?.sector?.name ||
            storeJobFilters.holdSectorName
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            @click="handleSectorHide"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </p>
        <p v-else>
          <!-- this one is for svg which is like a dropdown menus -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-4 h-4"
            :class="[
              colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white',
              isSectorClicked ? 'rotate-180' : '',
            ]"
          >
            <path d="M5 9l7 7 7-7" />
          </svg>
        </p>
      </div>
    </div>
    <!-- Select options for city-->
    <div
      @click="toggleCity"
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white text-gray-500'
          : 'bg-gray-600 text-white',
      ]"
      class="ml-2 flex rounded-md md:rounded-none lg:inline-flex cursor-default items-center justify-between lg:w-[15rem] md:w-[40rem] w-[20rem] px-4 py-1 md:py-[4px] lg:py-1"
    >
      <p
        v-if="storeJobFilters.holdCityName"
        class="py-[4px] lg:text-sm md:text-[20px] text-[16px]"
      >
        {{ storeJobFilters.holdCityName }}
      </p>
      <p
        v-if="!storeJobFilters.holdCityName"
        class="py-[4px] lg:text-sm md:text-[20px] text-[16px]"
      >
        Select city
      </p>
      <p v-if="storeJobFilters.holdCityName">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          @click="handleCLoseButton('city')"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-3 cursor-pointer"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white',
            storeJobFilters.isCityOpen ? 'rotate-180' : '',
          ]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </p>
      <p v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-4 h-4"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-500' : 'text-white',
            storeJobFilters.isCityOpen ? 'rotate-180' : '',
          ]"
        >
          <path d="M5 9l7 7 7-7" />
        </svg>
      </p>
    </div>
  </div>
</template>
