<template>
  <div class="content">
    <div class="title-category">
      <h1>Category: {{ category.name }}</h1>
    </div>
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
    </div>
  </div>
</template>

<script>
import Card from '@/components/TaiwindComponent/Card'
export default {
  components: {
    Card,
  },
  async asyncData({ $axios, params }) {
    try {
      const bookList = await $axios.get(`/api/category/${params.slug}`)
      return {
        Books: bookList.data.data.books,
        category: bookList.data.data.category,
      }
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
<style scoped>
.content {
  padding: 150px 0 0 0;
}
.container {
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  column-count: 3;
  column-gap: 10px;
}
.card {
  padding: 20px;
  display: inline-block;
}
.title-category {
  padding: 10px;
  text-align: center;
  font-family: 'librebaskerville-bold', serif;
  color: #000;
  font-style: normal;
  font-weight: normal;
  text-rendering: optimizeLegibility;
  font-size: 3.6rem;
  line-height: 1.25;
  margin-top: 0;
  letter-spacing: -0.15rem;
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
  }
  .card {
    padding: 5px 5px 20px 5px;
  }
}
</style>
