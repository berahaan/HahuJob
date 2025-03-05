<script setup>
import { ref, computed } from "vue";
import Citymap from "./Citymap";
import { useRoute } from "vue-router";
import Vue3Slider from "vue-3-slider-component";
import BASIC_POSITIONS from "~/graphql/query/BASIC_POSITIONS.graphql";
import BASIC_CITY from "~/graphql/query/BASIC_CITY.graphql";
import BASIC_SECTORS from "~/graphql/query/BASIC_SECTORS.graphql";
import JOB_DETAILS from "~/graphql/query/JOB_BY_Sectors.graphql";
import JOB_CITY from "~/graphql/query/JOB_CITY.graphql";
import JOB_CITY_WSECTOR from "~/graphql/query/JOB_CITY_WSECTOR.graphql";
import JOB_SPECIFIC_DETAILS from "~/graphql/query/JOB_SPECIFIC_DETAILS.graphql";
import SEARCH_CITY from "~/graphql/query/SEARCH_CITY.graphql";
import SEARCH_SECTORS from "~/graphql/query/SEARCH_SECTORS.graphql";
import SEARCH_POSITIONS from "~/graphql/query/SEARCH_POSITIONS.graphql";
import JOB_POSITIONS_SEARCH from "~/graphql/query/JOB_POSITION_SEARCH.graphql";
import JOB_ALLSECTORS from "~/graphql/query/JOB_ALLSECTORS.graphql";
import JOB_YEAREXP from "~/graphql/query/JOB_YEAREXP.graphql";
import JOB_W_SECTOR from "~/graphql/query/JOB_W_SECTOR.graphql";
import JOB_FETCH_TYPE from "~/graphql/query/JOB_FETCH_TYPE.graphql";
import JOB_POSITION_NAME from "~/graphql/query/JOB_POSITION_NAME.graphql";
import GET_JOB_MAP from "~/graphql/query/GET_JOB_MAP.graphql";
import GET_SECTOR_MAP from "~/graphql/query/GET_SECTOR_MAP.graphql";
import GET_JOBPMSECT from "~/graphql/query/GET_JOBPMSECT.graphql";
import JOB_TYPE from "~/graphql/query/JOB_TYPE.graphql";
import KPI from "~/graphql/query/KPI.graphql";
import JOB_ANALYSIS from "~/graphql/query/JOB_ANALYSIS.graphql";
import RELATED_JOBS from "~/graphql/query/RELATED_JOBS.graphql";

const { selectRegions, selectedRegionIds } = useRegionSelected();
const route = useRoute();
const colorStore = useColorModeStore();
const JobID = ref(route.query.sid);
const holdExpTen = ref(null);
const jobListRef = ref(null);
const lessZn = ref(null);
const greaterZn = ref(null);
const selectedALlJobTypes = ref([]);
const JobDetails = ref([]);
const uniquePositions = ref([]);
const baseCity = ref([]);
const basicPositions = ref([]);
const basicSectors = ref([]);
const mainSearchJobs = ref([]);
const storeKPI = ref([]);
const storeJobAnalysis = ref([]);
const storeRelatedJobs = ref([]);
const specificJobs = ref(null);
const rangeValue = ref([0, 3]);
const isSelcExpTen = ref(false);
const isPositionOpen = ref(false);
const isCityOpen = ref(false);
const isTitleClicked = ref(false);
const checkFilter = ref(true);
const isJobLoading = ref(false);
const showDropdown = ref(false);
const isTypeSelected = ref(false);
const sectorHide = ref(false);
const isSectorClicked = ref(false);
const isFetchJobALlSctr = ref(false);
const isSpecificJobs = ref(false);
const isKPIloading = ref(false);
const activeTabs = ref("Post");
const activeSumary = ref("English");
const fetchType = ref("");
const searchQuery = ref("");
const selectedJobTypes = ref("");
const cityId = ref("");
const PositionId = ref("");
const citySearch = ref("");
const sectorSearch = ref("");
const PositionSearch = ref("");
const mainInputSearch = ref("");
const holdCityName = ref("");
const holdPositionName = ref("");
const holdSectorsName = ref("");
const pageSize = 24;
const totalPages = ref(1);
const totalJobs = ref(0);
const currentJobsLenght = ref(0);
const offset = computed(() => (currentPage.value - 1) * pageSize);
const currentPage = ref(parseInt(route.query.page) || 1);
// this is for the scrolling functions
const hasNoQueryParams = computed(() => Object.keys(route.query).length === 0);
console.log("console lofoos");
const formatDate = (timestamp) => {
  return timestamp.split("T")[0]; // Extracts only the date part
};

const scrollToTop = async () => {
  await nextTick(); // Ensure Vue updates before scrolling
  console.log("console defe");
  if (jobListRef.value) {
    jobListRef.value.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  } else {
    console.log("jobListRef is null");
  }
};
const handleClearAllMap = async () => {
  console.log("Clicked now ....");
  selectRegions.value = [];
  selectedRegionIds.value = [];
  // now if sectors id is presents route to fetch by id otherwise navigate to all sectors
  if (route.query.sid) {
    await navigateTo({
      path: "/jobs",
      query: {
        sid: route.query.sid,
        page: 1,
      },
    });
    await fetchJobDetails(route.query.sid);
  } else {
    console.log("No sid so fetch all sectors now whithout any regions");
    await navigateTo({
      path: "/jobs",
      query: {
        page: 1,
      },
    });

    await fetchJobAllSectors();
  }
};
const goToNextPage = () => {
  console.log("clicked ");
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchJobDetails(JobID.value);
  }
};
const goToPreviousPage = () => {
  console.log("clicked ");
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchJobDetails(JobID.value);
  }
};

const selectedButtons = ref({
  bid: false,
  contract: false,
  full_time: false,
  internship: false,
  part_time: false,
});

const toggleButton = async (buttonName) => {
  // Toggle the boolean state for the button
  selectedButtons.value[buttonName] = !selectedButtons.value[buttonName];

  if (selectedButtons.value[buttonName]) {
    // Button selected: add to job types arrays if not already present
    selectedJobTypes.value = buttonName;
    if (!selectedALlJobTypes.value.includes(buttonName)) {
      selectedALlJobTypes.value.push(buttonName);
    }
    console.log(
      "Selected button name is ",
      selectedJobTypes.value,
      selectedALlJobTypes.value
    );
    await navigateTo({
      path: "/jobs",
      query: {
        rid:
          selectedRegionIds.value.length > 0
            ? selectedRegionIds.value
            : undefined,
        sid: route.query.sid ? route.query.sid : undefined,
        t:
          selectedALlJobTypes.value.length > 0
            ? selectedALlJobTypes.value
            : undefined,
        page: 1,
      },
    });
    await fetchJobTypes(selectedALlJobTypes.value);
  } else {
    // Button deselected: remove from job types arrays
    console.log("Button deselected now");
    selectedJobTypes.value = "";
    const index = selectedALlJobTypes.value.indexOf(buttonName);
    if (index > -1) {
      selectedALlJobTypes.value.splice(index, 1);
    }

    // Update the navigation based on the remaining job types
    await navigateTo({
      path: "/jobs",
      query: {
        rid:
          selectedRegionIds.value.length > 0
            ? selectedRegionIds.value
            : undefined,
        sid: route.query.sid ? route.query.sid : undefined,
        t:
          selectedALlJobTypes.value.length > 0
            ? selectedALlJobTypes.value
            : undefined,
        page: 1,
      },
    });

    // Fetch job details or all sectors based on the query
    if (route.query.sid && route.query.pid && route.query.rid) {
      await fetchJobByPostnName(route.query.pid);
    } else if (route.query.sid && route.query.rid) {
      // to check if both routes is exist and act accordingly
      await fetchJobByMap(selectedRegionIds.value, true);
    } else if (route.query.sid) {
      await fetchJobDetails(route.query.sid);
    } else {
      fetchJobAllSectors();
    }
  }
};

// ///////////////////////////////////////////////////////////////////////////////////////////////////

const fetchJobByCity = async () => {
  console.log("Fetching jobs by city now....");
  isJobLoading.value = true;

  let variableParams = {
    CityID: cityId.value,
    limit: pageSize,
    offset: offset.value,
  };

  if (route.query.sid && route.query.cid) {
    variableParams.SectorID = route.query.sid;
  }

  const queryParam = route.query.sid ? JOB_CITY : JOB_CITY_WSECTOR;
  const { data } = await useAsyncQuery({
    query: queryParam,
    variables: variableParams,
  });

  // Correctly access total jobs aggregate
  totalJobs.value = data.value?.jobs_aggregate?.aggregate?.count || 0;

  console.log("Total jobs that satisfy the filter:", totalJobs.value);
  totalPages.value = Math.ceil(totalJobs.value / pageSize);

  if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
    holdSectorsName.value = data.value.basic_sectors[0].name;

    if (totalJobs.value > 0) {
      isJobLoading.value = false;
      JobDetails.value = data.value.basic_sectors;
    } else {
      isJobLoading.value = false;
      console.log("No jobs found in any subsector.");
      JobDetails.value = [];
    }
  } else {
    console.log("No basic_sectors found.");
    JobDetails.value = [];
  }
};

const fetchJobExp = async (les, great) => {
  isJobLoading.value = true;

  // Determine the query and variables based on sector ID presence
  let queryParam = route.query.sid ? JOB_YEAREXP : JOB_W_SECTOR;
  let variablesParam = {
    less: les,
    greater: great,
    limit: pageSize,
    offset: offset.value,
  };

  // If sector ID is present, include it in the variables
  if (route.query.sid) {
    variablesParam.SectorID = route.query.sid;
  } else {
    console.log("Sector ID not found. Using JOB_W_SECTOR...");
  }

  try {
    const { data } = await useAsyncQuery({
      query: queryParam,
      variables: variablesParam,
    });

    console.log(
      "Executing Jobfetch using job experience yrs.",
      data.value?.basic_sectors
    );

    // Extract total jobs and pages
    if (data.value?.basic_sectors?.length > 0) {
      totalJobs.value =
        data.value.basic_sectors[0].sub_sectors[0].jobs_aggregate.aggregate.count;
      totalPages.value = Math.ceil(totalJobs.value / pageSize);
    } else {
      totalJobs.value = 0;
      totalPages.value = 0;
    }

    console.log(
      "Total jobs:",
      totalJobs.value,
      "Total pages:",
      totalPages.value
    );

    // Process job details
    if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
      let totalJobsCount = 0;

      // Sum up job counts across all sectors and subsectors
      data.value.basic_sectors.forEach((sector) => {
        if (sector.sub_sectors && Array.isArray(sector.sub_sectors)) {
          sector.sub_sectors.forEach((subsector) => {
            totalJobsCount += subsector.jobs ? subsector.jobs.length : 0;
          });
        }
      });

      // Set the sector name if a sector exists
      holdSectorsName.value = data.value.basic_sectors[0].name;

      if (totalJobsCount > 0) {
        isJobLoading.value = false;
        JobDetails.value = data.value.basic_sectors;
      } else {
        console.log("No jobs found in any subsector.");
        JobDetails.value = [];
      }
    } else {
      console.log("No basic_sectors found.");
      JobDetails.value = [];
    }
  } catch (error) {
    console.error("Error during fetching:", error);
  } finally {
    isJobLoading.value = false;
  }
};

const handleSearchJobs = async () => {
  console.log("Fetching for search icons mainInputSearch.valueis clicked now ...",mainInputSearch.value);

  await fetchJobByPostnName(mainInputSearch.value);
};

const fetchJobByMap = async (selectedRegions, hasSectorId) => {
  console.log("Inside fetchJobmpas");

  if (!selectedRegions || selectedRegions.length === 0) {
    console.log("No regions selected, skipping fetch.");
    return;
  }

  // Define query and variables based on sector ID presence
  let queryparam = hasSectorId ? GET_SECTOR_MAP : GET_JOB_MAP;
  let variablesParam = {
    SelectedRegion: selectedRegions,
    limit: pageSize,
    offset: offset.value,
  };

  if (hasSectorId) {
    variablesParam.SectorId = route.query.sid;
  }

  isJobLoading.value = true;

  try {
    const { data } = await useAsyncQuery({
      query: queryparam,
      variables: variablesParam,
    });

    if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
      JobDetails.value = data.value.basic_sectors;
      totalJobs.value = data.value.jobs_aggregate?.aggregate?.count || 0;
      totalPages.value = Math.ceil(totalJobs.value / pageSize);
      holdSectorsName.value = hasSectorId
        ? data.value.basic_sectors[0]?.name
        : null;
    } else {
      console.log("No jobs found.");
      JobDetails.value = [];
      totalJobs.value = 0;
      totalPages.value = 0;
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    JobDetails.value = [];
    totalJobs.value = 0;
    totalPages.value = 0;
  } finally {
    isJobLoading.value = false;
  }
};

const fetchJobByPostnName = async (Id) => {
  console.log(" inside fetchJobByPostnName Positions Id:-", Id);
  isJobLoading.value = true;

  try {
    let variable = {
      SectorID: route.query.sid,
      Position: Id,
      limit: pageSize,
      offset: offset.value,
    };
    if (route.query.rid) {
      console.log("Regions Id is exist on route now in fetch By positions ...");
      variable.SelectedRegion = route.query.rid;
    }

    let query = route.query.rid ? GET_JOBPMSECT : JOB_POSITION_NAME;
    console.log("variables here ", variable);
    const { data } = await useAsyncQuery({
      query: query,
      variables: variable,
    });
    // Log the entire response to inspect its structure
    console.log("position click Response...", data.value?.basic_sectors);
    totalJobs.value =
      data.value?.basic_sectors[0]?.sub_sectors[0]?.jobs_aggregate?.aggregate.count;
    totalPages.value = Math.ceil(totalJobs.value / pageSize);
    console.log("Totals Jobs of positions ", totalJobs.value);
    if (totalJobs.value === 0) {
      JobDetails.value = [];
      return;
    }
    console.log(
      "data.value.basic_sectors[0].name on mounted ",
      data.value?.basic_sectors[0]?.name
    );
    // Check if basic_sectors exists and has data
    if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
      console.log("Positions name response is not empty now ...");
      isJobLoading.value = false;
      holdSectorsName.value = data.value?.basic_sectors[0]?.name;
      // At least one job was found
      isJobLoading.value = false;
      JobDetails.value = data.value?.basic_sectors;
    } else {
      JobDetails.value = [];
    }
  } catch (error) {
    console.log("Error during fetching:", error);
    JobDetails.value = [];
  } finally {
    isJobLoading.value = false;
  }
};

const fetchJobTypes = async (type) => {
  fetchType.value = "types";
  isJobLoading.value = true;
  console.log("Inside fetchJobTypes, Type:", type);
  // Determine the query and variables based on sector ID presence
  let queryParam = route.query.sid ? JOB_FETCH_TYPE : JOB_TYPE;
  let variablesParam = {
    types: type,
    limit: pageSize,
    offset: offset.value,
  };

  // If sector ID is present, include it in the variables
  if (route.query.sid) {
    console.log(
      "Both job type and sector ID are present. Using JOB_FETCH_TYPE..."
    );
    variablesParam.SectorID = route.query.sid;
  } else {
    console.log("Sector ID not found. Using JOB_TYPE...");
  }

  try {
    console.log("Variables types passed", variablesParam);
    const { data } = await useAsyncQuery({
      query: queryParam,
      variables: variablesParam,
    });

    console.log("Data.value ", data.value?.basic_sectors);
    // Extract total jobs and pages
    totalJobs.value =
      data.value.basic_sectors[0].sub_sectors[0].jobs_aggregate.aggregate.count;
    totalPages.value = Math.ceil(totalJobs.value / pageSize);
    console.log("total Jobs ", totalJobs.value);
    // Process job details
    if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
      let totalJobsCount = 0;

      // Sum up job counts across all sectors and subsectors
      data.value.basic_sectors.forEach((sector) => {
        if (sector.sub_sectors && Array.isArray(sector.sub_sectors)) {
          sector.sub_sectors.forEach((subsector) => {
            totalJobsCount += subsector.jobs ? subsector.jobs.length : 0;
          });
        }
      });

      // Set the sector name if a sector exists
      holdSectorsName.value = data.value.basic_sectors[0].name;

      if (totalJobsCount > 0) {
        isJobLoading.value = false;
        JobDetails.value = data.value.basic_sectors;
      } else {
        console.log("No jobs found in any subsector.");
        isJobLoading.value = false;
        JobDetails.value = [];
      }
    } else {
      console.log("No basic_sectors found.");
      isJobLoading.value = false;
      JobDetails.value = [];
    }
  } catch (error) {
    console.error("Error during fetching:", error);
    isJobLoading.value = false;
  }
};
const handleKPI = async (tab) => {
  console.log("Inside HandleKpi functions.... tab", tab);
  activeTabs.value = tab;
  console.log("Active tab is ", activeTabs.value);
  if (tab == "KPI") {
    console.log("Jobs KPI.....");
    await fetchKPI();
  } else if (tab === "Analysis") {
    console.log("Job analysis called....");
    await fetchJobAnalysis();
  }
};
watch(activeTabs, (newtab) => {
  if (newtab) {
    console.log("Active tab is ", newtab);
  }
});
const fetchJobAnalysis = async () => {
  try {
    const { data } = await useAsyncQuery({
      query: JOB_ANALYSIS,
      variables: {
        JobID: route.params.id,
      },
    });
    console.log("fetched data analysis results now ...", data.value?.job);
    storeJobAnalysis.value = data.value?.job;
  } catch (error) {
    console.log("Error while fetching job analysis ".error);
  }
};

const fetchKPI = async () => {
  isKPIloading.value = true;
  console.log("Inside of FetchKPI", route.params.id);
  try {
    const { data } = await useAsyncQuery({
      query: KPI,
      variables: {
        JobId: route.params.id,
      },
    });
    console.log("fetchKPI fetch results here ", data.value?.job);
    storeKPI.value = data.value?.job;
    isKPIloading.value =false;
  } catch (error) {
    console.log("error during fetching KPI ", error);
  }
};

const fetchJobDetails = async (id) => {
  fetchType.value = "details";
  isFetchJobALlSctr.value = false;
  console.log("Fetch Job details is being called now ");
  try {
    isJobLoading.value = true;
    // Pass limit as pageSize and offset as computed (e.g. (currentPage - 1) * pageSize)
    console.log(
      "total pages and limit passed to graphql now",
      pageSize,
      offset.value,
      "and Id is now ",
      id
    );
    const { data, error } = await useAsyncQuery({
      query: JOB_DETAILS,
      variables: { ID: id, limit: pageSize, offset: offset.value },
    });
    if (error.value) {
      console.log("Error while fetching data here..", error.value);
    }
    console.log("Graphql data results now ...", data.value);
    totalJobs.value =
      data.value?.basic_sectors[0]?.sub_sectors[0]?.jobs_aggregate?.aggregate?.count;
    totalPages.value = Math.ceil(totalJobs.value / pageSize);
    console.log("Total jobs for subsectors now is...", totalJobs.value);
    console.log("Total pages is now..", totalPages.value);
    if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
      let totalJobsCount = 0;
      // Loop over each sector and its subsectors to sum up job counts (jobs returned in this query)
      data.value.basic_sectors.forEach((sector) => {
        if (sector.sub_sectors && Array.isArray(sector.sub_sectors)) {
          sector.sub_sectors.forEach((subsector) => {
            totalJobsCount += subsector.jobs ? subsector.jobs.length : 0;
          });
        }
      });
      // Set the sector name regardless of jobs count
      holdSectorsName.value = data.value.basic_sectors[0].name;
      console.log("sum of jobs calculated is ", totalJobsCount);
      // Calculate total pages from total jobs and pageSize

      if (totalJobsCount > 0) {
        // At least one job was found in the returned data
        JobDetails.value = data.value.basic_sectors;
      } else {
        console.log("No jobs found in any subsector.");
        JobDetails.value = [];
      }
    } else {
      console.log("No basic_sectors found.");
      JobDetails.value = [];
    }
  } catch (error) {
    console.log("Here is details errors ", error);
  } finally {
    isJobLoading.value = false;
  }
};
const fetchJobAllSectors = async () => {
  console.log("inside fetchJobAllSectors ");
  isFetchJobALlSctr.value = true;
  isJobLoading.value = true;
  fetchType.value = "allsectors";
  try {
    // Pass limit as pageSize and offset as computed (e.g. (currentPage - 1) * pageSize)

    const { data, error } = await useAsyncQuery({
      query: JOB_ALLSECTORS,
      variables: { limit: pageSize, offset: offset.value },
    });
    console.log("fetch ALl sectors data results ", data.value);
    if (error.value) {
      console.log("Error while fetching data here..", error.value);
    }
    console.log("data results ", data.value);
    totalJobs.value =
      data.value?.basic_sectors[1]?.sub_sectors[0]?.jobs_aggregate?.aggregate?.count;
    totalPages.value = Math.ceil(totalJobs.value / pageSize);
    console.log("Total jobs for subs.", totalJobs.value);
    console.log("Total pages is now...", totalPages.value);
    if (data.value?.basic_sectors && data.value.basic_sectors.length > 0) {
      let totalJobsCount = 0;
      // Loop over each sector and its subsectors to sum up job counts (jobs returned in this query)
      data.value.basic_sectors.forEach((sector) => {
        if (sector.sub_sectors && Array.isArray(sector.sub_sectors)) {
          sector.sub_sectors.forEach((subsector) => {
            totalJobsCount += subsector.jobs ? subsector.jobs.length : 0;
          });
        }
      });
      // Set the sector name regardless of jobs count
      holdSectorsName.value = data.value.basic_sectors[0].name;

      // Calculate total pages from total jobs and pageSize

      if (totalJobsCount > 0) {
        // At least one job was found in the returned data
        JobDetails.value = data.value.basic_sectors;
      } else {
        console.log("No jobs found in any subsector.");
        JobDetails.value = [];
      }
    } else {
      console.log("No basic_sectors found.");
      JobDetails.value = [];
    }
  } catch (error) {
    console.log("Here is details errors ", error);
  } finally {
    isJobLoading.value = false;
  }
};
console.log("ROute in jobdetails test ", JobID.value);

const fetchCities = async () => {
  try {
    const { data, error } = await useAsyncQuery({
      query: BASIC_CITY,
    });

    if (error.value) {
      throw new Error("Failed to fetch cities: " + error.value.message);
    }

    // Update the reactive state
    baseCity.value = data.value?.basic_cities || [];
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};
const fetchSectors = async () => {
  try {
    const { data, error } = await useAsyncQuery({
      query: BASIC_SECTORS,
    });

    if (error.value) {
      throw new Error("Failed to fetch sectors: " + error.value.message);
    }

    // Update the reactive state
    basicSectors.value = data.value?.basic_sectors || [];
  } catch (error) {
    console.error("Error fetching sectors:", error);
  }
};
const fetchBasicPositions = async () => {
  try {
    const { data, error } = await useAsyncQuery({
      query: BASIC_POSITIONS,
    });

    if (error.value) {
      throw new Error("Failed to fetch positions: " + error.value.message);
    }

    // Update the reactive state
    basicPositions.value = data.value?.basic_positions || [];
  } catch (error) {
    console.error("Error fetching positions:", error);
  }
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////

const HandLeCitySearch = async () => {
  if (citySearch.value) {
    const { data } = await useAsyncQuery({
      query: SEARCH_CITY,
      variables: { CityName: `%${citySearch.value}%` },
    });
    if (data.value?.basic_cities) {
      baseCity.value = data.value.basic_cities;
    } else {
      console.log("No cities found.");
      baseCity.value = [];
    }
  } else {
    console.log("Input is empty, clearing dropdown.");
    baseCity.value = [];
  }
};
const closeMainSearch = () => {
  mainInputSearch.value = "";
  fetchJobDetails(JobID.value);
};
const hndlMnInptSrch = async () => {
  showDropdown.value = true;
  console.log("Main searches now ", mainInputSearch.value);
  try {
    if (mainInputSearch.value) {
      const { data } = await useAsyncQuery({
        query: JOB_POSITIONS_SEARCH,
        variables: { Position: `%${mainInputSearch.value}%` },
      });
      // console.log("Fetched main searches ", data.value?.basic_sectors);
      mainSearchJobs.value = data.value?.basic_sectors;
      // Filter unique positions
      mainSearchJobs.value.forEach((sector) => {
        sector.sub_sectors.forEach((subSector) => {
          subSector.jobs.sort((a, b) =>
            a.position.name.localeCompare(b.position.name)
          );
        });
      });
      uniquePositions.value = getUniquePositions(mainSearchJobs.value);
      // console.log("Unique Positions: ", uniquePositions.value);
    }
  } catch (error) {
    console.log("Error while fetching main searches...", error);
  }
};

// Filter unique positions
//////////////////////////////////////////////////////////////////////////////////////////////////
async function goToPage(page) {
  if (page === "...") return;

  currentPage.value = page;
  if (fetchType.value === "details") {
    await navigateTo({
      path: "/jobs",
      query: {
        sid: JobID.value,
        page: page,
      },
    });
    fetchJobDetails(JobID.value);
  } else if (fetchType.value === "allsectors") {
    navigateTo({
      path: "/jobs",
      query: {
        sid: undefined,
        page: page,
      },
    });
    fetchJobAllSectors();
  } else if (fetchType.value === "types") {
    fetchJobTypes(selectedALlJobTypes.value);
  }
}

const paginationPages = computed(() => {
  const pages = [];

  // For a low number of pages, display all pages.
  if (totalPages.value <= 7) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Always show the first page.
    pages.push(1);

    // When near the beginning: show pages 2 to 5 then an ellipsis.
    if (currentPage.value <= 4) {
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
    }
    // When near the end: show an ellipsis then the last 4 pages.
    else if (currentPage.value >= totalPages.value - 3) {
      pages.push("...");
      for (let i = totalPages.value - 4; i < totalPages.value; i++) {
        pages.push(i);
      }
    }
    // In the middle: show ellipsis, current-1, current, current+1, then another ellipsis.
    else {
      pages.push("...");
      pages.push(
        currentPage.value - 1,
        currentPage.value,
        currentPage.value + 1
      );
      pages.push("...");
    }
    // Always show the last page.
    pages.push(totalPages.value);
  }
  console.log("Number of Pages now ", pages);

  return pages;
});

//////////////////////////////////////////////////////////////////////////////////////////////////

const HandLeSectorSearch = async () => {
  if (sectorSearch.value) {
    const { data } = await useAsyncQuery({
      query: SEARCH_SECTORS,
      variables: { SectorName: `%${sectorSearch.value}%` },
    });
    if (data.value?.basic_sectors) {
      basicSectors.value = data.value?.basic_sectors;
    } else {
      console.log("No cities found.");
      basicSectors.value = [];
    }
  } else {
    console.log("input is clear now ...");
    basicSectors.value = [];
  }
};
// ////////////////////////////////////////////////////////////////////////////////////////////////////
const getUniquePositions = (jobs) => {
  const uniquePositions = [];
  const seenNames = new Set();

  jobs.forEach((sector) => {
    sector.sub_sectors.forEach((subSector) => {
      subSector.jobs.forEach((job) => {
        const positionName = job.position.name;
        if (!seenNames.has(positionName)) {
          seenNames.add(positionName);
          uniquePositions.push(job.position);
        }
      });
    });
  });
  return uniquePositions;
};
// ////////////////////////////////////////////////////////////////////////////////////////////////////

const HandlePositionInput = async () => {
  if (PositionSearch.value) {
    const { data } = await useAsyncQuery({
      query: SEARCH_POSITIONS,
      variables: { PositionSrch: `%${PositionSearch.value}%` },
    });
    if (data.value?.basic_positions) {
      console.log("Positions searching now ...");
      basicPositions.value = data.value.basic_positions;
    } else {
      console.log("No Positions found.");
      basicPositions.value = [];
    }
  } else {
    console.log("input is clear ...");
    // basicPositions.value = [];
  }
};

const handleCLoseButton = async (type) => {
  if (type === "city") {
    console.log("type is city");
    holdCityName.value = null;
    cityId.value = "";
    const query = { ...route.query, page: route.query.page };
    delete query.cid;
    await navigateTo({
      path: "/jobs",
      query: query,
    });
    if (route.query.sid) {
      await fetchJobDetails(route.query.sid);
    } else {
      await fetchJobAllSectors();
    }
  } else {
    console.log("type is positions");
    holdPositionName.value = null;
    PositionId.value = "";
    const query = { ...route.query, page: route.query.page };
    delete query.pid;
    await navigateTo({
      path: "/jobs",
      query: query,
    });
    await fetchJobDetails(route.query.sid);
  }
};
const handleSectorHide = async () => {
  try {
    console.log("Fetching jobs with all sectors now...");
    // Set loading state
    isJobLoading.value = true;
    // Reset sector-related states
    holdSectorsName.value = null;
    sectorHide.value = true;
    JobID.value = "";
    console.log("Route.rid now", route.query.rid);
    // Preserve existing query parameters (e.g., region IDs)
    const query = { ...route.query, page: 1 };
    delete query.sid;

    await navigateTo({
      path: "/jobs",
      query,
    });

    // Fetch jobs for all sectors after navigation is complete
    await fetchJobAllSectors();
  } catch (error) {
    console.error("Error during navigation or fetching jobs:", error);
  } finally {
    // Reset loading state
    isJobLoading.value = false;
  }
};

const HandleCtyFiltr = async (id, name) => {
  isCityOpen.value = false;
  holdCityName.value = name;
  console.log("selected city name ", holdCityName.value);
  cityId.value = id;
  await navigateTo({
    path: "/jobs",
    query: {
      rid:
        selectedRegionIds.value.length > 0
          ? selectedRegionIds.value
          : undefined,
      sid: route.query.sid ? route.query.sid : undefined,
      t:
        selectedALlJobTypes.value.length > 0
          ? selectedALlJobTypes.value
          : undefined,
      cid: id,
      page: 1,
    },
  });
  await fetchJobByCity();
};

const handleSectorsId = (id) => {
  isTitleClicked.value = false;
  isSectorClicked.value = false;
  JobID.value = id;

  // Preserve existing query parameters (e.g., region IDs)
  const query = { ...route.query, sid: id, page: 1 };

  // Navigate to the updated route
  navigateTo({
    path: "/jobs",
    query,
  });

  // Fetch job details for the selected sector ID
  fetchJobDetails(id);
};
// Handle errors

const checkPositions = async (name, id) => {
  console.log("Position name ", name);
  PositionId.value = id;
  holdPositionName.value = name;
  isPositionOpen.value = false;
  const queryParams = {
    rid:
      selectedRegionIds.value.length > 0 ? selectedRegionIds.value : undefined,
    sid: route.query.sid ? route.query.sid : undefined,
    pid: id,
    page: 1,
  };
  await navigateTo({
    path: "/jobs",
    query: queryParams,
  });
  await fetchJobByPostnName(id);
};
const truncateText = (html, limit) => {
  // Remove HTML tags
  const plainText = html?.replace(/<\/?[^>]+(>|$)/g, "") || "";

  // Truncate text safely
  return plainText.length > limit
    ? plainText.substring(0, limit) + "..."
    : plainText;
};

const checkSelectedExper = () => {
  isSelcExpTen.value = !isSelcExpTen.value;
  if (isSelcExpTen.value) {
    holdExpTen.value = 10;
    console.log("Selected experience is now ::", holdExpTen.value);
  } else {
    holdExpTen.value = null;
  }
  console.log("Is selected Exp Ten ", isSelcExpTen.value);
};

const handleFilterClicked = () => {
  checkFilter.value = !checkFilter.value;
};
const handleTitleClick = () => {
  showDropdown.value = false;
  isCityOpen.value = false;
  isPositionOpen.value = false;
  isSectorClicked.value = !isSectorClicked.value;
  isTitleClicked.value = !isTitleClicked.value;
};

const togglePositions = () => {
  isCityOpen.value = false;
  showDropdown.value = false;
  isTitleClicked.value = false;
  isPositionOpen.value = !isPositionOpen.value;
};
const toggleCity = () => {
  isCityOpen.value = !isCityOpen.value;
  isPositionOpen.value = false;
  showDropdown.value = false;
  isTitleClicked.value = false;
};
// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showDropdown.value = false;
    isPositionOpen.value = false;
  }
};
const getSkeletonJobs = () => {
  const skeletonCount = 20; // Number of skeletons to render
  return Array.from({ length: skeletonCount }, (_, i) => i + 1);
};
const allJobs = computed(() => {
  let jobs = [];
  if (JobDetails.value && JobDetails.value.length > 0) {
    JobDetails.value.forEach((sector) => {
      if (sector.sub_sectors && sector.sub_sectors.length > 0) {
        sector.sub_sectors.forEach((subSector) => {
          if (subSector.jobs && subSector.jobs.length > 0) {
            jobs = jobs.concat(subSector.jobs);
          }
        });
      }
    });
  }

  console.log("Total fetched jobs before limiting:", jobs.length);

  // Ensure only `limit` number of jobs is returned per page
  let paginatedJobs = jobs.slice(0, pageSize);

  console.log("Jobs displayed on page:", paginatedJobs.length);
  currentJobsLenght.value = jobs.length;

  return paginatedJobs;
});

const handleJobId = async (id) => {
  console.log("Jobs Ids ", id);
  if (hasNoQueryParams) {
    isSpecificJobs.value = true;
    console.log("Have no query parameters now");

    await navigateTo({
      path: `/jobs/${id}`,
    });

    // Delay fetching until route has changed
    nextTick(() => {
      fetchSpecificJobs(id);
    });
  } else {
    console.log("Have parameters inside handleJobId");
  }
};

const correctTypeNm = (type) => {
  return type
    .split(/[_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" ");
};
const fetchSpecificJobs = async (id) => {
  let variablesParam;
  console.log("Inside of fetchSpecific Jobs here Id is ....", id);
  isJobLoading.value = true;
  try {
    const { data } = await useAsyncQuery({
      query: JOB_SPECIFIC_DETAILS,
      variables: { JobId: id },
    });
    console.log("Specific jobs details response", data.value?.job);
    if (data.value?.job) {
      specificJobs.value = data.value.job; // Assign only if data exists
    }
    variablesParam = {
      SubsctrId: specificJobs.value?.sub_sector?.id,
      EntityId: specificJobs.value?.entity?.id,
      title: specificJobs.value?.title,
    };
    console.log("to be passed variables here ", variablesParam);
    const { data: relatedJobs } = await useAsyncQuery({
      query: RELATED_JOBS,
      variables: variablesParam,
    });
    console.log("similars jobs results ...", relatedJobs.value?.RelatedJobs);
    if (relatedJobs.value?.RelatedJobs) {
      storeRelatedJobs.value = relatedJobs.value.RelatedJobs;
    }
  } catch (error) {
    console.error("Error fetching specific job details", error);
  } finally {
    isJobLoading.value = false;
  }
};
const mapSectorImages = (name) => {
  let mapping = {
    business: "",
    naturalScience: "",
    socialScience: "",
    creativeArts: "",
    Educations: "",
    Finance: "",
    Engineering: "",
    HealthCare: "",
    Hospitality: "",
    ict: "",
    LegalServices: "",
    manufacturing: "",
    lowAndmedium: "",
    nonProfit: "",
  };
  console.log("console here ", mapping[0]);
};
let mapping = {
  business: "",
  naturalScience: "",
  socialScience: "",
  creativeArts: "",
  Educations: "",
  Finance: "",
  Engineering: "",
  HealthCare: "",
  Hospitality: "",
  ict: "",
  LegalServices: "",
  manufacturing: "",
  lowAndmedium: "",
  nonProfit: "",
};
console.log("console here ", mapping[0]);
watch(PositionId, async (newPosition) => {
  console.log("watching positions here...", newPosition);
  await fetchJobByPostnName(newPosition);
});
watch(selectedALlJobTypes, (newval) => {
  if (newval) {
    console.log("changed job types here now its arrays ", newval);
    fetchJobTypes(newval);
  }
});

watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      console.log("Route changed, fetching job for ID:", newId);
      fetchSpecificJobs(newId);
    }
  },
  { immediate: true }
);

watch(
  () => route.query.sid,
  async (newSid) => {
    if (newSid) {
      console.log("Route changed. Fetching job details for new Sector ID...");
      JobID.value = newSid;
      await fetchJobDetails(newSid);
    } else if (!hasNoQueryParams) {
      console.log("Route changed. No Sector ID found. Fetching all sectors...");
      await fetchJobAllSectors();
    }
  },
  { immediate: true }
);
watch(
  [JobID, cityId, citySearch],
  async ([newJobID, newCityId]) => {
    if (newJobID && newCityId) {
      await fetchJobByCity();
    }
  },
  {
    immediate: true,
  }
);
watch(selectedRegionIds.value, async (newRegions) => {
  console.log("Regions selected now....", newRegions);

  if (selectedRegionIds.value.length === 0 && !route.query.sid) {
    console.log("No selected region and no sector ID, fetching all sectors...");
    await fetchJobAllSectors();
  } else if (selectedRegionIds.value.length === 0 && route.query.sid) {
    console.log(
      "No selected regions, but sector ID is present, fetching job details..."
    );
    await fetchJobDetails(route.query.sid);
  } else if (
    selectedRegionIds.value.length > 0 &&
    route.query.sid &&
    !route.query.pid
  ) {
    console.log(
      "Regions selected and sector ID present, fetching jobs by sector map..."
    );
    await fetchJobByMap(newRegions, true);
  } else if (
    selectedRegionIds.value.length > 0 &&
    route.query.sid &&
    route.query.pid
  ) {
    console.log(
      "Regions selected and sector ID plus position id present, fetching jobs by sector map..."
    );
    await fetchJobByPostnName(route.query.pid);
  } else {
    console.log(
      "Regions selected but no sector ID, fetching jobs by region map..."
    );
    await fetchJobByMap(newRegions, false);
  }
});
watch(
  () => route.query.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = parseInt(newPage); // Ensure it's a number
    } else {
      currentPage.value = 1; // Default to page 1 if no page query is present
    }
  },
  { immediate: true } // Trigger immediately on component mount
);
watch([rangeValue, isSelcExpTen], ([newRange, newIsSelcExpTen]) => {
  console.log("New range values:", newRange);
  console.log("Checkbox value:", newIsSelcExpTen);

  if (newIsSelcExpTen) {
    // If checkbox is selected, force both values to 10
    lessZn.value = 10;
    greaterZn.value = 10;
    console.log("Checkbox selected. Setting experience to 10.");
  } else {
    // Otherwise, use the values from the rangeValue reactive array.
    // Adjust the indices if needed based on how you structure rangeValue.
    lessZn.value = newRange[1];
    greaterZn.value = newRange[0];
    console.log(
      "Checkbox not selected. Using range: less =",
      lessZn.value,
      " greater =",
      greaterZn.value
    );
  }
  // Fetch jobs with the determined experience values.
  fetchJobExp(lessZn.value, greaterZn.value);
});
onMounted(async () => {
  isJobLoading.value = true;
  document.addEventListener("click", handleClickOutside);
  await nextTick();

  // Fetch essential data
  await Promise.all([fetchBasicPositions(), fetchCities(), fetchSectors()]);

  const sectorId = route.query.sid;
  const regionIds = route.query.rid;
  const postnId = route.query.pid;
  if (sectorId && regionIds && regionIds === undefined) {
    console.log(
      "Both sector ID and region IDs are present. Fetching by sector map..."
    );
    JobID.value = sectorId;
    await fetchJobByMap(regionIds, true);
  } else if (sectorId && postnId && regionIds === undefined) {
    console.log("both sector Id and position Id is presents ...");
    await fetchJobByPostnName(postnId);
  } else if (sectorId && regionIds && postnId) {
    console.log("three of them are presents now (sectorId,regionId,postn id)");
    await fetchJobByPostnName(postnId);
  } else if (sectorId) {
    console.log("Only sector ID is present. Fetching job details...");
    JobID.value = sectorId;
    await fetchJobDetails(route.query.sid);
  } else if (regionIds) {
    console.log("Only region IDs are present. Fetching jobs by region map...");
    await fetchJobByMap(regionIds, false);
  } else if (postnId) {
    console.log("Only Position Id is presents now ");
    await fetchJobByPostnName(postnId);
  } else if (hasNoQueryParams) {
    console.log("No query parameters exist now on mounte ");
    isSpecificJobs.value = true;
    await fetchSpecificJobs(route.params.id);
    return;
  } else {
    console.log("No sector ID or region IDs found. Fetching all sectors...");
    await fetchJobAllSectors();
  }

  isJobLoading.value = false;
});

// Cleanup listener
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="flex lg:flex-row flex-col lg:gap-2 gap-8 h-screen">
    <div
      class="lg:w-[20%] w-full lg:px-[1px] sm:px-5 relative top-0 h-[64rem]"
      :class="[
        colorStore.colorMode === 'light' ? 'text-gray-500 ' : 'text-white',
      ]"
    >
      <div class="w-full p-2">
        <!--this div contains all elements under left divs-->
        <div
          class="relative flex items-center justify-between p-2"
          @click="handleFilterClicked"
        >
          <p
            class="text-lg font-bold flex gap-3 md:ml-5 -ml-5 md:px-2 px-0 py-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="lg:w-5 lg:h-5 w-6 h-6 mt-1"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
              />
            </svg>
            <span
              class="lg:text-[18px] md:text-lg"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-700 font-bold '
                  : 'text-white',
              ]"
            >
              Additional Filters</span
            >
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4 cursor-pointer"
              :class="{ 'rotate-180': checkFilter }"
            >
              <path d="M5 9l7 7 7-7" />
            </svg>
          </p>
        </div>

        <div v-if="checkFilter" class="max-h-[15rem] z-50 w-auto">
          <div
            class="lg:max-w-[15rem] md:w-[44rem] py-[1px] md:ml-auto mt-10 lg:mx-5 mx-auto"
          >
            <div class="w-[22rem] ml-3 md:w-full">
              <Vue3Slider
                v-model="rangeValue"
                :min="0"
                :disabled="isSelcExpTen"
                :max="10"
                :step="1"
                :height="9"
                range
                class="slider-width"
                :slider-width="600"
                :dot-size="14"
                :track-height="16"
                :tooltip="'always'"
                :lazy="true"
                :tooltip-style="{
                  backgroundColor: '#0D9488',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  padding: '2px 1px 1px 1px',
                  borderRadius: '1px',
                  minWidth: '18px',
                }"
                :track-style="{ backgroundColor: '#0D9488' }"
                :process-style="{
                  backgroundColor: '#0D9488',
                  height: '9px',
                  padding: '3px 3px 3px 3px ',
                  color: '#FFFFFF',
                }"
                :dot-style="{
                  backgroundColor: '#0D9488',
                  border: '2px solid white',
                  cursor: 'grabbing',
                }"
              />
            </div>
            <div class="flex items-center justify-between mb-1">
              <p class="mt-2 md:text-sm ml-2 md:ml-0 text-[17px]">
                <span class="mr-1">0</span>-
                <span class="mr-1">{{ rangeValue[1] }}</span> year of experience
              </p>
              <p class="flex items-center mt-2 mr-2 md:mr-0">
                <span>
                  <input
                    v-model="isSelcExpTen"
                    @click="checkSelectedExper"
                    type="checkbox"
                    class="w-10 mt-2 h-[17px]"
                /></span>
                <span>>10</span>
              </p>
            </div>
            <p class="border-b-[0.5px] mt-3 mb-4 border-gray-500"></p>
            <div>
              <h2 class="text-[20px] md:text-[16px]">Type</h2>
              <div
                class="mt-3 flex flex-wrap flex-shrink-0 items-center md:gap-2 gap-3"
              >
                <button
                  v-for="(selected, type, index) in selectedButtons"
                  :key="type"
                  @click="toggleButton(type)"
                  :class="[
                    'border text-sm flex items-center justify-center border-teal-400 rounded-full md:px-[5px] md:py-[1.5px] px-[9px] py-[3px]',
                    selectedALlJobTypes.includes(type)
                      ? 'bg-teal-500 text-white'
                      : '',
                    index >= 3 ? 'sm:basis-1/2 md:basis-auto' : '', // First 3 stay in one row, others take half width on new rows in small screens
                  ]"
                >
                  <p class="flex items-center justify-center mb-[1px]">
                    <span class="md:text-[13px] text-[16px]">
                      {{ correctTypeNm(type) }}
                    </span>
                    <span class="text-[12px] font-bold ml-[2px]">
                      {{ selected ? "-" : "+" }}
                    </span>
                  </p>
                </button>
              </div>

              <div class="mt-7">
                <Citymap />
              </div>
              <div>
                <div class="flex flex-wrap items-center gap-1 mt-3">
                  <div
                    v-for="(region, index) in selectRegions"
                    :key="index"
                    class="m-1 bg-teal-600 flex items-center text-white px-[9px] text-[13px] py-[2px] rounded-full"
                  >
                    {{ region }}
                  </div>
                </div>
                <div v-if="selectRegions.length > 0">
                  <button
                    @click="handleClearAllMap"
                    class="text-[11px] px-2 text-teal-600 border border-teal-600 rounded-full"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second divisions here-->
    <div class="lg:w-[80%] w-full mb-2">
      <div
        class="flex fixed top-[4rem] z-50 lg:flex-row py-8 lg:mr-[10px] flex-col-reverse items-center justify-center md:gap-7 gap-7 lg:gap-0 shadow-slate-400 backdrop-blur-md"
      >
        <!-- This div contains 4 thing input,select positions,titles and select city in flex ways for large screens -->
        <div
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-400 border-gray-300 '
              : 'bg-gray-600 text-white border-none',
            showDropdown ? 'rounded-l-none' : 'rounded-l-lg',
          ]"
          class="relative md:ml-4 lg:ml-0 lg:rounded-tl-lg flex items-center md:w-[40rem] w-[22rem] lg:w-[28rem] lg:py-[6px] py-3 border"
        >
          <div class="flex-1 lg:ml-5">
            <input
              type="text"
              v-model="mainInputSearch"
              @input="hndlMnInptSrch"
              placeholder="Search..."
              class="w-full lg:placeholder:text-sm placeholder:text-[20px] outline-none focus:outline-none bg-transparent border-none px-4"
            />
          </div>
          <div class="flex lg:gap-2 gap-3 ml-auto pr-3">
            <button @click="closeMainSearch">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="lg:w-4 lg:h-4 w-[24px] h-7 text-gray-400 font-bold"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button @click="handleSearchJobs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="lg:w-4 lg:h-4 w-[24px] h-7"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          @click="togglePositions"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-500'
              : 'bg-gray-600 text-white',
          ]"
          class="relative rounded-md md:rounded-none lg:inline-flex ml-2 flex cursor-default items-center justify-between lg:w-[15rem] md:w-[40rem] w-[20rem] px-3 py-[4px] md:py-[4px] lg:py-1"
        >
          <p v-if="holdPositionName">{{ holdPositionName }}</p>

          <p
            v-else
            class="py-[4px] lg:text-sm md:text-[20px] text-lg"
            :class="[colorStore.colorMode === 'light' ? '' : ' text-white']"
          >
            Select positions
          </p>
          <p v-if="holdPositionName">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              @click="handleCLoseButton('position')"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-3 cursor-pointer"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white',
              ]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </p>
          <p v-if="!holdPositionName">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white',
                isPositionOpen ? 'rotate-180' : '',
              ]"
            >
              <path d="M5 9l7 7 7-7" />
            </svg>
          </p>
        </div>
        <div
          v-if="isPositionOpen"
          @click.stop
          id="positions"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-500 border-t-white'
              : 'bg-gray-600 text-white border-t-gray-600',
          ]"
          class="absolute scroll-smooth left-[39px] md:mt-0 lg:mt-0 border overflow-y-auto max-h-[15rem] border-teal-400 mt-[20rem] z-50 lg:left-[458px] right-0 w-[20rem] md:w-[40rem] lg:w-[15rem] md:left-[85px] md:top-[180px] lg:top-[66px]"
        >
          <p
            class="rounded-lg mx-2 md:py-1 lg:py-[1px] mt-3 border border-teal-500"
          >
            <input
              type="text"
              v-model="PositionSearch"
              @click.stop
              @input="HandlePositionInput"
              class="w-[11rem] ml-3 md:py-2 lg:py-1 outline-none p-1 rouded-lg bg-transparent"
              placeholder="search..."
            />
          </p>
          <div class="mt-2">
            <div
              v-for="position in basicPositions"
              @click="checkPositions(position?.name, position?.id)"
              :key="position.id"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-700 font-bold'
                  : '',
              ]"
              class="py-2 px-3 cursor-pointer border-b-[1px] text-[13px]"
            >
              {{ position?.name }}
            </div>
          </div>
        </div>
        <div
          v-if="isCityOpen"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-500 border-t-white'
              : 'bg-gray-600 text-white border-t-gray-600',
          ]"
          class="absolute border md:py-1 lg:py-0 w-[324px] mt-[17rem] lg:mt-[277.5px] md:mt-[11rem] md:left-[84px] z-50 lg:left-[953px] right-0 left-10 lg:max-h-[15rem] md:max-h-[23rem] overflow-y-auto lg:w-[15rem] md:w-[40rem]"
        >
          <p
            class="rounded-lg mx-2 mt-2 border border-teal-500 flex items-center"
          >
            <input
              type="text"
              v-model="citySearch"
              @click.stop
              @input="HandLeCitySearch"
              class="w-[11rem] lg:ml-3 md:ml-3 py-2 outline-none md:placeholder:text-[18px] lg:placeholder:text-[14px] lg:py-[2px] md:py-[10px] rouded-lg bg-transparent"
              placeholder="search..."
            />
          </p>

          <div class="mt-2">
            <!-- this one below is need to be filtered here based on the input setted by users  -->
            <div
              v-for="city in baseCity"
              :key="city.id"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-700 font-bold'
                  : '',
              ]"
              @click="HandleCtyFiltr(city.id, city?.name)"
              class="py-2 px-3 md:mt-1 cursor-pointer md:font-bold border-b-2 lg:text-[13px] md:text-[17px]"
            >
              {{ city?.name }}
            </div>
          </div>
        </div>

        <div
          v-if="showDropdown"
          :class="[
            showDropdown ? 'rounded-none' : '',
            colorStore.colorMode === 'light'
              ? 'bg-white border-gray-400 text-gray-600 font-black '
              : 'bg-gray-600 border-teal-600',
          ]"
          class="absolute top-[68px] border-t-[1px] mt-2 lg:mt-0 z-50 lg:left-0 right-0 max-h-[15rem] overflow-y-auto lg:w-[28rem] w-[42rem] left-10"
        >
          <!-- Dropdown Items -->
          <div v-if="showDropdown && uniquePositions.length > 0">
            <div
              v-for="position in uniquePositions"
              :key="position.id"
              @click="checkPositions(position?.id)"
              class="position border-b-[1px] lg:text-[12px] font-bold text-[18px] lg:p-2 cursor-pointer p-3"
            >
              <p>{{ position.name }}</p>
            </div>
          </div>
        </div>

        <div
          v-if="isTitleClicked"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-500 border-t-white'
              : 'bg-gray-600 text-white border-t-gray-600',
          ]"
          class="absolute border mt-[524px] md:mt-0 lg:top-[56px] md:top-[117px] z-50 md:left-[86px] lg:left-[704px] left-[37px] w-[20rem] lg:max-h-[15rem] md:max-h-[22rem] overflow-y-auto lg:w-[15rem] md:w-[40rem]"
        >
          <p
            class="rounded-lg mx-2 md:py-1 lg:py-[4px] mt-3 border border-teal-500"
          >
            <input
              type="text"
              v-model="sectorSearch"
              @input="HandLeSectorSearch"
              @click.stop
              class="w-full lg:placeholder:text-sm placeholder:text-[20px] outline-none focus:outline-none bg-transparent border-none px-4"
              placeholder="search..."
            />
          </p>
          <div class="mt-2">
            <div
              v-for="sector in basicSectors"
              :key="sector.id"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-700 font-bold'
                  : '',
              ]"
              @click="handleSectorsId(sector.id)"
              class="py-2 px-3 cursor-pointer border-b-2 text-[13px]"
            >
              {{ sector?.name }}
            </div>
          </div>
        </div>
        <!-- div for titles-->
        <div>
          <div
            @click="handleTitleClick"
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-white text-gray-500'
                : 'bg-gray-600 text-white',
            ]"
            class="ml-2 cursor-default rounded-md lg:rounded-none md:rounded-md items-center flex justify-between md:w-[40rem] lg:w-[15rem] w-[20rem] px-4 py-1 md:py-[4px] lg:py-1"
          >
            <p
              class="py-[4px] lg:text-sm md:text-[20px]"
              v-if="holdSectorsName && !isFetchJobALlSctr"
            >
              {{ holdSectorsName }}
            </p>
            <p class="py-[4px] md:text-sm text-lg" v-else>Select sectors</p>
            <p v-if="holdSectorsName && !isFetchJobALlSctr">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                @click="handleSectorHide"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-4 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </p>
            <p v-else>
              <!-- this one is for svg which is like a dropdown menus -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-4 h-4"
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'text-gray-500'
                    : 'text-white',
                  isSectorClicked ? 'rotate-180' : '',
                ]"
              >
                <path d="M5 9l7 7 7-7" />
              </svg>
            </p>
          </div>
        </div>
        <!-- Select options for city-->
        <div
          @click="toggleCity"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-500'
              : 'bg-gray-600 text-white',
          ]"
          class="ml-2 flex rounded-md md:rounded-none lg:inline-flex cursor-default items-center justify-between lg:w-[15rem] md:w-[40rem] w-[20rem] px-4 py-1 md:py-[4px] lg:py-1"
        >
          <p v-if="holdCityName" class="text-[16px] lg:text-sm md:text-[20px]">
            {{ holdCityName }}
          </p>
          <p
            v-if="!holdCityName"
            class="py-[4px] lg:text-sm md:text-[20px] text-[16px]"
          >
            Select city
          </p>
          <p v-if="holdCityName">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              @click="handleCLoseButton('city')"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-3 cursor-pointer"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white',
                isCityOpen ? 'rotate-180' : '',
              ]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </p>
          <p v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-4 h-4"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-gray-500'
                  : 'text-white',
                isCityOpen ? 'rotate-180' : '',
              ]"
            >
              <path d="M5 9l7 7 7-7" />
            </svg>
          </p>
        </div>
      </div>

      <div
        class="h-full overflow-y-auto gap-x-3 gap-y-[3rem] flex mt-9"
        v-if="isSpecificJobs"
      >
        <div
          class="max-w-[54rem] h-fit mt-[3rem]"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white '
              : 'bg-gray-800 text-white',
          ]"
        >
          <div class="flex justify-between p-6 mt-[4px]">
            <div class="flex w-[60%]">
              <!-- this div contains 2 div inside of it logo and other descprion on right sides  -->
              <div
              :class="[
                colorStore.colorMode ==='light' ? 'bg-gray-300':'bg-gray-600'
              ]"
                class=" w-[10rem] mt-8 h-[10rem] flex items-center justify-center rounded-md"
              >
                <p v-if="specificJobs?.entity?.logo">
                  <img
                    :src="specificJobs?.entity?.logo"
                    alt="alternate"
                    class="p-4 max-w-full max-h-full object-contain"
                  />
                </p>
                <p v-else>
                  <img
                    src="https://www.hahu.jobs/images/logo_150.png"
                    alt="Logo"
                    class="p-4 max-w-full max-h-full object-contain"
                  />
                </p>
              </div>

              <div class="ml-5">
                <h1
                  class="text-[1.6rem] font-bold"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-gray-600 font-[800]'
                      : 'bg-gray-800 text-white',
                  ]"
                >
                  {{ correctTypeNm(specificJobs?.position?.name) }}
                </h1>
                <p
                  class="text-[13px] text-gray-200"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-gray-500 font-[600]'
                      : 'bg-gray-800 text-white',
                  ]"
                >
                  {{ correctTypeNm(specificJobs?.entity?.name) }}
                </p>
                <ul
                  class="grid grid-cols-1 gap-x-6 gap-y-[11px] mt-2"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'font-normal'
                      : 'bg-gray-800 text-white',
                  ]"
                >
                  <li class="flex items-center gap-2">
                    <span class="rounded-md">
                      <img
                        src="https://www.hahu.jobs/images/sectors/hospitality.png"
                        alt="Sectors Images"
                        class="w-6 h-6"
                    /></span>
                    <div class="text-[14px] flex gap-3">
                      <p
                        title="Sector"
                        class="ml-1 text-[13px]"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'font-[500]'
                            : ' text-white',
                        ]"
                      >
                        {{ specificJobs?.sub_sector?.sector?.name }}
                      </p>
                      <p class="flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          class="w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          ></path>
                        </svg>
                        <span
                          title="Sub_Sectors"
                          class="text-[12px]"
                          :class="[
                            colorStore.colorMode === 'light'
                              ? 'font-[500]'
                              : 'text-white',
                          ]"
                        >
                          {{ specificJobs?.sub_sector?.name }}
                        </span>
                      </p>
                    </div>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-6 h-6 text-teal-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      class="text-[12px]"
                      v-if="specificJobs?.job_cities?.length === 0"
                    >
                      Addis Ababa
                    </span>
                    <span v-else class="text-[12px]">
                      {{ specificJobs?.job_cities[0]?.city?.name }}
                    </span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-6 h-6 text-teal-600"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="text-[12px]">
                      {{ specificJobs?.years_of_experience || 0 }} years
                    </span>
                  </li>
                  <li class="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-6 h-6 text-teal-600"
                    >
                      <path
                        d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z"
                      ></path>
                    </svg>
                    <span class="text-[12px]">
                      {{
                        specificJobs?.position?.sub_sectors_positions_aggregate
                          ?.aggregate?.count || 0
                      }}
                      positions
                    </span>
                  </li>
                  <li class="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      class="w-5 mr-3 md:w-[22px] fill-teal-600 text-gray-700"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="text-[12px]"
                      >{{ formatDate(specificJobs?.approved_on) }} to
                      {{ formatDate(specificJobs?.deadline) }}</span
                    >
                  </li>
                  <li class="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      :class="[
                        colorStore.colorMode === 'light'
                          ? 'text-white'
                          : 'text-gray-900',
                      ]"
                      class="w-7 h-7 fill-teal-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <span class="text-[14px]">
                      {{ specificJobs?.total_view_count }} views
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <span class="border-[0.5px] h-[15rem] mt-10"></span>
            <div class="w-[40%]">
              <div>
                <button
                  class="flex hover:bg-cyan-300 justify-self-end hover:text-black transition-all duration-700 ease-in-out items-center px-[13px] py-[4px] justify-center gap-1 border rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                  <span class="text-[13px]">Save</span>
                </button>
              </div>

              <div class="px-2">
                <div class="flex mt-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    class="w-4 lg:w-[10px] mr-2 xl:w-5 fill-gray-700 dark:fill-secondary-8"
                  >
                    <path
                      fill="currentColor"
                      d="M16 3c-.625 0-1.246.21-1.781.594L12.563 4.75L10.655 5h-.031l-.031.031A3.39 3.39 0 0 0 8.03 7.594L8 7.625v.031l-.25 1.938l-1.156 1.5l-.032.031v.031c-.699 1.117-.73 2.559.032 3.625l1.187 1.656l.313 1.72l-3.219 4.905l-1.031 1.532h4.781l1.156 2.687L10.5 29l1.031-1.563l3.156-4.75c.848.348 1.805.38 2.626 0l3.156 4.75L21.5 29l.719-1.719l1.156-2.687h4.781l-1.031-1.532L24 18.313l.25-1.875l1.156-1.656l.032-.031v-.031c.699-1.117.73-2.528-.032-3.594L24.25 9.469l-.375-1.875h.031c-.004-.024-.027-.04-.031-.063c-.18-1.308-1.215-2.37-2.531-2.531h-.032l-1.875-.25l-1.656-1.156A3.07 3.07 0 0 0 16 3m0 2.031c.23 0 .457.07.625.188L18.406 6.5l.219.156l.25.032L21.063 7h.03c.45.05.762.363.813.813v.062l.407 2.219l.03.219l.157.187l1.281 1.781c.239.332.27.895-.031 1.375l-1.406 1.969l-.032.25L22 18.063v.03a1 1 0 0 1-.156.438l-.063.032v.03a.88.88 0 0 1-.593.313h-.063l-2.281.407l-.25.03l-.188.157l-1.781 1.281c-.332.239-.926.27-1.406-.031l-1.625-1.25l-.188-.156l-.281-.032L10.937 19h-.03a.89.89 0 0 1-.688-.438a1 1 0 0 1-.125-.375v-.062l-.406-2.281l-.032-.25l-.156-.188l-1.281-1.781c-.239-.332-.27-.926.031-1.406l1.25-1.625l.156-.188l.031-.281l.282-2.094c.004-.015.027-.015.031-.031a1.4 1.4 0 0 1 1-1c.016-.004.016-.027.031-.031l2.094-.282l.25-.03l.219-.157l1.781-1.281c.168-.117.395-.188.625-.188m6.906 15.219l1.532 2.344H22.03l-.25.625l-.687 1.593l-2.125-3.25l.468-.343l1.97-.344v.031c.023-.004.038-.027.062-.031a2.97 2.97 0 0 0 1.437-.625zm-13.812.031a2.85 2.85 0 0 0 1.562.719h.031l1.907.25l.437.344l-2.125 3.218l-.687-1.593l-.25-.625H7.563z"
                    ></path>
                  </svg>
                  <span class="text-[16px]"> Required Skills</span>
                </div>
                <div v-if="specificJobs?.job_skills.length > 0">
                  {{ specificJobs?.job_skills }}
                </div>
                <div v-else class="py-6 ml-2 px-3 text-[14px]" :class="[
                  colorStore.colorMode ==='light' ? 'text-gray-600' :'text-white'
                ]">
                  Required skills have not yet been specified for this position
                  this job
                </div>
                <div class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    :class="[
                      colorStore.colorMode ==='light' ?'fill-gray-600' :'fill-white'
                    ]"
                    class="w-3 mr-2 lg:w-[18px] "
                  >
                    <path
                      d="M22.47,18.82l-1-3.86h0L18.32,3.37a1,1,0,0,0-1.22-.71l-3.87,1a1,1,0,0,0-.73-.33H2.5a1,1,0,0,0-1,1v16a1,1,0,0,0,1,1h10a1,1,0,0,0,1-1v-8l2.2,8.22a1,1,0,0,0,1,.74,1.15,1.15,0,0,0,.26,0l4.83-1.29a1,1,0,0,0,.61-.47A1.05,1.05,0,0,0,22.47,18.82Zm-16,.55h-3v-2h3Zm0-4h-3v-6h3Zm0-8h-3v-2h3Zm5,12h-3v-2h3Zm0-4h-3v-6h3Zm0-8h-3v-2h3Zm2.25-1.74,2.9-.78.52,1.93-2.9.78Zm2.59,9.66-1.55-5.8,2.9-.78,1.55,5.8Zm1,3.86-.52-1.93,2.9-.78.52,1.93Z"
                    ></path>
                  </svg>
                  <span> Field of Study </span>
                </div>
                <div
                  class="flex gap-1"
                  v-if="specificJobs?.job_fields_of_study?.length > 0"
                >
                  <div v-for="field in specificJobs.job_fields_of_study">
                    <p
                      class="text-[11px] bg-gray-200 flex items-center px-1 py-[1px] border rounded-full"
                    >
                      {{ field }}
                    </p>
                  </div>
                </div>
                <div v-else class="py-4 ml-2 px-3 text-[14px]" :class="[
                  colorStore.colorMode ==='light' ? 'text-gray-600' :'text-white'
                ]">
                  Required fields of study have not yet been specified for this
                  position
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center px-5 justify-between">
            <p
              class="flex border rounded-full px-2 py-[2px] bg-gray-300 text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
                class="w-4 mr-2 xl:w-4 fill-gray-700"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{{ correctTypeNm(specificJobs?.type) }}</span>
            </p>
            <p
              class="flex border text-teal-600 font-[600] rounded-full px-[15px] py-[3px] border-teal-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
                class="w-4 mr-2 xl:w-5"
              >
                <path
                  d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z"
                ></path>
              </svg>
              <span>Share</span>
            </p>
            <!-- this one need to contains 2 elements in flex ways  -->
          </div>

          <div class="py-4 px-4">
            <!-- this div contains Post,KPI and Anaysis in flex ways  -->
            <div class="flex space-x-32 ml-2 border-b border-gray-500">
              <button
                v-for="tab in ['Post', 'KPI', 'Analysis']"
                :key="tab"
                @click="handleKPI(tab)"
                :class="[
                  'px-4 py-2',
                  activeTabs === tab
                    ? 'border-b-2 border-teal-500 text-teal-600 font-[600]'
                    : 'text-gray-700',
                ]"
              >
                {{ tab }}
              </button>
            </div>
            <div v-if="activeTabs === 'Post'" class="p-3">
              <div>
                <p
                  class="mb-[6px]"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-[15px] font-[700] '
                      : 'bg-gray-800 text-white',
                  ]"
                >
                  Job Descriptions
                </p>
                <div v-if="specificJobs?.description">
                  <p
                    v-html="specificJobs?.description"
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'text-[13px] font-light text-gray-600 '
                        : ' text-white',
                    ]"
                    class="text-[13px] "
                  ></p>
                  <p class="py-3" :class="[
                    colorStore.colorMode ==='light' ? 'font-[700] text-gray-700' :'font-bold text-white'
                  ]">Field of study</p>
                  <div
                    v-if="specificJobs?.job_fields_of_study?.length > 0"
                    class="inline-flex items-center px-3 py-[2px] pl-2 md:px-2 bg-teal-600 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      class="w-4 md:w-4 mr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      ></path>
                    </svg>
                    <p
                      class="text-[14px]"
                      v-for="field in specificJobs.job_fields_of_study"
                    >
                      {{ field }}
                    </p>
                  </div>
                  <div v-else class="py-1 ml-2 px-2 text-[14px]">
                    Required fields of study have not yet been specified for
                    this Jobs
                  </div>
                  <div class="mt-[5rem]">
                    <p :class="[
                    colorStore.colorMode ==='light' ? 'font-[700] text-gray-700' :'font-bold text-white'
                  ]">Skills Required</p>
                    <div
                      v-if="specificJobs?.job_skills.length > 0"
                      class="flex items-center gap-2"
                    >
                      <div
                        v-for="(skill, index) in specificJobs.job_skills"
                        :key="index"
                        class="inline-flex items-center bg-teal-500 rounded-full px-3 py-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          class="w-4 md:w-5 mr-2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        <span>{{ skill }}</span>
                      </div>
                    </div>
                    <div v-else class="py-3 ml-2 px-3 text-[14px]">
                      Required skills have not yet been specified for this Jobs
                    </div>
                  </div>
                </div>
                <div v-else>there is no availables desciptions now...</div>
              </div>
              <div
                class="sticky bottom-0 flex justify-self-end bg-opacity-90 p-3"
              >
                <button
                  class="px-6 py-2 xl:py-2 xl:px-12 rounded-md bg-teal-600 text-white hover:text-gray-700 text-sm lg:text-base 2xl:text-lg 3xl:text-xl font-medium hover:bg-cyan-200"
                >
                  Apply Now
                </button>
              </div>
            </div>
            <div v-if="activeTabs === 'KPI'" class="p-5">
              <div v-if="isKPIloading">
                <div>
                  <div class="mt-2 ml-7">
                    <div
                      :class="[
                        colorStore.colorMode === 'light'
                          ? 'bg-gray-300 border-none'
                          : 'bg-gray-600',
                      ]"
                      class="border border-gray-700 rounded-md w-full h-[150px] flex items-center justify-center animate-pulse mb-4"
                    ></div>
                    <div class="flex gap-x-3">
                      <!-- Thre div in flex ways  -->
                      <div
                        class="w-[13rem] h-[8rem] border rounded-md border-gray-600"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'bg-gray-300 border-none'
                            : 'bg-gray-600 ',
                        ]"
                      ></div>
                      <div
                        class="w-[15rem] h-[8rem] border rounded-md border-gray-600"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'bg-gray-300 border-none'
                            : 'bg-gray-600 ',
                        ]"
                      ></div>
                      <div
                        class="w-[13rem] h-[8rem] border rounded-md border-gray-600"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'bg-gray-300 border-none'
                            : 'bg-gray-600 ',
                        ]"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div
                :class="[
                    colorStore.colorMode ==='light' ?'shadow-gray-300 border-gray-100 ':' shadow-teal-600 border-gray-600'
                  ]"
                  class="w-full h-auto border rounded-md  p-4 shadow-sm "
                >
                  <p class="text-teal-600 flex items-center gap-x-2 font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                      class="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      ></path>
                    </svg>
                    <span class="text-[13px]">About the vacancy</span>
                  </p>
                  <div
                    class="grid grid-cols-3 gap-x-8 gap-y-6 text-[13px] py-3"
                  >
                    <p class="flex gap-x-2" >
                      <span :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">Title:</span> 
                       <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                        {{ storeKPI?.title }}
                      </span>
                    </p>
                    <p class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">Sector:</span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                        
                        {{ storeKPI?.sub_sector?.sector?.name }}
                      </span>
                    </p>
                    <p
                      class="flex gap-x-2"
                      v-if="storeKPI?.maximum_education_level"
                    >
                      <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">Max Education Level:</span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                       
                       {{ storeKPI.maximum_education_level.name }}
                      </span>
                    </p>
                    <p v-else class="flex gap-x-2"  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">
                      <span>maximum Education Level:</span> not specified
                    </p>
                    <p class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Enterprise: </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                        {{ storeKPI?.entity?.name }}
                        
                      </span>
                    </p>
                    <p class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Subsectors: </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                     {{ storeKPI?.sub_sector?.name }}
                     
                      </span>
                    </p>
                    <p v-if="storeKPI.gender_priority" class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Gender Priority: </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                       {{ storeKPI.gender_priority }}
                       
                      </span>
                    </p>
                    <p v-else class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Gender Priority not specified</span>
                    </p>
                    <p
                      v-if="storeKPI?.job_cities.length > 0"
                      class="flex gap-x-2"
                    >
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> City: </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                        {{ storeKPI?.job_cities[0]?.city.name }}
                        
                      </span>
                    </p>
                    <p v-else  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]" class="flex gap-x-2">
                      <span> City: </span> Addis Ababa
                    </p>
                    <p v-if="storeKPI.salary" class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Salary:</span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                    {{ salary }}

                      </span>
                    </p>
                    <p v-else class="flex gap-x-2">
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Salary: </span>------
                    </p>
                    <p
                      v-if="storeKPI.job_skills.length > 0"
                      class="flex gap-x-2"
                    >
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Skills: </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                       {{ storeKPI.job_skills.map((skill) => skill).join(", ") }}
                       
                      </span>
                    </p>
                    <p v-else  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]" class="flex gap-x-2">
                      <span> Skills:</span>------
                    </p>
                    <p
                      v-if="storeKPI.job_fields_of_study.length > 0"
                      class="flex gap-x-2"

                    >
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Field of Study:</span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                       
                      {{
                        storeKPI.job_fields_of_study
                          .map((field) => field)
                          .join(",")
                      }}
                      </span>
                    </p>
                    <p v-else  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]" class="flex gap-x-2">
                      <span>Job field :---- </span>
                    </p>
                    <p
                      v-if="storeKPI.minimum_education_level"
                      class="flex gap-x-2"

                    >
                      <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Min Education Level: </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                       
                       {{ storeKPI.minimum_education_level?.name }}
                      </span>
                    </p>
                    <p v-else class="flex gap-x-2"  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">
                      Minimum Education Level: not specified
                    </p>
                    <p></p>
                  </div>
                </div>
                <div
                  class="mt-[4rem] flex flex-shrink-0 flex-wrap justify-center gap-x-4"
                >
                  <!-- this contains 3 div inside of it -->
                  <div
                  :class="[
                    colorStore.colorMode ==='light' ?'shadow-gray-300 border-none':' shadow-teal-600 border-gray-600'
                  ]"
                    class="border rounded-md p-4  gap-x-1 shadow-md text-[13px]  space-y-2"
                  >
                    <div class="flex ml-4 items-center font-bold text-teal-600 space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        ></path>
                      </svg>
                      <span >Vacancy relevance date</span>
                    </div>
                    <div class="space-y-3 p-5">
                      <p class="flex gap-x-2">
                        <span  :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">  
                          Scraped on:
                        </span>
                        <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">{{ formatDate(storeKPI.scraped_at) }}</span>
                      </p>
                      <p v-if="storeKPI.posted_on"  class="flex gap-x-2">
                        <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]" > 
                          Vacancy Posted on:
                        </span>
                        <span>{{ formatDate(storeKPI.posted_on) }}</span>
                      </p>
                      <p v-else   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]" class="flex gap-x-2">
                        Vacancy Posted on: <span>-</span>
                      </p>
                      <p v-if="storeKPI.deadline" class="flex gap-x-2">
                        <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> Deadline:
                        </span>

                        <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">{{ formatDate(storeKPI.deadline) }}</span>
                      </p>
                      <p v-else class="flex gap-x-2">Deadline: --</p>
                    </div>
                  </div>
                  <div
                  :class="[
                    colorStore.colorMode ==='light' ?'shadow-gray-300 border-none':' shadow-teal-600 border-gray-600'
                  ]"
                    class="border rounded-md p-4 gap-x-1 shadow-md text-[13px]  space-y-2"
                  >
                    <div class="flex ml-4 items-center text-teal-600 font-bold space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                        ></path>
                      </svg>
                      <span>How to apply</span>
                    </div>
                    <div class="space-y-3 p-5">
                      <p
                        v-if="storeKPI.application_method"
                        class="flex gap-x-2"
                      >
                      <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> 
                        Application Method: 
                      
                      </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]"> 
                        {{ correctTypeNm(storeKPI.application_method) }}

                      </span>
                      </p>
                      <p v-else class="flex gap-x-2">
                        Application Method: not specified
                      </p>
                      <p
                        v-if="storeKPI.job_application_city"
                        class="flex gap-x-2"
                      >
                      <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]"> 

                        Application City:
                      </span>
                        <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">{{ storeKPI.job_application_city?.name }}</span>
                      </p>
                      <p v-else>Application City:-----</p>
                      <p
                        v-if="storeKPI.job_application_woreda_town"
                        class="flex gap-x-2"
                      >
                      <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">  
                        Subcity/Woreda :
                      </span>
                      <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]">  
                      </span>
                        {{ job_application_woreda_town }}
                      </p>
                      <p v-else class="flex gap-x-2" >
                        <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">  
                          Subcity/Woreda:

                        </span>
                        <span :class="[
                      colorStore.colorMode ==='light'?'text-gray-600 ':'text-white'
                    ]"> 
                          -----

                        </span>
                        </p>
                      <p class="flex space-x-1">
                        <span   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">description:</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          class="w-4 stroke-blue-600 cursor-pointer reactiveSocialIcon"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                          ></path>
                        </svg>
                      </p>
                    </div>
                  </div>
                  <div
                  :class="[
                    colorStore.colorMode ==='light' ?'shadow-gray-300 border-none':' shadow-teal-600 border-gray-600'
                  ]"
                    class="border rounded-md p-4  gap-x-1 shadow-md text-[13px] space-y-2"
                  >
                    <div class="flex ml-4 items-center text-teal-600 font-bold space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                        ></path>
                      </svg>
                      <span>Vacancy Meta-data</span>
                    </div>
                    <div class="space-y-3 p-4" >
                      <p   :class="[
                        colorStore.colorMode ==='light' ? 'font-[600] text-gray-600' :''
                      ]">Source</p>
                      <div class="flex items-center justify-self-center ml-3">
                        <span class=" text-[12px] font-bold">
                          {{ storeKPI?.source }}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-slot="icon"
                          class="w-4 xl:w-4 ml-3 text-gray-500 cursor-pointer reactiveSocialIcon"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          ></path>
                        </svg>
                      </div>
                      <span
                        class="mx-3 font-[200] text-[13px] xl:text-[13px]"
                        v-if="storeKPI.is_online"
                      >
                        Online
                      </span>
                      <span
                        class="mx-3 font-thin text-[13px] xl:text-[12px]"
                        v-else
                      >
                        In person
                      </span>
                    </div>
                  </div>
                </div>
                <div class="mt-10">
                  <p>Summary:</p>
                  <div
                    class="flex space-x-32 mt-4 ml-2 border-gray-500"
                  >
                    <button
                      v-for="tab in ['English', 'አማርኛ']"
                     
                      :key="tab"
                      @click="activeSumary = tab"
                      :class="[
                        'px-4 py-2 font-normal ',
                        activeSumary === tab
                          ? 'border-b-2 border-teal-500 text-teal-500'
                          : 'text-gray-100',
                          colorStore.colorMode ==='light' ?'text-gray-600':'text-white'
                      ]"
                    >
                      {{ tab }}
                    </button>
                  </div>
                  <div v-if="activeSumary === 'English'" class="p-3">
                    <div
                      v-if="storeKPI.summary"
                      :class="[
               colorStore.colorMode === 'light'
                ? 'bg-white text-gray-600'
                : 'bg-gray-800 text-white',
            ]"
                      class="text-[14px] font-normal"
                    >
                      {{ storeKPI.summary }}
                    </div>
                    <div v-else class=" text-[14px]">
                      There is no Availables Summary for this Jobs Here.
                    </div>
                  </div>
                  <div v-if="activeSumary === 'አማርኛ'" class="p-3">
                    <div
                      v-if="storeKPI.amharic_summary"
                      class="text-gray-300 text-[14px]"
                    >
                      {{ storeKPI.amharic_summary }}
                    </div>
                    <div v-else class="text-gray-300 text-[14px] p-3">
                      Amharic Summary is not availables
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ENd of KPI -->
            <div v-if="activeTabs === 'Analysis'" class="mt-10">
              <div class="rounded-md shadow-md w-full border border-gray-500">
                <div class="p-4">
                  <div class="flex items-center justify-between">
                    <p class="text-teal-600 font-bold text-[13px]">
                      Vacancy match with ESCO
                    </p>
                    <p class="flex items-center gap-x-2">
                      <img
                        src="https://www.hahu.jobs/icons/esco.png"
                        alt="Esco group images"
                        class="w-[6rem] object-cover"
                      />
                      <span class="text-blue-400 font-bold"> ESCO</span>
                    </p>
                  </div>
                  <div class="mt-5">
                    <p class="text-blue-400 text-[12px] font-bold">
                      {{
                        storeJobAnalysis.soc_2010?.alternate_titles[0]
                          ?.alternate_title
                      }}
                      ({{ storeJobAnalysis?.isco_08?.isco_08_code }}.{{
                        storeJobAnalysis?.isco_08?.level
                      }})
                    </p>
                    <p class="flex items-center flex-wrap text-[13px]">
                      <span>Also called:</span>
                      <span
                        v-for="(title, index) in storeJobAnalysis?.soc_2010
                          ?.alternate_titles"
                        :key="index"
                      >
                        , {{ title?.alternate_title }}
                      </span>
                    </p>
                  </div>
                  <div class="flex mt-5 items-center justify-between">
                    <div
                      class="p-3 border rounded-md border-gray-600 shadow-md shadow-teal-500"
                    >
                      <div
                        class="flex space-x-3 px-4 mt-[6px] text-teal-600 font-bold text-[13px]"
                      >
                        <p class="flex items-center gap-x-2">
                          <img
                            src="https://www.hahu.jobs/icons/analysis/skill.svg"
                            alt="skills"
                            class="w-4"
                          />
                          <span>Skills</span>
                        </p>
                        <span class="text-gray-100"> &</span>
                        <p class="flex items-center gap-x-2">
                          <img
                            src="https://www.hahu.jobs/icons/analysis/knowledge.svg"
                            alt="Knowledge"
                            class="w-4"
                          />
                          <span>Knowledge</span>
                        </p>
                      </div>
                      <div
                        class="flex mt-5 space-x-32 ml-2 border-b border-gray-500"
                      >
                        <button
                          v-for="tab in ['Essential', 'Optional']"
                          :key="tab"
                          @click="active = tab"
                          :class="[
                            'px-4 py-2 text-[13px]',
                            activeSumary === tab
                              ? 'border-b-2 border-teal-500 text-teal-500'
                              : 'text-gray-100',
                          ]"
                        >
                          {{ tab }}
                        </button>
                      </div>
                    </div>
                    <div
                      class="p-3 border rounded-md border-gray-400 shadow-md shadow-teal-400"
                    >
                      second
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- This first div -->
        <div class="mt-[24rem]">
          <h1>Related Jobs</h1>
          <div
            class="border border-none rounded-md mb-[1rem] w-[18rem] h-[21rem]"
            v-for="job in storeRelatedJobs"
            :class="[
              colorStore.colorMode === 'light'
                ? 'bg-white text-gray-600'
                : 'bg-gray-800 text-white',
            ]"
          >
            <div class="px-2">
              <div class="flex justify-end text-[12px] gap-x-2 py-2">
                <svg
                  data-v-d3730cd0=""
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  class="w-[14px] -mt-[1px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  ></path>
                </svg>
                <p>Expired</p>
              </div>
              <p class="flex items-center gap-x-3">
                <p v-if="job?.entity?.logo">
                  <img
                    :src="job?.entity?.logo"
                    alt="RelatedJobs"
                    class="w-14 h-20 object-contain"
                  />
                </p>
                      <p v-else>
                      <img
                      src="https://www.hahu.jobs/images/logo_150.png"
                      alt="Logo"
                      class="w-14 h-20 object-contain"
                        />
                      </p>
                <span
                  class="text-[12px] font-bold"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'font-normal'
                      : 'text-white',
                  ]"
                  >{{ job?.entity?.name }}</span
                >
              </p>
              <p class="font-bold text-[12px]">
                {{ job?.title }}
              </p>
              <p class="flex gap-x-[4px] items-center py-2">
                <img
                  src="https://www.hahu.jobs/images/sectors/ict.png"
                  class="size-5 lg:size-7"
                />
                <span
                  class="text-[12px] font-bold"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'font-normal'
                      : 'text-white',
                  ]"
                  >{{ correctTypeNm(job?.position?.name) }}
                </span>
              </p>
              <div
                :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
                class="flex text-white flex-wrap flex-shrink-0 justify-start gap-x-2 text-[12px] mt-2"
              >
                <!-- this field can contains type,yrs of experience and no of positions-->
                <p
                  class="flex text-[10px] px-[13px] py-[-5px] gap-x-[1px] items-center bg-teal-600 rounded-full"
                >
                  <img
                    src="https://www.hahu.jobs/icons/time-person.svg"
                    alt="images of time-person"
                    class="md:w-[14px] md:h-[14px] object-contain w-[16px] h-[16px]"
                  />
                  <span>{{ correctTypeNm(job?.type) }}</span>
                </p>
                <p
                  class="flex text-[10px] px-[11px] py-[-5px] gap-x-[1px] items-center bg-teal-600 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    class="size-3 mr-1"
                    data-v-d3730cd0=""
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                      clip-rule="evenodd"
                    ></path>
                    <path
                      d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z"
                    ></path>
                  </svg>
                  <span
                    >{{ job?.years_of_experience
                    }}<span v-if="job.max_years_of_experience"
                      >- {{ job.max_years_of_experience }}
                    </span>
                    yrs
                  </span>
                </p>
                <div
                  class="flex text-[10px] px-[13px] py-[-5px] gap-x-[1px] items-center bg-teal-600 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    class="size-3 mr-1"
                    data-v-d3730cd0=""
                  >
                    <path
                      d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z"
                    ></path>
                  </svg>
                  <p class="flex items-center gap-x-1">
                    <span>
                      {{
                        job?.position?.sub_sectors_positions_aggregate
                          ?.aggregate?.count
                      }}</span
                    >
                    <span>Positions </span>
                  </p>
                </div>
              </div>
              <p class="flex mt-4 border-gray-300 border-b-[2px]"></p>
              <p class="text-wrap text-[14px] mt-3" v-if="job?.description">
                {{ truncateText(job?.description, 100) }}
              </p>
              <p class="text-wrap text-[14px] mt-3" v-else>
                there is no available descriptions for this jobs for this
                Positions
              </p>

              <div class="flex items-center justify-between py-3">
                <p class="flex gap-x-[2px] py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    class="w-3"
                    data-v-d3730cd0=""
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    ></path>
                  </svg>
                  <span v-if="job?.job_application_city" class="text-[11px]">{{
                    job?.job_application_city?.name
                  }}</span>
                  <span v-else class="text-[11px]"> Addis Ababa</span>
                </p>
                <p class="flex gap-x-[5px] items-center">
                  <svg
                    data-v-d3730cd0=""
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                    class="w-4 md:w-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    ></path>
                  </svg>
                  <span class="flex text-[12px]">
                    {{ job?.total_view_count }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div
        v-else
        class="overflow-y-auto md:h-fit lg:h-full mt-[4rem]"
        ref="jobListRef"
      >
        <div
          v-if="allJobs.length > 0 && !isFetchJobALlSctr"
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white text-gray-600'
              : 'bg-gray-800 text-white',
          ]"
          class="mt-[1.5rem] p-[8px] w-full max-h-[10rem] flex gap-2"
        >
          <!-- This divisions contains images of jobs and its title in flex ways plus some desciptions-->
          <div>
            <img
              src="https://www.hahu.jobs/images/sectors/natural-science.png"
              alt="natural-science"
              class="lg:w-[20px] w-[80px] md:h-8 lg:h-6 md:mr-3 md:w-8 h-8 mt-[0px] mr-2 lg:mr-0"
            />
          </div>
          <div class="py-2">
            <p class="font-bold leading-[2px] ml-5 lg:ml-0">
              {{ JobDetails[0]?.name }} jobs
            </p>
            <p
              class="lg:text-[9px] md:text-[15px] text-[15px] mt-2 font-normal"
              :class="[
                colorStore.colorMode === 'light'
                  ? 'text-black'
                  : 'text-gray-300',
              ]"
            >
              {{ JobDetails[0]?.description }}
            </p>
          </div>
        </div>
        <p v-if="isFetchJobALlSctr"></p>
        <p
          class="text-lg mt-2"
          :class="[
            colorStore.colorMode === 'light'
              ? 'text-gray-600 font-bold '
              : 'text-gray-100 font-[800]',
          ]"
        >
          Showing
          {{ Math.min(offset + pageSize, totalJobs) || 0 }} of
          {{ totalJobs || 0 }} jobs
        </p>
        <div v-if="isJobLoading">
          <div v-for="n in getSkeletonJobs()" :key="'sector-' + n">
            <div
              v-for="i in 3"
              :key="'sub-sector-' + i"
              class="grid md:grid-cols-3 grid-col-1 mt-2 ml-7"
            >
              <div
                v-for="j in 3"
                :key="'job-' + j"
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'bg-gray-300 border-none'
                    : 'bg-gray-800',
                ]"
                class="p-4 border border-gray-700 rounded-md w-[360px] h-[380px] flex items-center justify-center animate-pulse mb-4"
              >
                <div
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'bg-gray-100'
                      : 'bg-gray-800',
                  ]"
                  class="h-4 w-1/2 flex items-center justify-center"
                >
                  <img
                    src="https://www.hahu.jobs/images/logo_150.png"
                    alt=""
                    class="w-[3rem] h-[3rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="JobDetails.length === 0"
          class="flex flex-col justify-center items-center mt-8 mb-[12rem]"
        >
          <img
            src="https://www.hahu.jobs/images/search-not-found.svg"
            alt="Result not found"
            class="mx-auto w-auto h-auto max-w-[24rem]"
          />
          <p class="mt-4 text-2xl font-bold">
            Sorry, we couldn’t find any match for your search
          </p>
        </div>
        <div v-else v-for="sector in JobDetails" :key="sector.name">
          <div
            v-for="subSector in sector.sub_sectors"
            :key="subSector.id"
            class="grid lg:grid-cols-3 grid-cols-1"
          >
            <!-- <span>{{ subSector.jobs_aggregate?.aggregate.count }}</span> -->
            <template v-for="job in allJobs" :key="job.id">
              <div
                @click="handleJobId(job.id)"
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'bg-white hover:border-teal-500 rounded-md border-white'
                    : 'bg-gray-800 hover:border-teal-500 rounded-md ',
                ]"
                class="relative w-[390px] cursor-pointer flex items-center justify-self-center md:w-[34rem] lg:w-[390px] h-auto mb-[1px] border-gray-800 mt-4 rounded-md border hover:border-teal-600"
              >
                <div class="p-4">
                  <!-- Job Card Header -->
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4 text-teal-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                      <span class="text-teal-600 text-sm" v-if="job.expired"
                        >Expired</span
                      >
                    </div>
                    <button
                      class="flex hover:bg-cyan-300 hover:text-black transition-all duration-700 ease-in-out items-center px-[13px] py-[2px] justify-center gap-1 border border-teal-600 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4 text-teal-600"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                        />
                      </svg>
                      <span class="text-teal-600 text-[13px]">Save</span>
                    </button>
                  </div>

                  <!-- Job Card Body -->
                  <div
                    class="flex flex-col md:flex-row gap-6 md:mt-7 mt-2"
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'text-gray-500'
                        : 'text-white',
                    ]"
                  >
                    <!-- Company Logo and Name -->
                    <div class="h-24 md:mt-6 mt-0 w-[6rem] ml-[7rem] md:ml-0">
                      <img
                        v-if="job.entity?.logo"
                        :src="job.entity?.logo"
                        alt="Company Logo"
                        class="w-32 h-24"
                      />
                      <p v-else>
                        <img
                          src="https://www.hahu.jobs/images/logo_150.png"
                          alt="Logo"
                          class="w-32 h-24"
                        />
                      </p>
                      <p class="md:mt-2 mt-3">
                        {{ truncateText(job.entity?.name, 10) }}
                      </p>
                    </div>
                    <!-- Job Details -->
                    <div class="py-1 mb-[3px] px-3 md:px-0">
                      <p
                        class="font-bold mb-2 mt-3 md:mt-0 lg:text-[14px] md:text-[20px] flex items-center justify-self-center"
                      >
                        {{ truncateText(job.position?.name, 25) }}
                      </p>
                      <div class="leading-7 md:ml-3 lg:ml-0">
                        <p
                          class="flex items-center gap-2 mb-1 md:mb-[5px] lg:mb-0"
                        >
                          <img
                            src="https://www.hahu.jobs/images/sectors/natural-science.png"
                            alt="Sectors name"
                            class="md:w-[18px] md:h-[13px] w-[20px] h-[20px]"
                          />
                          <span
                            class="md:text-[18px] lg:text-[13px] text-[17px]"
                          >
                            {{ sector?.name }}
                          </span>
                        </p>
                        <p
                          class="flex gap-3 items-center mb-1 md:mb-[5px] lg:mb-0"
                        >
                          <img
                            src="https://www.hahu.jobs/icons/job/job-type.svg"
                            alt="Job-type"
                            class="md:w-[16px] md:h-[12px] w-[20px] h-[20px]"
                          />
                          <span
                            class="md:text-[18px] lg:text-[13px] text-[17px]"
                            >{{ subSector?.name }}</span
                          >
                        </p>
                        <p class="flex gap-1 mb-1 md:mb-0">
                          <svg
                            data-v-a5575039=""
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            class="w-5 h-5 md:w-4 mr-1.5 text-teal-600"
                          >
                            <path
                              fill-rule="evenodd"
                              d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                          <span
                            class="md:text-[18px] lg:text-[12px] text-[17px] mb-1 md:mb-0"
                            v-if="job.job_cities.length > 0"
                          >
                            {{
                              job.job_cities
                                .map((city) => city.city?.name)
                                .join(", ")
                            }}
                          </span>
                          <span
                            v-else
                            class="text-[12px] lg:text-[12px] md:text-[18px]"
                            >Addis Ababa
                          </span>
                        </p>
                        <p class="flex gap-1 mb-1 md:mb-0">
                          <svg
                            data-v-a5575039=""
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            class="w-5 h-5 mr-2 md:w-4 text-teal-600"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z"
                              clip-rule="evenodd"
                            ></path>
                            <path
                              d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z"
                            ></path>
                          </svg>
                          <span
                            class="md:text-[18px] text-[17px] lg:text-[14px]"
                          >
                            {{ job.years_of_experience }}
                            <span v-if="job.max_years_of_experience"
                              >-{{ job.max_years_of_experience }}</span
                            >
                            years
                          </span>
                        </p>

                        <p class="flex gap-1">
                          <svg
                            data-v-a5575039=""
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            class="w-5 h-5 mr-2 sm:w-4 text-teal-600"
                          >
                            <path
                              d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z"
                            ></path>
                          </svg>
                          <span
                            class="md:text-[16px] text-[17px] lg:text-[13px]"
                          >
                            {{
                              job.position?.sub_sectors_positions_aggregate
                                ?.aggregate.count
                            }}
                            positions
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <p class="flex justify-center items-center mb-4">
                    <span
                      class="bg-teal-600 justify-center items-centertext-xs md:rounded-xl flex sm:w-24 md:gap-2 gap-3 md:py-[3px] py-[8px] mt-2 w-[108px] rounded-full"
                    >
                      <img
                        src="https://www.hahu.jobs/icons/time-person.svg"
                        alt=""
                        class="md:w-[14px] md:h-[14px] w-[16px] h-[16px]"
                      />
                      <span class="md:text-[12px] text-white text-[16px]">{{
                        correctTypeNm(job.type)
                      }}</span>
                    </span>
                  </p>
                  <p class="border-t-[1px] border-gray-500 mb-2"></p>
                  <!-- Job Description -->
                  <div
                    class="text-[14px] md:text-[18px] lg:text-[14px] mb-4"
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'text-gray-500'
                        : 'text-gray-300',
                    ]"
                  >
                    {{ truncateText(job.summary, 170) }}
                  </div>
                  <div class="mt-4 mb-4 flex gap-2 justify-center">
                    <button
                      :class="[
                        colorStore.colorMode === 'light'
                          ? 'bg-white'
                          : 'bg-gray-800',
                      ]"
                      @click="handleJobId(job.id)"
                      class="sm:px-4 sm:text-[12px] sm:py-[7px] px-5 py-[9px] border border-teal-500 text-teal-500 font-medium rounded-md hover:bg-teal-100 transition duration-300 ease-in-out"
                    >
                      Read More
                    </button>
                    <button
                      class="sm:px-2 px-[14px] py-[1px] border border-teal-500 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-500 transition duration-300 ease-in-out"
                    >
                      Apply Now
                    </button>
                  </div>
                  <!-- Job Footer -->

                  <div
                    class="absolute bottom-0 left-0 w-full px-4 py-2 flex justify-between items-center"
                  >
                    <!-- View Icon and Count -->
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-4 h-4"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'text-gray-500'
                            : 'text-white',
                        ]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <span
                        class="ml-2 lg:text-sm text-sm md:text-[16px]"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'text-gray-500'
                            : 'text-gray-300 text-[12px]',
                        ]"
                        >{{ job.total_view_count }}</span
                      >
                    </div>

                    <!-- Share Icon -->
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                        :class="[
                          colorStore.colorMode === 'light'
                            ? 'text-gray-500 hover:text-teal-500'
                            : 'text-white hover:text-teal-500 ',
                        ]"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  -->
  <!--  -->
  <div
    class="flex items-center justify-center gap-4 mt-[5rem] py-3 justify-self-center"
    v-if="!isSpecificJobs"
  >
    <!-- Previous Button -->
    <button
      class="flex gap-3 text-gray-400 disabled:cursor-not-allowed"
      :disabled="currentPage === 1"
      @click="goToPreviousPage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
        />
      </svg>
      <span class="text-[13px]">previous</span>
    </button>

    <!-- Page Numbers -->
    <div class="flex items-center gap-2">
      <template v-for="page in paginationPages" :key="page + '-page'">
        <!-- Display ellipsis -->
        <span v-if="page === '...'" class="px-2">...</span>
        <!-- Display page number -->
        <button
          v-else
          @click="goToPage(page)"
          :class="[
            'px-3 py-1 text-[12px] text-gray-500 font-bold',
            currentPage === page ? 'border-t-[2px] border-teal-500' : '',
          ]"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      class="flex gap-3 items-center disabled:cursor-not-allowed justify-center text-gray-400 cursor-pointer"
      :disabled="currentPage === totalPages"
      @click="goToNextPage"
    >
      <span class="text-[13px]">next</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
        />
      </svg>
    </button>
  </div>

  <div
    v-if="!isSpecificJobs"
    @click="scrollToTop"
    class="flex items-center cursor-pointer justify-self-end bg-teal-600 rounded-md mr-4 w-[2.5rem] h-[2rem]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
      class="mx-auto w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 18.75 7.5-7.5 7.5 7.5"
      ></path>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m4.5 12.75 7.5-7.5 7.5 7.5"
      ></path>
    </svg>
  </div>
</template>
