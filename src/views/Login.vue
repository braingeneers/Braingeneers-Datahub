<template>
    <div>
        <div>
            <div class="sm:w-1/2">
                    <h1>
                        Login
                    </h1>
                    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
                    <form @submit="login">
                        <div class="my-5">
                            <h4>Email</h4>
                            <input type="email" v-model="email">
                        </div>
                        <div class="my-5">
                            <h4>Password</h4>
                            <input type="password" v-model="password">
                        </div>
                        
                        <button type="submit" :disabled="password.length < 3">
                            Login
                        </button>
                        <p class="my-2">
                            <router-link to="/forgotpassword" >Forgot Password?</router-link>
                        </p>
                        
                    </form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            error: false,
            errorMsg: `An error occurred, please try again`,
        };
    },
    methods: {
        async login(e) {
            e.preventDefault();
            try {
                const res = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/api/auth/local`, {
                    identifier: this.email,
                    password: this.password
                });
                const { jwt, user } = res.data;

                // console.log(this.password);
                // console.log(this.email);
                window.localStorage.setItem("jwt", jwt);
                window.localStorage.setItem("userData", JSON.stringify(user));
                // window.localStorage.setItem('bookmarks', JSON.stringify(user.bookmarks))
                //emit user
                // this.$emit('user', user)
                this.$router.push("/experiments");
            }
            catch (error) {
                console.log(error);
                this.error = true;
                this.password = "";
            }
        },
    },
}
</script>
<style scoped>
</style>