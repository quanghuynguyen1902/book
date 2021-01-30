<template>
  <div class="container">
    <div v-for="(book, index) in Books" :key="index">
      <Card
        class="card"
        :image="book.thumbnailUrl"
        :title="book.title"
        :description="book.shortDescription"
        :categories="book.categories"
      />
    </div>
    <infinite-loading spinner="spiral" @infinite="infiniteHandler">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import Card from '@/components/TaiwindComponent/Card'
export default {
  components: {
    Card,
  },
  async asyncData({ $axios }) {
    try {
      const bookList = await $axios.get('/api/book/')
      return {
        Books: bookList.data.result,
      }
    } catch (e) {
      console.log(e)
    }
  },
  data() {
    return {
      page: 2,
    }
  },
  methods: {
    infiniteHandler($state) {
      this.$axios
        .get('/api/book', {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          if (data.result.length) {
            console.log(data.result.length)
            this.page += 1
            this.Books.push(...data.result)
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
.container {
  width: 100%;
  margin: 0 auto;
  padding: 150px 30px 30px 30px;
  column-count: 3;
  column-gap: 10px;
}
.card {
  padding: 20px;
  display: inline-block;
}
@media only screen and (max-width: 480px) {
  .container {
    padding: 20px;
    column-count: 1 !important;
  }
  .card {
    padding: 5px 5px 20px 5px;
  }
}
@media only screen and (max-width: 840px) {
  .container {
    column-count: 2;
    padding: 100px 30px 30px 30px;
  }
  .card {
    padding: 5px 5px 20px 5px;
  }
}
</style>
