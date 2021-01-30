<template>
  <header class="bg-local text-white" style="background-color: #656565">
    <div
      class="flex items-center lg:justify-center xl:justify-center sm:justify-between"
    >
      <button
        class="lg:hidden cursor-pointer w-12 h-12 p-4"
        @click="isOpen = !isOpen"
      >
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <div class="text-base sm:text-3xl md:text-5xl xl:text-6xl text-white">
        <span class="inline-block align-middle">BooK Directory</span>
      </div>
      <div></div>
    </div>

    <div class="flex sm:hidden lg:flex justify-center text-white">
      <nuxt-link :to="{ path: '/' }" class="p-7">Home</nuxt-link>
      <div class="p-7">
        <DropDown></DropDown>
      </div>
      <div class="p-7">Author</div>
      <div class="p-7">About</div>
      <div class="p-7">Contact</div>
    </div>
    <div class="dropdown-mobile lg:hidden" :class="isOpen ? '' : 'hidden'">
      <ul style="border-top: 1px solid #e8e7e7">
        <li><a class="items-pa">Home</a></li>
        <li>
          <DropDownMobile label="Categories"></DropDownMobile>
        </li>
        <li><a class="items-pa">About</a></li>
      </ul>
    </div>
  </header>
</template>

<script>
import DropDown from '@/components/TaiwindComponent/DropDown'
import DropDownMobile from '@/components/TaiwindComponent/DropDownMobile'
export default {
  components: {
    DropDown,
    DropDownMobile,
  },

  data() {
    return {
      isOpen: false,
      categoryArray: [],
    }
  },
}
</script>

<style scoped>
header {
  position: fixed;
  width: 100%;
}
.dropdown-mobile {
  height: 100%;
  width: 100%;
  background-color: #656565;
  position: fixed;
  z-index: 100;
  overflow: hidden;
}
.dropdown-mobile li {
  border-bottom: 1px solid #e8e7e7;
  display: block;
  padding-top: 15px;
  padding-bottom: 15px;
}
.items-pa {
  padding: 20px 15px 0 20px;
}
</style>
