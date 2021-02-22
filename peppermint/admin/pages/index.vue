<template>
<main>
    <nuxt-link to="/products">Add a Product</nuxt-link><br><br><br>
    <hr>
    <div v-for="(product, index) in products" :key="product._id">
        <br>
        <span>title:{{product.title}}</span><br>
        <span>description:{{product.description}}</span><br>
        <img :src="product.photo" alt=""><br>
        <span>price:{{product.price}}</span><br>
        <nuxt-link :to="`/products/${product._id}`">Update Product</nuxt-link>
        <button @click="onDeleteProduct(product._id, index)">Delete Product</button>
        <br><br><hr>
    </div>
</main>
</template>

<script>
export default {
    async asyncData({ $axios }){
      try {
        let response = await $axios.$get("http://localhost:3000/api/products");
        console.log(response);
        return {products: response.products}
      } catch (err) {console.log(err.message)}
    },
    methods: {
      async onDeleteProduct(id, index) {
        try {
          let response = await this.$axios.$delete(`http://localhost:3000/api/products/${id}`);
          if (response.status) { this.products.splice(index, 1);} 
        } catch (err) {console.log(err)}
        
      }
    }
}
</script>

<style>
</style>
