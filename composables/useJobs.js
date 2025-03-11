import { reactive } from "vue";
import { useRoute } from "vue-router";
import jobsQuery from "../graphql/query/Jobs.graphql";
export const useJobs = () => {
  const { runWithContext } = useNuxtApp();
  const { buildFilters, filterControllers } = useFilters();
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
      pageSize: 12,
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
  const closeMainSearch = () => {
    topJoblist.mainInputSearch = "";
  };
  // variables to be passed to graphqls
  const variables = computed(() => ({
    filter: buildFilters.value,
    limit: state.pagination.pageSize,
    offset: (state.pagination.currentPage - 1) * state.pagination.pageSize,
  }));
  if (import.meta.client) {
    console.log("inside of usejobs now ", variables.value);
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
        }
        state.isLoading = false; // Loading stops after data is received
      });
      // check for errors
      onError((error) => {
        console.error("Error:", error.message);
        state.error = error.message;
        state.isLoading = false;
      });
      // watch for changes in filter controllers and react accordingly
      watch(
        () => variables.value,
        () => {
          console.log("Triggered Refetch"); // Debugging
          state.isLoading = true;
          refetch();
        },
        { deep: true }
      );

      onMounted(() => {
        state.isLoading = true;
        filterControllers.value = {
          sectorId: route.query.sid || "",
          positionId: route.query.pid || "",
          cityId: route.query.cid || "",
        };
        state.pagination.currentPage = parseInt(route.query.page) || 1;
        refetch();
      });
    });
  }

  return {
    state,
    topJoblist,
    closeMainSearch,
    storeJobFilters,
  };
};
