<template>
<main>
    <h1>Add a new product</h1><br>
    <hr>
    <label for="title">Title</label>
    <input type="text" name="title" v-model="title" id=""><br><br>
    <label for="description">Description</label>
    <textarea type="text" name="description" v-model="description" id=""></textarea><br><br>
    <label for="price">Price</label>
    <input type="number" name="price" v-model="price" id=""><br><br>
    <label for="photo">Photo</label>
    <input type="file" name="photo" @change="onFileSelected" id=""><br><br>
    
    <button @click="onAddProduct">Add product</button>
</main>
</template>
<script>
export default {
    data() { 
        return { title: "", description: "", price: "", selectedFile: null }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            this.fileName = event.target.files[0].name;
        },
        async onAddProduct({ $axios }){
            let data = new FormData();
            data.append("title", this.title);
            data.append("description", this.description);
            data.append("price", this.price);
            data.append("photo", this.selectedFile, this.selectedFile.name);

            let result = await this.$axios.$post("http://localhost:3000/api/products", data);
            this.$router.push("/");
        },
    },
}
</script>

<style>
</style>
