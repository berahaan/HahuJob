import { useRoute, useRouter } from "vue-router";
import { sharedFilters } from "#imports";
export const useFilters = () => {
  const route = useRoute();
  const router = useRouter();
  // set the selected sectors from dropdown
  const setSectors = async (sectorId) => {
    sharedFilters.filterControllers.sectorId = sectorId;
  };
  // set selected Positions name from a dropdown menus
  const setPositions = async (positionId) => {
    sharedFilters.filterControllers.isPositionsSelected = true;
    sharedFilters.filterControllers.positionId = positionId;
  };
  // set selected city and then fetch jobs accordingly
  const setCitys = async (city) => {
    sharedFilters.filterControllers.cityId = city;
  };
  // Build Filters logic used to be sent for a graphqls query
  const buildFilters = computed(() => {
    const filters = {};
    if (sharedFilters.filterControllers.sectorId || route.query.sid) {
      filters.sub_sector = {
        sector: {
          id: {
            _eq: sharedFilters.filterControllers.sectorId || route.query.sid,
          },
        },
      };
    }
    if (sharedFilters.filterControllers.positionId || route.query.pid) {
      filters.position = {
        id: {
          _eq: sharedFilters.filterControllers.positionId || route.query.pid,
        },
      };
    }
    if (sharedFilters.filterControllers.cityId || route.query.cid) {
      filters.job_cities = {
        city: {
          id: {
            _eq: sharedFilters.filterControllers.cityId || route.query.cid,
          },
        },
      };
    }
    console.log("Filters :", filters);
    return filters;
  });

  // Sync URL with Filters (Route Management)
  const updateRoute = () => {
    console.log("Updating routes now ...");
    if (!route) {
      console.log("Routes undefined skipping ");
      return;
    }
    // build query for routes purposes
    const queryParams = {
      ...route.query,
      ...(sharedFilters.filterControllers.sectorId && {
        sid: sharedFilters.filterControllers.sectorId,
      }),
      ...(sharedFilters.filterControllers.positionId && {
        pid: sharedFilters.filterControllers.positionId,
      }),
      ...(sharedFilters.filterControllers.cityId && {
        cid: sharedFilters.filterControllers.cityId,
      }),
    };
    const page = queryParams.page || 1;
    delete queryParams.page;
    // Remove empty keys from queryParams
    Object.keys(queryParams).forEach((key) => {
      if (!queryParams[key]) delete queryParams[key];
    });

    const sortedQueryParams = { ...queryParams, page };
    console.log("routes updated  now is ::", sortedQueryParams);
    router.push({ query: sortedQueryParams });
  };
  // watch for anychanges of filtecontrollers here from a shared filters composables
  watch(() => sharedFilters.filterControllers, updateRoute, { deep: true });
  // export for other composables or components
  return {
    filterControllers: sharedFilters.filterControllers,
    buildFilters,
    setSectors,
    setPositions,
    updateRoute,
    setCitys,
    isPositionsSelected: sharedFilters.filterControllers.isPositionsSelected,
  };
};
