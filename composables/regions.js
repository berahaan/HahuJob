import { ref } from "vue";
import GET_REGION_ID from "~/graphql/query/GET_REGION_ID.graphql";
import { useRoute } from "vue-router";
const selectRegions = ref([]);
const selectedRegionIds = ref([]);
const isRegionSelected = ref(false);
export const useRegionSelected = () => {
  // Handle region click
  const route = useRoute();
  const handleRegionClick = async (event) => {
    let region = null;
    const path = event.composedPath ? event.composedPath() : [];

    // Extract region name from the clicked element
    if (path.length) {
      for (const el of path) {
        if (el.getAttribute && el.getAttribute("title")) {
          region = el.getAttribute("title").trim();
          break;
        }
      }
    } else {
      let target = event.target;
      while (
        target &&
        !target.getAttribute("title") &&
        target !== event.currentTarget
      ) {
        target = target.parentNode;
      }
      if (target && target.getAttribute("title")) {
        region = target.getAttribute("title").trim();
      }
    }

    if (region) {
      const index = selectRegions.value.indexOf(region);
      if (index !== -1) {
        // If region is already selected, remove it
        selectRegions.value.splice(index, 1);
        selectedRegionIds.value.splice(index, 1); // Remove corresponding ID
        isRegionSelected.value = selectRegions.value.length > 0;
      } else {
        // If region is not selected, fetch its ID and add it
        selectRegions.value.push(region);
        const regionId = await getRegionId(region); // Fetch region ID

        if (regionId) {
          selectedRegionIds.value.push(regionId); // Store region ID
          isRegionSelected.value = selectRegions.value.length > 0;
        } else {
          console.error("Failed to fetch region ID for:", region);
        }
      }

      // Generate navigation URL
      await generateNavigationUrl();
    }
  };

  // Fetch region ID from GraphQL
  const getRegionId = async (region) => {
    console.log("Fetching region ID for:", region);
    try {
      const { data } = await useAsyncQuery({
        query: GET_REGION_ID,
        variables: {
          name: region,
        },
      });

      // Log the entire response for debugging
      console.log("GraphQL Response:", data.value);

      // Check if the response contains the expected data
      if (data.value?.basic_region_cities?.length > 0) {
        const regionId = data.value.basic_region_cities[0]?.id;
        console.log("Region ID:", regionId);
        return regionId;
      } else {
        console.error("No region found with the name:", region);
        return null;
      }
    } catch (error) {
      console.error("Error fetching region ID:", error);
      return null;
    }
  };

  // Generate navigation URL with selected region IDs
  const generateNavigationUrl = async () => {
    console.log("Generate navigatio in region.js is clicked now ");
    const queryParams = {
      rid:
        selectedRegionIds.value.length > 0
          ? selectedRegionIds.value
          : undefined,
      sid: route.query.sid,
      pid: route.query.pid,
      page: 1,
    };

    // Remove undefined values to keep the URL clean
    Object.keys(queryParams).forEach((key) => {
      if (queryParams[key] === undefined) {
        delete queryParams[key];
      }
    });

    await navigateTo({
      path: "/jobs",
      query: queryParams,
    });
  };
  watch(selectRegions, (newRegions) => {
    isRegionSelected.value = newRegions.length > 0;
  });
  return {
    handleRegionClick,
    selectRegions,
    getRegionId,
    selectedRegionIds,
    isRegionSelected,
  };
};
