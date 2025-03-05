import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import jobsQuery from "../graphql/query/Jobs.graphql";
import SEARCH_SECTORS from "../graphql/query/SEARCH_SECTORS.graphql";
import SEARCH_POSITIONS from "../graphql/query/SEARCH_POSITIONS.graphql";
import SEARCH_CITY from "../graphql/query/SEARCH_CITY.graphql";
import searchSector from "../graphql/query/searchSector.graphql";
import { useAsyncQuery } from "#imports";
export const useJobs = () => {
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
  const HandLeSectorSearch = async () => {
    console.log("handle sectors called ....");

    if (topJoblist.sectorSearch) {
      console.log("topJoblist.sectorSearch ", topJoblist.sectorSearch);
      const { data } = await useAsyncQuery({
        query: SEARCH_SECTORS,
        variables: { SectorName: `%${topJoblist.sectorSearch}%` },
      });
      if (data.value?.basic_sectors) {
        storeJobFilters.basicSectors = data.value?.basic_sectors;
      } else {
        console.log("No cities found.");
        storeJobFilters.basicSectors = [];
      }
    } else {
      console.log("input is clear now ...");
      // storeJobFilters.basicSectors = [];
    }
  };
  const hndlMnInptSrch = async () => {
    topJoblist.showDropdown = true;
    console.log("handle main input clicked now ");
    console.log("Main searches now ", topJoblist.mainInputSearch);
    try {
      if (topJoblist.mainInputSearch) {
        const { data } = await useAsyncQuery({
          query: JOB_POSITIONS_SEARCH,
          variables: { Position: `%${topJoblist.mainInputSearch}%` },
        });
        // console.log("Fetched main searches ", data.value?.basic_sectors);
        topJoblist.mainSearchJobs = data.value?.basic_sectors;
        console.log("fetched mainsearch Jobs here ", topJoblist.mainSearchJobs);
        // Filter unique positions
        topJoblist.mainSearchJobs.forEach((sector) => {
          sector.sub_sectors.forEach((subSector) => {
            subSector.jobs.sort((a, b) =>
              a.position.name.localeCompare(b.position.name)
            );
          });
        });

        uniquePositions.value = getUniquePositions(mainSearchJobs.value);
        console.log("Unique Positions: ", uniquePositions.value);
      }
    } catch (error) {
      console.log("Error while fetching main searches...", error);
    }
  };
  const handleFilterClicked = () => {
    console.log("going to chage checkFilters now ", state.checkFilter);
    state.checkFilter = !state.checkFilter;
    console.log("after changes ....", state.checkFilter);
  };
  const correctTypeNm = (type) => {
    return type
      .split(/[_\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ");
  };
  const handleSectorsId = async (id, name) => {
    storeJobFilters.isTitleClicked = false;
    console.log("Insides handleSectorsId ", id);
    await router.push({
      path: "/jobs",
      query: { ...route.query, sid: id, page: 1 },
    });

    filterControllers.value.sectorId = id;
    state.filters.sub_sector = {
      sector: {
        id: {
          _eq: route.query.sid,
        },
      },
    };
    // Ensure reactivity kicks in after navigation
    await nextTick();
    buildFilters();
    await fetchSectors(id);
    console.log("Now going to refresh after handling sector ID");
    // await refresh();
    await fetchJobs();
  };

  // when position is selected by users this functions is called
  const HandlePositionId = async (name, id) => {
    console.log("postions to be searched ", name, id);
    storeJobFilters.holdPositionName = name;
    filterControllers.value.positionId = id;
    // Update route with both sid and pid if sid is present
    await router.push({
      path: "/jobs",
      query: {
        ...route.query, // Preserve existing query parameters
        pid: id,
        page: 1, // Reset to the first page
      },
    });
    // Update filters
    buildFilters();
    await fetchJobs();
    // await refresh();
  };
  // functions to buld
  const buildFilters = () => {
    console.log("insides build filters");
    const filters = {};
    if (route.query.sid) {
      filters.sub_sector = {
        sector: {
          id: {
            _eq: route.query.sid,
          },
        },
      };
    }
    if (route.query.pid) {
      filters.position = {
        id: {
          _eq: route.query.pid,
        },
      };
    } else if (route.query.cid) {
      console.log("yes cid is presents now ...");
      filters.job_cities = {
        city: {
          id: {
            _eq: route.query.cid,
          },
        },
      };
    }
    state.filters = filters;
    console.log("filters ", filters);
  };
  // searching Positions search when a users is searchning for specific jobs
  const HandlePositionInput = async () => {
    if (topJoblist.PositionSearch) {
      const { data } = await useAsyncQuery({
        query: SEARCH_POSITIONS,
        variables: { PositionSrch: `%${topJoblist.PositionSearch}%` },
      });
      if (data.value?.basic_positions) {
        console.log("Positions searching now ...");
        storeJobFilters.basicPositions = data.value.basic_positions;
      } else {
        console.log("No Positions found.");
        storeJobFilters.basicPositions = [];
      }
    } else {
      console.log("input is clear ...");
      buildFilters();
      await fetchJobs();
      // basicPositions.value = [];
    }
  };
  const HandleCtyFiltr = async (id, name) => {
    console.log("Handle filter city name here .... ", name, id);
    storeJobFilters.holdCityName = name;
    await router.push({
      path: "/jobs",
      query: {
        ...route.query, // Preserve existing query parameters
        cid: id,
        page: 1,
      },
    });

    // Update filters
    buildFilters();
    await fetchJobs();
  };
  const HandLeCitySearch = async () => {
    console.log("handle search clicked now ");
    if (topJoblist.citySearch) {
      const { data } = await useAsyncQuery({
        query: SEARCH_CITY,
        variables: { CityName: `%${topJoblist.citySearch}%` },
      });
      if (data.value?.basic_cities) {
        storeJobFilters.baseCity = data.value.basic_cities;
      } else {
        console.log("No cities found.");
        storeJobFilters.baseCity = [];
      }
    } else {
      console.log("Input is empty, clearing dropdown.");
      storeJobFilters.baseCity = [];
    }
  };
  // Use useAsyncQuery to fetch jobs
  const fetchSectors = async (id) => {
    console.log("inside fetchSectors now ...", id);
    try {
      const { data } = await useAsyncQuery({
        query: searchSector,
        variables: {
          sectorId: id,
        },
      });
      console.log("sector Info responses ", data.value);
      // storeJobFilters.holdSectorName = data.value?.basic_sectors?.name;
      storeJobFilters.holdSectorInfo = data.value?.basic_sectors;
      console.log(
        "storeJobFilters.holdSectorInfo ",
        storeJobFilters.holdSectorInfo
      );
    } catch (error) {
      console.log("error ", error);
    }
  };
  const fetchJobs = async () => {
    console.log("insides fetchJobs");
    state.isLoading = true;
    try {
      if (route.query.sid) {
        console.log("to be passed sid ", route.query.sid);
        const { data: sectorName } = await useAsyncQuery({
          query: searchSector,
          variables: {
            SectorId: route.query.sid,
          },
        });
        console.log("Secrot", sectorName.value);
        // storeJobFilters.holdSectorName = data.value?.basic_sectors?.name;
        storeJobFilters.holdSectorName =
          sectorName.value?.basic_sectors[0].name;
        storeJobFilters.holdDescription =
          sectorName.value?.basic_sectors[0].description;
      }

      const { data } = await useAsyncQuery({
        query: jobsQuery,
        variables: {
          filter: state.filters,
          limit: state.pagination.pageSize,
          offset: state.pagination.offset,
        },
      });

      console.log("fetchJobs ", data.value?.jobs);
      console.log(
        "fetched jobs totalJobs",
        data.value?.jobs_aggregate.aggregate.count
      );

      // Update total jobs count
      state.pagination.totalJobs =
        data.value?.jobs_aggregate.aggregate.count || 0;

      // Update jobs list
      state.jobs = data.value?.jobs || [];

      // Handle empty jobs case
      if (state.jobs.length === 0) {
        state.isLoading = false;
        console.log("There are no jobs available.");
      } else {
        state.isLoading = false;
        console.log("Jobs are available.");
      }

      state.isLoading = false; // Ensure loading is set to false after fetch
    } catch (error) {
      console.log("error ", error);
      state.isLoading = false; // Ensure loading is set to false even if there's an error
      state.error = error; // Optionally, set an error state
    }
  };
  //Fetch jobs when the component is mounted
  onMounted(async () => {
    console.log("onmounting ....");
    buildFilters();
    // await refresh();
    await fetchSectors(route.query.pid);
    await fetchJobs();
  });
  // watch for changes of positions id and updates filters
  watch(
    () => route.query.pid,
    async (newPid, oldPid) => {
      if (newPid !== oldPid) {
        state.filters.position = {
          id: {
            _eq: newPid,
          },
        };
        buildFilters();
        await fetchJobs();
      }
    }
  );
  watch(
    () => route.query.cid,
    async (newPid, oldPid) => {
      if (newPid !== oldPid) {
        state.filters.job_cities = {
          city: {
            id: {
              _eq: newPid,
            },
          },
        };
        buildFilters();
        await fetchJobs();
      }
    }
  );
  // Watch for changes in the route query and refetch jobs
  watch(
    () => route.query.sid,
    async (newSid, oldSid) => {
      if (newSid !== oldSid) {
        console.log("SID changed from", oldSid, "to", newSid);
        state.isLoading = true;
        state.filters.sub_sector = {
          sector: {
            id: {
              _eq: newSid,
            },
          },
        };
        // await refresh();
        buildFilters();
        await fetchJobs();
        state.isLoading = false;
      }
    },
    { immediate: true }
  );

  return {
    state,
    correctTypeNm,
    topJoblist,
    closeMainSearch,
    hndlMnInptSrch,
    handleSectorsId,
    handleFilterClicked,
    handleSectorsId,
    HandLeSectorSearch,
    storeJobFilters,
    HandlePositionInput,
    HandLeCitySearch,
    HandleCtyFiltr,
    HandlePositionId,
  };
};
