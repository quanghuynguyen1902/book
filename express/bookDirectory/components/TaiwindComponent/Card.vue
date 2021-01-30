<template>
  <div>
    <div class="max-w-sm rounded overflow-hidden shadow-2xl">
      <img class="w-full" :src="image" alt="Mountain" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ title }}</div>
        <p class="truncate-multiline text-gray-700 text-base">
          {{ description }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span
          v-for="(category, index) in categories"
          :key="index"
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >#{{ category }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default:
        'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    title: {
      type: String,
      default: 'Mountain',
    },
    description: {
      type: String,
      default:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
    },
    categories: {
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
.truncate-multiline {
  display: -webkit-box;
  max-height: 500px;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
