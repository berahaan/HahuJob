import jobsQuery from "../graphql/query/Jobs.graphql";
export const useJobFIlters = async () => {
  const filterControllers = ref({
    sectorId: "",
    positionId: "",
    cityId: "",
  });
  // update sectors id when selected from dropdowns
  const handleSectorClicked = (id, name) => {
    console.log("useJobfilters ....", id, name);
    filterControllers.value.sectorId = id;
  };
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

  let variables = {
    filter: buildFilters.value,
    limit: 10,
    offset: 0,
  };
  const { data } = await useAsyncQuery(jobsQuery, variables);
  watch(data.value, (data) => {
    console.log("fetched jobs now ...", data);
  });
  return {
    filterControllers,
    buildFilters,
    handleSectorClicked,
  };
};
