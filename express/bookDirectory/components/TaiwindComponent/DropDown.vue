<template>
  <div>
    <div class="dropdown inline-block text-white">
      <a class="rounded inline-flex items-center cursor-pointer">
        <span class="mr-1">Categories</span>
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </a>
      <ul
        class="dropdown-menu absolute hidden pt-1 w-32 min-w-max overflow-auto h-48"
      >
        <li
          v-for="(item, index) in categoryArray"
          :key="index"
          class="bg-black"
        >
          <nuxt-link
            :to="{ path: `/category/${item.slug}` }"
            class="hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap"
            >{{ item.name }}</nuxt-link
          >
        </li>
        <infinite-loading spinner="spiral" @infinite="infiniteHandler">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.categoryArray = await this.$axios.get('/api/category')
    this.categoryArray = this.categoryArray.data.result
  },
  data() {
    return {
      categoryArray: [],
      isOpen: false,
      page: 2,
    }
  },
  methods: {
    infiniteHandler($state) {
      this.$axios
        .get('/api/category', {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          if (data.result.length) {
            this.page += 1
            this.categoryArray.push(...data.result)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch(() => {
          $state.complete()
        })
    },
  },
}
</script>

<style>
.dropdown:hover .dropdown-menu {
  display: block;
}
</style>
