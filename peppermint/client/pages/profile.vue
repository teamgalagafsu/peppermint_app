<template>
    <main>
        <div>
            <h1>Profile Page</h1>
        </div>
        <form>
            <label>Name</label>
            <input v-model="name" :placeholder="$auth.$state.user.name" />

            <label>Email</label>
            <input v-model="email" :placeholder="$auth.$state.user.email" />
            
            <label>Password</label>
            <input v-model="password" />
            
            <span @click="onUpdateProfile">Update profile</span>
        </form>
        <p>Don't have an account? <nuxt-link to="/signup">Sign up here</nuxt-link></p>
        <a href="#" @click="onLogout">Log out</a>
    </main>
</template>
<script>
export default {
    data() {
        return {name: "", email: "", password: ""}
    },
    methods: {
        async onUpdateProfile() {
            let data = {name: this.name, email: this.email, password: this.password };
            
            try {
                let response = await this.$axios.$put("/api/auth/user", data);

                if (response.success) {
                    this.name = "";
                    this.email = "";
                    this.password = "";
                    await this.$auth.fetchUser();
                }
            } catch (err) {
                console.log(err)
            }
        },
        async onLogout() {
            await this.$auth.logout();
        }
    }
}
</script>