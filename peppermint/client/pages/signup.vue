<template>
    <main>
        <div>
            <h1>Sign up for an account</h1>
        </div>
        <form>
            <label for="ap_customer_name">Your name</label>
            <input type="text" id="ap_customer_name" v-model="name" />

            <label for="ap_customer_name">Your email</label>
            <input type="email" id="ap_customer_name" v-model="email" />

            <label for="ap_customer_name">Your password</label>
            <input type="password" id="ap_customer_name" v-model="password" />

            <span @click="onSignup">Create your account</span>

        </form>
        <p>Already have an account? <nuxt-link to="/login">Sign in here</nuxt-link></p>
    </main>
</template>
<script>
export default {
    middleware: "auth",
    auth: "guest",
    data() {
        return {name: "", email: "", password: ""}
    },
    methods: {
        async onSignup() {
            try {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                };
                let response = await this.$axios.$post("/api/auth/signup", data);
                // console.log(response);
                if (response.success) {
                    this.$auth.loginWith("local", {
                        data: {
                            email: this.email,
                            password: this.password
                        }
                    });
                    this.$router.push("/");
                }

            } catch (err) {
                console.log(err)
            }
        }
    }
    
}
</script>