<template>
    <h1 id='hello' class='hi' @click="hello">Hi Everyone!</h1>
</template>
<script>
export default {
    methods: {
        hello() {
            alert('hello')
        }
    }
}
</script>
<style scoped>
h1 {border: 2px solid blue};
#hello {color: green};
.hi {text-transform: lowercase;}
</style>