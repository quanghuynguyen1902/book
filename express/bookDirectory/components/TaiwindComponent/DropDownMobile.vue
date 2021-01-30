<template>
  <div class="w-full">
    <a class="flex justify-between" @click="isOpen = !isOpen">
      <span style="padding-left: 20px">{{ label }}</span>
      <button v-show="!isOpen">
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </button>
      <button v-show="isOpen">
        <div style="display: none">{{ isOpen }}</div>
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </a>
    <ul
      class="dropdown-container w-full bg-white text-black px-5 overflow-auto h-48"
      :class="isOpen ? 'block' : 'hidden'"
    >
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Category',
    },
    items: {
      type: Array,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
}
</script>

<style>
.dropdown-container a {
  display: block;
}
</style>
