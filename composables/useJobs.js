import { reactive } from "vue";
import { useRoute } from "vue-router";
import jobsQuery from "../graphql/query/Jobs.graphql";
import { sharedFilters } from "#imports";
export const useJobs = () => {
  const { runWithContext } = useNuxtApp();

  const { buildFilters, filterControllers, isPositionsSelected } = useFilters();
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
      limit: 10,
      offset: 0,
    };
  });

  if (import.meta.client) {
    console.log("inside of usejobs now ", buildFilters.value);
    runWithContext(() => {
      console.log("variables to be passed here ", variables.value);
      // calling useQuery for fetching data
      const { onResult, onError, refetch } = useQuery(jobsQuery, variables);
      // Clear jobs only if data is empty
      onResult(({ data }) => {
        if (!data) {
          state.jobs = [];
        } else if (isPositionsSelected || route.query.pid) {
          console.log("positions is selected ....");
          storeJobFilters.holdPositionName = data.jobs[0]?.position.name;
          state.jobs = data.jobs || [];
          console.log("Jobs::", state.jobs);
          state.pagination.totalJobs = data.totalJobs.aggregate.count;
        } else {
          state.jobs = data.jobs || [];
          state.pagination.totalJobs = data.totalJobs.aggregate.count;
          console.log(
            `totalJobs exist ${sharedFilters.filterControllers.sectorId} is ${data.totalJobs.aggregate.count}`
          );
        }
        state.isLoading = false; // Loading stops after data is received
      });
      // check for errors
      onError((error) => {
        console.error("Error:", error.message);
        state.error = error.message;
        state.isLoading = false;
      });

      onMounted(() => {
        console.log("inside of context mounting ", route.query);
        filterControllers.value = {
          sectorId: route.query.sid || "",
          positionId: route.query.pid || "",
          cityId: route.query.cid || "",
        };
        state.isLoading = true;
        state.pagination.currentPage = parseInt(route.query.page) || 1;
        refetch();
      });
    });
  }
  onMounted(() => {
    console.log("on mounting in useJobs ", route.query);
    filterControllers.value = {
      sectorId: route.query.sid || "",
      positionId: route.query.pid || "",
      cityId: route.query.cid || "",
    };
  });
  watch(filterControllers.value, (newfilters) => {
    console.log("newFilters in useJobs  ", newfilters);
  });
  return {
    state,
    topJoblist,
    closeMainSearch,
    storeJobFilters,
  };
};
