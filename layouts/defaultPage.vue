<script setup>
import Header from "~/components/Header.vue";
import hahuLogo from "~/components/hahuLogo.vue";
const colorStore = useColorModeStore();
</script>
<template>
  <Header />
  <main>
    <slot />
  </main>
  <!-- <div class="h-[2rem]"></div> -->
  <footer
    class="border-t-2 mt-[2rem]"
    :class="[
      colorStore.colorMode === 'light'
        ? 'bg-white border-gray-200'
        : 'bg-gray-800 border-gray-600',
    ]"
  >
    <div
      :class="[
        colorStore.colorMode === 'light'
          ? 'bg-white border-gray-300'
          : 'bg-gray-800',
      ]"
      class="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 border-b-[1px] border-gray-600 mt-auto md:justify-center lg:mb-0 mb-8 gap-2 md:px-8 md:py-2 lg:gap-0"
    >
      <!-- first div -->
      <div class="flex mt-12 md:mt-[7rem] lg:mt-5 p-3 items-center">
        <div class="lg:w-[124px] w-[17rem] md:mt-4 lg:mt-6 p-2 mt-4 sm:mt-0">
          <p
            class="underline text-gray-600 text-[18px] md:text-[24px] lg:text-lg font-bold"
            :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
          >
            Get started
          </p>
          <p
            class="text-gray-700 font-medium mt-2 text-sm lg:text-sm md:text-[17px] hover:text-teal-600 transition-all duration-200 hover:scale-105"
            :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
          >
            <a href="https://app.hahu.jobs/signup">Sign up</a>
          </p>
          <p
            class="text-gray-700 font-medium text-sm lg:text-sm md:text-[17px] hover:text-teal-600 transition-all duration-200 hover:scale-105"
            :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
          >
            <a href="https://app.hahu.jobs/login">Login</a>
          </p>
        </div>
        <div class="lg:w-[124px] w-[17rem] ml-6 lg:ml-14 lg:mt-6 mt-4 p-2">
          <p
            class="underline text-gray-600 lg:text-lg text-[18px] md:text-[25px] font-bold"
            :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
          >
            Quick links
          </p>
          <p
            class="text-gray-700 font-medium mt-2 text-sm lg:text-sm md:text-[20px] hover:text-teal-600 transition-all duration-200 hover:scale-105"
          >
            <a
              href="https://www.hahujobs.io/"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >HahuJobs IO</a
            >
          </p>
          <p
            class="text-gray-700 font-medium text-sm md:text-[20px] lg:text-sm hover:text-teal-600 transition-all duration-200 hover:scale-105"
          >
            <a
              href="https://www.minabtech.com/"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >Minab Tech</a
            >
          </p>
        </div>
      </div>
      <!-- second div -->

      <div class="sm:mt-20 mt-4 lg:mb-10 mb-0 max-h-[10rem]">
        <p
          class="md:w-[11rem] lg:w-[10rem] w-[13rem] ml-9 h-[3rem] mb-8 lg:mb-0 sm:ml-0"
        >
          <a href="https://www.minabtech.com/">
            <img
              :src="
                colorStore.colorMode === 'light'
                  ? 'https://res.cloudinary.com/dtlezwrzm/image/upload/f_webp,q_auto:best,e_sharpen:100/logo_main_2_x22cap.png'
                  : '/images/minabLogo.png'
              "
              alt="HahuJobs Logo"
              :class="[
                colorStore.colorMode === 'light'
                  ? ''
                  : 'w-[30rem] object-cover',
              ]"
              class="lg:max-w-full max-w-full md:w-fit mx-auto md:mx-0 mb-4"
            />
          </a>
        </p>
        <p
          class="font-[500] lg:text-[14px] md:font-bold md:text-[19px] leading-7 mt-5 px-[34px] lg:px-1 text-sm/6"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-600' : 'text-white',
          ]"
        >
          HaHuJobs is a cloud based product owned and managed by a technology
          consulting firm called Minab IT solutions PLC. Minab was founded in
          2014 and has an extensive experience in software development for the
          past nine years.
        </p>
      </div>
      <div class="lg:p-8 lg:ml-32 px-10 md:px-0 md:mt-[4rem] mt-[5rem]">
        <p
          class="font-semibold ml-[5rem] md:ml-[8px] mb-3 md:flex-none md:text-[20px] lg:text-[15px]"
          :class="[
            colorStore.colorMode === 'light' ? 'text-gray-600' : 'text-white',
          ]"
        >
          Powered by
        </p>
        <div class="ml-2">
          <img
            v-if="colorStore.colorMode === 'light '"
            src="https://www.hahu.jobs/images/Hahu_logo_footer.png"
            alt="Hahu Logos"
            class="lg:w-[13rem] w-[180px] h-[40px] lg:h-[50px] p-2"
            :class="[colorStore.colorMode === 'light ' ? '' : 'text-white']"
          />
          <span v-else>
            <hahuLogo class="w-full h-[30px]" />
          </span>
          <p
            class="lg:text-lg text-[22px] ml-[4.3rem] md:ml-[2px] font-bold mt-4 mb-2 lg:mt-0 lg:ml-3"
          >
            <span class="text-teal-600">ለሀገር ልጅ</span>
            <span
              class="text-gray-700 ml-2"
              :class="[colorStore.colorMode === 'light' ? '' : 'text-white']"
              >በሀገር ልጅ !</span
            >
          </p>
        </div>
      </div>
    </div>
    <div
      class="flex md:px-7 lg:px-0 md:flex-row mt-4 items-center flex-col-reverse justify-between ml-1 lg:ml-10 gap-10 text-gray-500 text-sm"
    >
      <div
        class="flex items-center justify-center md:justify-between lg:gap-4 gap-[6px] md:gap-7"
      >
        <p>
          <a
            href="https://www.hahu.jobs/privacy-policy"
            :class="[
              'font-bold text-[10px]',
              colorStore.colorMode === 'light' ? '' : 'text-gray-400',
            ]"
          >
            <span class="md:text-[18px] lg:text-[12px]"> Privacy policy</span>
          </a>
        </p>
        <p
          :class="[
            'font-bold text-[10px] md:text-[18px] lg:text-[11px]',
            colorStore.colorMode === 'light' ? '' : 'text-gray-400',
          ]"
        >
          &copy; 2020-2025 HahuJobs. All rights reserved.
        </p>
      </div>
      <div class="flex sm:gap-8 gap-10 mb-4 lg:mr-4">
        <a href="https://t.me/Hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/telegram.svg"
            alt="Hahu telegram"
            class="w-5 h-5"
          />
        </a>
        <a href="https://www.facebook.com/Hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/facebook-circular.svg"
            alt="Hahu facebook"
            class="w-5 h-5"
          />
        </a>
        <a href="https://twitter.com/hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/x.svg"
            alt="Hahu Twitters"
            class="w-5 h-5"
          />
        </a>
        <a href="https://www.linkedin.com/company/hahujobs">
          <img
            src="https://www.hahu.jobs/icons/socials/linkedin_color.svg"
            alt="Hahu Linkedin"
            class="w-5 h-5"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
