import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import jobsQuery from "../graphql/query/Jobs.graphql";
import searchSector from "../graphql/query/searchSector.graphql";
import { useAsyncQuery, useQuery } from "#imports";
export const useJobs = () => {
  const { runWithContext } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();
  // Define pagination inside state
  const filterControllers = ref({
    sectorId: "",
    positionId: "",
    cityId: "",
  });
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
    isSelcExpTen: false,
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

  const handleSectorsId = async (id, name) => {
    storeJobFilters.isTitleClicked = false;
    filterControllers.value.sectorId = id;
    await router.push({
      path: "/jobs",
      query: { ...route.query, sid: id, page: 1 },
    });
  };

  // functions to buld filters to be sent to a graphql .....
  const buildFilters = computed(() => {
    console.log("inside build filters");
    const filters = {};
    if (filterControllers.value.sectorId) {
      console.log("sectors Id ....", filterControllers.value.sectorId);
      filters.sub_sector = {
        sector: {
          id: {
            _eq: filterControllers.value.sectorId,
          },
        },
      };
    }
    if (filterControllers.value.positionId) {
      console.log("PID ", filterControllers.value.positionId);
      filters.position = {
        id: {
          _eq: filterControllers.value.positionId,
        },
      };
    } else if (filterControllers.value.cityId) {
      console.log("yes cid is present now ...");
      filters.job_cities = {
        city: {
          id: {
            _eq: filterControllers.value.cityId,
          },
        },
      };
    }

    console.log("filters", filters);
    return filters; // Ensure the computed property returns the `filters` object
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const variables = computed(() => ({
    filter: buildFilters.value,
    limit: state.pagination.pageSize,
    offset: (state.pagination.currentPage - 1) * state.pagination.pageSize,
  }));

  runWithContext(() => {
    const { onResult, onError, refetch } = useQuery(jobsQuery, variables);

    onResult(({ data }) => {
      if (!data) return;
      state.jobs = data.jobs || [];
      state.isLoading = false;
    });

    onError((error) => {
      console.error("Error:", error.message);
      state.error = error.message;
      state.isLoading = false;
    });

    onMounted(() => {
      console.log("UseQuery refetching");
      refetch();
    });
  });
  return {
    state,
    topJoblist,
    closeMainSearch,
    handleSectorsId,
    handleSectorsId,
    storeJobFilters,
  };
};
