<script setup>
const colorStore = useColorModeStore();
const jobs = [
  {
    title: "Software Engineer",
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
    title: "Software Engineer",
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
</script>

<template>
  <div class="absolute top-20 left-0 h-[483px] w-40 bg-customGreen z-10"></div>
  <div
    class="absolute top-20 right-0 h-[483px] w-16 bg-gradient-to-l from-gray-00 to-transparent z-10"
  ></div>

  <div>
    <Carousel
      :items-to-show="4"
      :wrap-around="true"
      :autoplay="2000"
      :transition="2000"
      snapAlign="start"
      class="mt-20"
    >
      <Slide v-for="(image, index) in jobs" :key="index" class="">
        <div
          class="relative w-[23rem] h-auto border hover:border-teal-400 rounded-lg"
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
              <span class="text-white text-xs">Featured</span>
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
          <!-- Seconds  -->
          <div>
            <div class="flex gap-2 text-sm mt-2">
              <div>
                <img
                  :src="image.companyLogo"
                  alt="hahujobimage"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'bg-gray-100'
                      : 'bg-gray-800 border-none',
                  ]"
                  class="w-28 h-14 mt-6 px-4"
                />
                <p
                  class="text-gray-500 font-normal mt-4 ml-2 w-28"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'bg-gray-100'
                      : 'text-white',
                  ]"
                >
                  {{ image.country }}
                </p>
              </div>
              <ul>
                <h1
                  class="font-bold text-gray-600 mb-2"
                  :class="[
                    colorStore.colorMode === 'light'
                      ? 'bg-gray-100'
                      : 'text-white',
                  ]"
                >
                  {{ image.title }}
                </h1>
                <li
                  v-for="(detail, index) in image.details"
                  :key="index"
                  class="flex gap-2 mt-2"
                >
                  <span
                    class="w-4 h-4 text-teal-400"
                    v-html="detail.icon"
                  ></span>
                  <span
                    class="font-normal text-gray-600"
                    :class="[
                      colorStore.colorMode === 'light'
                        ? 'bg-gray-100'
                        : 'text-white',
                    ]"
                  >
                    {{ detail.text }}</span
                  >
                </li>
              </ul>
            </div>
            <p class="flex justify-center gap-2">
              <span
                class="bg-teal-600 text-xs rounded-xl text-white flex w-24 p-1 gap-2 mt-8"
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
                Full Time
              </span>
            </p>
            <p class="mt-4 border border-b-0 border-gray-400"></p>
          </div>
          <!-- Thirds -->
          <!-- Thirds -->
          <div
            class="text-sm font-normal text-gray-600 p-2"
            :class="[
              colorStore.colorMode === 'light' ? 'bg-gray-100' : 'text-white',
            ]"
          >
            {{ image.description }}
          </div>
          <div class="mt-4 mb-4 flex gap-2 justify-center">
            <button
              class="px-2 py-1 border border-teal-500 bg-teal-50 text-teal-500 font-medium rounded-md hover:bg-teal-100 transition duration-300 ease-in-out"
            >
              Read More
            </button>
            <button
              class="px-2 py-1 border border-teal-500 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-500 transition duration-300 ease-in-out"
            >
              Apply Now
            </button>
          </div>
          <!-- Fourths -->
          <!-- Fourths -->
          <div class="flex items-center justify-between py-2">
            <p class="flex gap-1 text-gray-600 font-normal text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[
                  'w-4 h-4 ml-2',
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
              <span
                class="mb-4 text-gray-600"
                :class="[
                  colorStore.colorMode === 'light'
                    ? 'bg-gray-100'
                    : 'text-white',
                ]"
                >14.5k</span
              >
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                :class="[
                  'w-5 h-5 mb-2 mr-3 text-gray-600 font-bold',
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
        <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
          <Pagination />
        </div>
      </template>
    </Carousel>
  </div>
</template>
