<script setup>
import { ref } from "vue";
const colorStore = useColorModeStore();
const activeIndex = ref(0);
const jobs = [
  {
    title: "Software Engineer",
    companyLogo:
      "https://cdn.hahu.jobs/public/aggregator/hahujobs_aggregator/eb4fc9abe311a2a0dc20875b34f1501dd1583f293e6ea46ed81a010dfa208c4bda86940b40d31d5c3cec0ebb01bf10e91d82.jpg",
    country: "Ethiopian engineering",
    daysLeft: 5,

    details: [
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M5.25 2.25a.75.75 0 0 1 .75.75v1.379l5.743 3.82 5.96-3.88-.007-.319a.75.75 0 0 1 1.5 0v3.995a.751.751 0 0 1-.349.635l-6.358 4.138v7.996a.75.75 0 0 1-1.5 0v-7.997a.75.75 0 0 1 .349-.635l6.358-4.138V6.36l-5.958 3.88-.01.008a.751.751 0 0 1-.84-.008L5.25 5.24v11.01l4.295 4.295a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1-.22-.53v-12a.75.75 0 0 1 .75-.75z" />
          </svg>
        `,
        text: "Engineering",
      },
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M8.25 2.25A2.25 2.25 0 0 0 6 4.5v1.757a5.501 5.501 0 0 0-1.25 10.743v2.5a2.25 2.25 0 0 0 3.53 1.844L12 18.832l3.72 2.512a2.25 2.25 0 0 0 3.53-1.844v-2.5a5.501 5.501 0 0 0-1.25-10.743V4.5a2.25 2.25 0 0 0-2.25-2.25H8.25z" />
          </svg>
        `,
        text: "Computer Engineering",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
     <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
     </svg>
        `,
        text: "Addis ababa",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
         <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>
        `,
        text: "2 years",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg"  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">  
      <path d="M12 2a1 1 0 0 0-1 1v2H9V2a1 1 0 0 0-2 0v2H5a1 1 0 0 0-1 1v5h16V5a1 1 0 0 0-1-1h-3V2a1 1 0 0 0-1-1zm-1 6v2H8V8h3zm3 2h-5v2h5v-2zm1-4v2h3V7h-3zm-6 4h2v-2H8v2zm0 3h5v-2H8v2zm4 3v2a1 1 0 0 0 2 0v-2h2v3a1 1 0 1 0 2 0v-3h3v2a1 1 0 0 0 1-1V5a3 3 0 0 0-3-3h-1a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v4h-2a1 1 0 1 0 0 2h2v5h-1v1a1 1 0 1 0-2 0v-2h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-1z"/>  
    </svg>  
        `,
        text: "2 positions",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facere nihil dolores explicabo quaerat! Debitis numquam fugiat",
  },
  {
    title: "Accountant",
    companyLogo:
      "https://cdn.hahu.jobs/public/aggregator/telegram_channel_post/000aecc6fa8a77e0d4f2b115ffae1e8bdc4ba11876cc1c1a322bdd9d15e6c2ee97fd6d7e11e3f705cf77672c8b6a5d67cdf8.png",
    country: "Ethiopian engineering",
    daysLeft: 5,

    details: [
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M5.25 2.25a.75.75 0 0 1 .75.75v1.379l5.743 3.82 5.96-3.88-.007-.319a.75.75 0 0 1 1.5 0v3.995a.751.751 0 0 1-.349.635l-6.358 4.138v7.996a.75.75 0 0 1-1.5 0v-7.997a.75.75 0 0 1 .349-.635l6.358-4.138V6.36l-5.958 3.88-.01.008a.751.751 0 0 1-.84-.008L5.25 5.24v11.01l4.295 4.295a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1-.22-.53v-12a.75.75 0 0 1 .75-.75z" />
          </svg>
        `,
        text: "Engineering",
      },
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M8.25 2.25A2.25 2.25 0 0 0 6 4.5v1.757a5.501 5.501 0 0 0-1.25 10.743v2.5a2.25 2.25 0 0 0 3.53 1.844L12 18.832l3.72 2.512a2.25 2.25 0 0 0 3.53-1.844v-2.5a5.501 5.501 0 0 0-1.25-10.743V4.5a2.25 2.25 0 0 0-2.25-2.25H8.25z" />
          </svg>
        `,
        text: "Computer Engineering",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
     <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
     </svg>
        `,
        text: "Addis ababa",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
         <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
    </svg>
        `,
        text: "2 years",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg"  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">  
      <path d="M12 2a1 1 0 0 0-1 1v2H9V2a1 1 0 0 0-2 0v2H5a1 1 0 0 0-1 1v5h16V5a1 1 0 0 0-1-1h-3V2a1 1 0 0 0-1-1zm-1 6v2H8V8h3zm3 2h-5v2h5v-2zm1-4v2h3V7h-3zm-6 4h2v-2H8v2zm0 3h5v-2H8v2zm4 3v2a1 1 0 0 0 2 0v-2h2v3a1 1 0 1 0 2 0v-3h3v2a1 1 0 0 0 1-1V5a3 3 0 0 0-3-3h-1a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v4h-2a1 1 0 1 0 0 2h2v5h-1v1a1 1 0 1 0-2 0v-2h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-1z"/>  
    </svg>  
        `,
        text: "2 positions",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facere nihil dolores explicabo quaerat! Debitis numquam fugiat",
  },
  {
    title: "Electrical Engineer",
    companyLogo: "https://www.hahu.jobs/images/logo_150.png",
    country: "Ethiopian engineering",
    daysLeft: 5,

    details: [
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M5.25 2.25a.75.75 0 0 1 .75.75v1.379l5.743 3.82 5.96-3.88-.007-.319a.75.75 0 0 1 1.5 0v3.995a.751.751 0 0 1-.349.635l-6.358 4.138v7.996a.75.75 0 0 1-1.5 0v-7.997a.75.75 0 0 1 .349-.635l6.358-4.138V6.36l-5.958 3.88-.01.008a.751.751 0 0 1-.84-.008L5.25 5.24v11.01l4.295 4.295a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1-.22-.53v-12a.75.75 0 0 1 .75-.75z" />
          </svg>
        `,
        text: "Engineering",
      },
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4    h-4">
            <path d="M8.25 2.25A2.25 2.25 0 0 0 6 4.5v1.757a5.501 5.501 0 0 0-1.25 10.743v2.5a2.25 2.25 0 0 0 3.53 1.844L12 18.832l3.72 2.512a2.25 2.25 0 0 0 3.53-1.844v-2.5a5.501 5.501 0 0 0-1.25-10.743V4.5a2.25 2.25 0 0 0-2.25-2.25H8.25z" />
          </svg>
        `,
        text: "Computer Engineering",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
        `,
        text: "Addis ababa",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
         <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
        </svg>
        `,
        text: "2 years",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg"  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">  
        <path d="M12 2a1 1 0 0 0-1 1v2H9V2a1 1 0 0 0-2 0v2H5a1 1 0 0 0-1 1v5h16V5a1 1 0 0 0-1-1h-3V2a1 1 0 0 0-1-1zm-1 6v2H8V8h3zm3 2h-5v2h5v-2zm1-4v2h3V7h-3zm-6 4h2v-2H8v2zm0 3h5v-2H8v2zm4 3v2a1 1 0 0 0 2 0v-2h2v3a1 1 0 1 0 2 0v-3h3v2a1 1 0 0 0 1-1V5a3 3 0 0 0-3-3h-1a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v4h-2a1 1 0 1 0 0 2h2v5h-1v1a1 1 0 1 0-2 0v-2h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-1z"/>  
       </svg>  
        `,
        text: "2 positions",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facere nihil dolores explicabo quaerat! Debitis numquam fugiat",
  },

  {
    title: "Data Analyst",
    companyLogo:
      "https://cdn.hahu.jobs/public/aggregator/hahujobs_aggregator/5a42e2b7d3d88166c9a9069afd96195bff80c35604b82a73281bda036b6c7f33889494da49d04164607c8bc9e44d3189df91.png",
    country: "Data science space",
    daysLeft: 3,

    details: [
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M5.25 2.25a.75.75 0 0 1 .75.75v1.379l5.743 3.82 5.96-3.88-.007-.319a.75.75 0 0 1 1.5 0v3.995a.751.751 0 0 1-.349.635l-6.358 4.138v7.996a.75.75 0 0 1-1.5 0v-7.997a.75.75 0 0 1 .349-.635l6.358-4.138V6.36l-5.958 3.88-.01.008a.751.751 0 0 1-.84-.008L5.25 5.24v11.01l4.295 4.295a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1-.22-.53v-12a.75.75 0 0 1 .75-.75z" />
          </svg>
        `,
        text: "Engineering",
      },
      {
        icon: `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
            <path d="M8.25 2.25A2.25 2.25 0 0 0 6 4.5v1.757a5.501 5.501 0 0 0-1.25 10.743v2.5a2.25 2.25 0 0 0 3.53 1.844L12 18.832l3.72 2.512a2.25 2.25 0 0 0 3.53-1.844v-2.5a5.501 5.501 0 0 0-1.25-10.743V4.5a2.25 2.25 0 0 0-2.25-2.25H8.25z" />
          </svg>
        `,
        text: "Computer Engineering",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
        `,
        text: "Addis ababa",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
</svg>
        `,
        text: "2 years",
      },
      {
        icon: `
         <svg xmlns="http://www.w3.org/2000/svg"  class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">  
  <path d="M12 2a1 1 0 0 0-1 1v2H9V2a1 1 0 0 0-2 0v2H5a1 1 0 0 0-1 1v5h16V5a1 1 0 0 0-1-1h-3V2a1 1 0 0 0-1-1zm-1 6v2H8V8h3zm3 2h-5v2h5v-2zm1-4v2h3V7h-3zm-6 4h2v-2H8v2zm0 3h5v-2H8v2zm4 3v2a1 1 0 0 0 2 0v-2h2v3a1 1 0 1 0 2 0v-3h3v2a1 1 0 0 0 1-1V5a3 3 0 0 0-3-3h-1a1 1 0 1 0 0 2h1a1 1 0 0 1 1 1v4h-2a1 1 0 1 0 0 2h2v5h-1v1a1 1 0 1 0-2 0v-2h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-1z"/>  
</svg>  
        `,
        text: "2 positions",
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facere nihil dolores explicabo quaerat! Debitis numquam fugiat",
  },
];
const breakpoints = {
  640: { itemsToShow: 1 },
  1122: { itemsToShow: 3 },
  1024: { itemsToShow: 3 },
  1280: { itemsToShow: 4 },
};
</script>

<template>
  <div class="relative">
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-gradient-to-r from-slate-200 via-slate-200 to-transparent'
          : 'bg-gradient-to-r from-customGreen via-customGreen to-transparent',
      ]"
      class="hidden sm:block absolute md:top-0 md:h-[600px] top-[932px] lg:top-0 opacity-100 left-0 h-[485px] lg:h-[485px] w-20 lg:w-[14rem] z-30"
    ></div>
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-gradient-to-l from-slate-200 via-slate-200 to-transparent'
          : 'bg-gradient-to-l from-customGreen via-customGreen to-transparent',
      ]"
      class="hidden sm:block absolute md:top-[0px] md:h-[600px] top-[932px] lg:top-0 opacity-100 right-0 h-[485px] lg:h-[485px] w-20 lg:w-[14rem] z-30"
    ></div>

    <Carousel
      :breakpoints="breakpoints"
      :wrap-around="true"
      :autoplay="2000"
      :transition="1000"
      snapAlign="start"
      @update:modelValue="activeIndex = $event"
      class="lg:mt-6 mt-6 flex"
    >
      <Slide v-for="(image, index) in jobs" :key="index">
        <div
          :class="[
            colorStore.colorMode === 'light'
              ? 'bg-white'
              : 'bg-gray-800 border-none',
          ]"
          class="relative sm:w-[23rem] w-[17rem] h-auto border hover:border-teal-400 rounded-lg"
        >
          <div class="mb-1 flex justify-end gap-1">
            <p>
              <svg
                @click="handleme"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 cursor-pointer text-teal-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </p>
            <p
              class="flex bg-teal-600 justify-center items-center gap-2 rounded-tr-lg rounded-bl-lg px-2 py-0.5 cursor-pointer"
              @click="handleme"
            >
              <img
                src="https://www.hahu.jobs/icons/hahu_featured.svg"
                alt="Featured"
                class="text-white"
              />
              <span class="text-white text-xs hidden sm:block">Featured</span>
            </p>
          </div>
          <!--First-->
          <div class="text-xs text-teal-600 px-3 mb-3">
            <p class="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
              {{ image.daysLeft }} Days left
            </p>
          </div>
          <!-- Seconds  -->
          <div>
            <div
              class="flex flex-col items-center sm:flex-row gap-2 text-sm mt-2"
            >
              <div class="group">
                <img
                  :src="image.companyLogo"
                  alt="hahujobimage"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'bg-white'
                      : 'bg-gray-800 border-none',
                  ]"
                  class="sm:w-28 group-hover:scale-110 sm:h-14 w-32 h-24 ml-5 mt-6 px-4"
                />
                <div
                  class="hidden md:block absolute -ml-[4rem] right-0 top-2 w-[18rem] max-h-[18rem] bg-gray-600 bg-opacity-100 text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50"
                >
                  <!-- Wider and Longer Triangle Pointer -->
                  <div
                    class="absolute -left-2 top-24 w-0 h-0 border-t-[18px] border-t-transparent border-b-[24px] border-b-transparent border-r-[19px] border-r-gray-600"
                  ></div>

                  <!-- Content -->
                  <div class="p-4">
                    <div class="flex items-center gap-2">
                      <img
                        :src="image.companyLogo"
                        alt="hahujobimage"
                        :class="
                          colorStore.colorMode === 'light'
                            ? 'bg-white'
                            : 'bg-gray-800 border-none'
                        "
                        class="sm:w-14 sm:h-14 w-32 h-24"
                      />
                      <p
                        class="text-gray-500 text-lg sm:text-[14px] font-normal"
                        :class="
                          colorStore.colorMode === 'light' ? '' : 'text-white'
                        "
                      >
                        {{ image.country }}
                      </p>
                    </div>

                    <div class="mt-4">
                      <p class="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                          />
                        </svg>
                        <span class="font-bold text-gray-400">N.A</span>
                      </p>
                      <p class="flex items-center gap-2 mt-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        <span class="font-bold text-gray-400">N.A</span>
                      </p>
                      <p class="flex items-center gap-2 mt-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        <span class="font-bold text-gray-400">N.A</span>
                      </p>
                    </div>

                    <a
                      href=""
                      class="flex items-center gap-2 mt-5 cursor-pointer"
                    >
                      <span class="text-teal-700 text-[16px] font-bold">
                        Explore more
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-[18px] text-teal-700"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                <p
                  class="text-gray-500 text-lg sm:text-[13px] font-normal sm:mt-4 mt-1 ml-2 sm:w-28 w-full mb-4 sm:mb-0"
                  :class="[
                    colorStore.colorMode === 'light' ? '' : 'text-white',
                  ]"
                >
                  {{ image.country }}
                </p>
              </div>
              <!-- First -->
              <ul>
                <h1
                  class="font-bold text-gray-600 ml-14 sm:ml-0 mb-2 text-lg"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'text-gray-100'
                      : 'text-white',
                  ]"
                >
                  {{ image.title }}
                </h1>

                <li
                  v-for="(detail, index) in image.details"
                  :key="index"
                  class="flex sm:gap-2 space-y-0 gap-0 sm:mt-2 mt-0 mr-14 sm:mr-0"
                >
                  <span
                    class="sm:w-4 sm:h-4 w-7 h-8 text-teal-400"
                    v-html="detail.icon"
                  ></span>
                  <span
                    class="font-normal text-gray-600"
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'text-gray-200'
                        : 'text-white',
                    ]"
                  >
                    {{ detail.text }}</span
                  >
                </li>
              </ul>
              <!-- kd -->
            </div>
            <p class="flex justify-center items-center gap-2">
              <span
                class="bg-teal-600 text-xs rounded-xl text-white flex sm:w-24 sm:p-1 gap-2 mt-8 w-[100px] p-[6px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    d="M16 4h-8a2 2 0 00-2 2v1H5a3 3 0 00-3 3v9a3 3 0 003 3h14a3 3 0 003-3v-9a3 3 0 00-3-3h-1V6a2 2 0 00-2-2zm-8 2h8v1h-8zm12 4v2H4V10zm-14 9v-7h14v7a1 1 0 01-1 1H5a1 1 0 01-1-1z"
                  />
                </svg>
                <span class="ml-1"> Full Time</span>
              </span>
            </p>
            <p class="mt-4 sm:mt-2 border border-b-0 border-gray-400"></p>
          </div>
          <!-- Thirds -->
          <!-- Thirds -->
          <div
            class="text-sm font-normal text-gray-600 p-2"
            :class="[
              colorStore.colorMode === 'light' ? 'text-gray-100' : 'text-white',
            ]"
          >
            {{ image.description }}
          </div>
          <div class="mt-4 mb-4 flex gap-2 justify-center">
            <button
              :class="[
                colorStore.colorMode === 'light' ? 'bg-white' : 'bg-gray-800',
              ]"
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
          <!-- Fourths -->

          <div class="flex items-center justify-between py-2">
            <p class="flex items-center gap-2 ml-2 text-gray-600 font-normal">
              <!-- Container for the SVG -->
              <span class="flex-1 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  :class="[
                    'sm:w-4 sm:h-4 w-4 h-4',
                    colorStore.colorMode === 'light'
                      ? 'bg-gray-100'
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
              </span>
              <!-- Container for the text -->
              <span
                class="flex-1 flex justify-center text-[12px] sm:text-xs font-semibold"
                :class="
                  colorStore.colorMode === 'light'
                    ? 'bg-gray-100'
                    : 'text-gray-300'
                "
              >
                14.5k
              </span>
            </p>

            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[
                  'sm:w-5 md:h-5 w-4 h-4 mb-2 mr-3 text-gray-600 font-bold',
                  colorStore.colorMode === 'light'
                    ? 'bg-gray-100'
                    : 'text-white',
                ]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </p>
          </div>
        </div>
      </Slide>
      <template #addons>
        <div
          class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2"
        >
          <button
            v-for="(job, index) in jobs"
            :key="'dash-' + index"
            @click="activeIndex = index"
            class="w-3 h-[3px] rounded transition-all duration-300"
            :class="activeIndex === index ? 'bg-teal-500 w-3' : 'bg-gray-300'"
          ></button>
        </div>
      </template>
    </Carousel>
  </div>
</template>
