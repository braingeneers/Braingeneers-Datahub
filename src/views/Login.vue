<!-- <template>
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
</template> -->

<template>
    <!-- <div class="container-sm"> -->
        <div class="body">
        <main class="form-signin">
            <b-card>
                <div class="card-body">
                        <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
                        <form>
                            <h2 class="h3 mb-3 fw-normal text-center">Please sign in</h2>

                            <div class="form-group">
                                <label>Email address</label>
                                <input type="email" class="form-control form-control-lg" v-model="email" placeholder="Email address" />
                            </div>

                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control form-control-lg" v-model="password" placeholder="Password"/>
                            </div>

                            <div class="checkbox mb-3">
                                <label><input type="checkbox" value="remember-me"> Remember me</label>
                            </div>

                            <button @click="login" class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                            <!-- <router-link class="w-100 btn btn-lg btn-primary" type="submit" to="/signup">Sign in</router-link> -->
                        </form>
                    </div>
                </b-card>  
            <p class="mt-3 mb-3 text-muted text-center">© 2020–2025</p>
        </main>      
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
        logout() {
            window.localStorage.removeItem("jwt");
            window.localStorage.removeItem("userData");
            this.$router.push("/");
        },
    },
}
</script>
<style scoped lang="css">
    .body {
        display: flex;
        padding-top: 60px;
        padding-bottom: 600px;        
        align-items: center;
        background-color: #f3f2fe;
    }
    .form-signin {
        width: 100%;
        max-width: 450px;
        margin: auto;
    }
    label {
        font-weight: 600;
    }
</style>
<!-- <style scoped>
    
</style> -->