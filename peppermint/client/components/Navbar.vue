<template>
    <header>
        <div class="container">
            <div class="logoarea">
                <a href="#">Navbar
                    <img src="/img/icon.png" alt="">
                </a>
            </div>
            <template v-if="$auth.$state.loggedIn">
                <nuxt-link to="/profile">
                    <span>Hello {{ $auth.$state.user.name}}</span>
                </nuxt-link>
            </template>
            <template v-else>
                <nuxt-link to="/signup">
                    No account?<span>Sign up here.</span>
                </nuxt-link>
            </template>
        </div>


    </header>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.container {
    max-height: 170px;
    display: flex;
    flex-direction: row;
}

header {
    height: 150px;
}

img {
    height: 100px;
    width: 100px;
}
</style>