import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export const useFilters = () => {
  const route = useRoute();
  const router = useRouter();

  // Filters State all in one reactive variables
  const filterControllers = ref({
    sectorId: route.query.sid || "",
    positionId: route.query.pid || "",
    cityId: route.query.cid || "",
  });

  // Build Filters logic used to be sent for a graphqls query
  const buildFilters = computed(() => {
    const filters = {};
    if (filterControllers.value.sectorId) {
      filters.sub_sector = {
        sector: {
          id: {
            _eq: filterControllers.value.sectorId,
          },
        },
      };
    }
    if (filterControllers.value.positionId) {
      filters.position = {
        id: {
          _eq: filterControllers.value.positionId,
        },
      };
    }
    if (filterControllers.value.cityId) {
      filters.job_cities = {
        city: {
          id: {
            _eq: filterControllers.value.cityId,
          },
        },
      };
    }
    console.log("Filters :", filters);
    return filters;
  });
  //   set the selected sectors from dropdown
  const setSectors = (sectorId) => {
    console.log("Set sectors inside filters now ", sectorId);
    filterControllers.value.sectorId = sectorId;
    updateRoute();
  };

  // Sync URL with Filters (Route Management)
  const updateRoute = () => {
    console.log("Updating routes ...");
    const queryParams = {
      ...route.query,
      ...(filterControllers.value.sectorId && {
        sid: filterControllers.value.sectorId,
      }),
      ...(filterControllers.value.positionId && {
        pid: filterControllers.value.positionId,
      }),
      ...(filterControllers.value.cityId && {
        cid: filterControllers.value.cityId,
      }),
    };

    // Remove empty keys from queryParams
    Object.keys(queryParams).forEach((key) => {
      if (!queryParams[key]) delete queryParams[key];
    });

    router.push({ query: queryParams });
  };
  // Watchers for Auto Route Updates
  watch(filterControllers, updateRoute, { deep: true });

  return {
    filterControllers,
    buildFilters,
    setSectors,
    updateRoute,
  };
};
