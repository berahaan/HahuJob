// sharedFilters.js

export const sharedFilters = reactive({
  filterControllers: {
    sectorId: "",
    positionId: "",
    holdPositionName: "",
    holdCityName: "",
    holdSectorsName: "",
    cityId: "",
    isPositionsSelected: false,
    isCitySelected: false,
  },
  isLoading: false,
});
