<template>
<main>
    <h1>Update Product: {{productResponse.product.title}}</h1><br>
    <hr>
    <label for="title">Title</label>
    <input type="text" name="title" v-model="title" :placeholder="productResponse.product.title" id=""><br><br>
    <label for="description">Description</label>
    <textarea type="text" name="description" v-model="description" :placeholder="productResponse.product.description" id=""></textarea><br><br>
    <label for="price">Price</label>
    <input type="number" name="price" v-model="price" :placeholder="productResponse.product.price" id=""><br><br>
    <label for="photo">Photo</label>
    <input type="file" name="photo" @change="onFileSelected" id=""><br><br>
    
    <button @click="onUpdateProduct">Update product</button>
</main>
</template>
<script>
export default {
    async asyncData({ $axios, params}) {
        try {
            let product = $axios.$get(`http://localhost:3000/api/products/${params.id}`);
            const [productResponse] = await Promise.all([product]);
            console.log(productResponse);
            return {productResponse}
        } catch (err) {console.log(err)} 
    },
    data() { 
        return { title: "", description: "", price: "", selectedFile: null }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },
        async onUpdateProduct({ $axios }){
            let data = new FormData();
            data.append("title", this.title);
            data.append("description", this.description);
            data.append("price", this.price);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            let result = await this.$axios.$put(`http://localhost:3000/api/products/${this.$route.params.id}`, data);
            this.$router.push("/");
        },
    },
}
</script>

<style>
</style>
