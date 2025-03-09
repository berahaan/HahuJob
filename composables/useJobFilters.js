import jobsQuery from "../graphql/query/Jobs.graphql";
export const useJobFIlters = () => {
  const filterControllers = ref({
    sectorId: "",
    positionId: "",
    cityId: "",
  });
  // update sectors id when selected from dropdowns
  const handleSectorClicked = (id, name) => {
    console.log("clicked");
    console.log("useJobfilters ....", id, name);
    filterControllers.value.sectorId = id;
    console.log(
      "filter controllers changed now ",
      filterControllers.value.sectorId
    );
  };
  const buildFilters = computed(() => {
    console.log("inside build filters");
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
    } else if (filterControllers.value.cityId) {
      filters.job_cities = {
        city: {
          id: {
            _eq: filterControllers.value.cityId,
          },
        },
      };
    }
    console.log("filters", filters);
    return filters;
  });

  watch(
    buildFilters,
    (newFilters) => {
      console.log("new filters ", newFilters);
    },
    {
      immediate: true,
    }
  );

  return {
    filterControllers,
    buildFilters,
    handleSectorClicked,
  };
};
