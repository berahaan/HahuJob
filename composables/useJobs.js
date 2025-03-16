import { reactive } from "vue";
import { useRoute } from "vue-router";
import jobsQuery from "../graphql/query/Jobs.graphql";
import { sharedFilters } from "#imports";
export const useJobs = () => {
  const { runWithContext } = useNuxtApp();

  const {
    buildFilters,
    filterControllers,
    isPositionsSelected,
    isCitySelected,
  } = useFilters();
  const route = useRoute();
  const storeJobFilters = reactive({
    basicPositions: [],
    basicSectors: [],
    baseCity: [],
    holdSectorName: "",
    holdDescription: "",
    isPositionOpen: false,
    holdPositionName: "",
    holdCityName: "",
    isTitleClicked: false,
    isCityOpen: false,
  });
  // declaring variables to be used
  const state = reactive({
    jobs: [],
    selectedALlJobTypes: [],
    filters: {},
    holdExpTen: null,
    isSelcExpTen: true,
    rangeValue: [0, 3],
    checkFilter: true,
    pagination: {
      currentPage: parseInt(route.query.page),
      pageSize: 4,
      totalJobs: 0,
      totalPages: 1,
      offset: 0,
    },
    isLoading: false,
    isDataFetched: false,
    error: null,
  });
  const topJoblist = reactive({
    showDropdown: false,
    mainInputSearch: "",
    PositionSearch: "",
    citySearch: "",
    sectorSearch: "",
    mainSearchJobs: [],
  });
  filterControllers.value = {
    sectorId: route.query.sid || "",
    positionId: route.query.pid || "",
    cityId: route.query.cid || "",
  };
  const closeMainSearch = () => {
    topJoblist.mainInputSearch = "";
  };

  // variables to be passed to graphqls
  const variables = computed(() => {
    return {
      filter: buildFilters.value,
      limit: 20,
      offset: 0,
    };
  });

  if (import.meta.client) {
    runWithContext(() => {
      console.log("variables to be passed here ", variables.value);
      // calling useQuery for fetching data
      const { onResult, onError, refetch } = useQuery(jobsQuery, variables);
      // Clear jobs only if data is empty
      onResult(({ data }) => {
        if (!data) {
          state.jobs = [];
        } else {
          state.jobs = data.jobs || [];
          state.pagination.totalJobs = data.totalJobs.aggregate.count;
          console.log("Jobs ", state.jobs);
          // Handle Position Selection
          if (isPositionsSelected || route.query.pid) {
            console.log("positions is selected ....");
            const positionName = data.jobs[0]?.position.name || null;
            filterControllers.holdPositionName = positionName;
          }
          // Handle City Selection
          if (isCitySelected || route.query.cid) {
            console.log("city is selected ....");
            const cityName = data.jobs[0]?.job_cities[0].city.name || null;
            filterControllers.holdCityName = cityName;
          }

          // Reset if no selection
          if (
            !isPositionsSelected &&
            !route.query.pid &&
            !isCitySelected &&
            !route.query.cid
          ) {
            storeJobFilters.holdPositionName = null;
            sharedFilters.filterControllers.holdCityName = null;
          }
        }

        state.isLoading = false;
      });
      // check for errors
      onError((error) => {
        console.error("Error:", error.message);
        state.error = error.message;
        state.isLoading = false;
      });

      onMounted(() => {
        state.isLoading = true;
        state.isDataFetched = false;
        filterControllers.value = {
          sectorId: route.query.sid || "",
          positionId: route.query.pid || "",
          cityId: route.query.cid || "",
        };
        state.pagination.currentPage = parseInt(route.query.page) || 1;
        refetch().finally(() => {
          state.isLoading = false; // Ensures `isLoading` ends after data or error
          state.isDataFetched = true;
        });
      });
    });
  }
  onMounted(() => {
    state.isLoading = true;
    filterControllers.value = {
      sectorId: route.query.sid || "",
      positionId: route.query.pid || "",
      cityId: route.query.cid || "",
    };
  });

  return {
    state,
    topJoblist,
    closeMainSearch,
    storeJobFilters,
  };
};
