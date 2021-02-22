<template>
    <main>
        <div>
            <h1>Log in</h1>
        </div>
        <form>

            <label for="ap_customer_name">Email</label>
            <input type="email" id="ap_customer_name" v-model="email" />

            <label for="ap_customer_name">Password</label>
            <input type="password" id="ap_customer_name" v-model="password" />

            <span @click="onLogin">Continue</span>
        </form>
        <p>Don't have an account? <nuxt-link to="/signup">Sign up here</nuxt-link></p>
    </main>
</template>
<script>
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return {email: "", password: ""}
    },
    methods: {
        async onLogin() {
            try {
                this.$auth.loginWith("local", {
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                this.$router.push("/");
            } catch (err) {
                console.log(err)
            }
        }
    }
    
}
</script>