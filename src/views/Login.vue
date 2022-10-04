<template>
    <!-- <div class="container-sm"> -->
    <div class="body">
        <main class="form-signin">
            <b-card>
                <div class="card-body">
                    <!-- include braingeneers logo from assets -->
                    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
                    <form>
                        <img src="@/assets/hub-logo.png" alt="braingeneers logo" class="d-block mx-auto mb-4 responsive"
                            style="display:inline">
                        <!-- width="200" height="auto"> -->
                        <!-- <h2 class="h3 mb-3 fw-normal text-center">Please sign in</h2> -->

                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control form-control-lg" v-model="email"
                                placeholder="Email address" />
                        </div>

                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" class="form-control form-control-lg" v-model="password"
                                placeholder="Password" />
                        </div>

                        <div class="checkbox mb-3">
                            <label><input type="checkbox" value="remember-me"> Remember me</label>
                        </div>

                        <button @click="login" class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        <!-- <router-link class="w-100 btn btn-lg btn-primary" type="submit" to="/signup">Sign in</router-link> -->
                    </form>
                </div>
            </b-card>
            <div>
                <LoginButton></LoginButton>
            </div>
            <p class="mt-3 mb-3 text-muted text-center">© 2020–2025</p>
        </main>
    </div>
</template>

<script>
import axios from 'axios'
// import { useAuth0 } from '@auth0/auth0-vue';
import LoginButton from '@/components/LoginButton';

export default {
    name: "Login",
    components: { LoginButton },
    data() {
        return {
            email: "",
            password: "",
            error: false,
            errorMsg: `An error occurred, please try again`,
        };
    },
    // setup() {
    //     const { loginWithRedirect } = useAuth0();

    //     return {
    //         logine: () => {
    //             loginWithRedirect();
    //         }
    //     };
    // },
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

.responsive {
    width: 100%;
    height: auto;
    /* padding-top: 5px;
        padding-right: 0;
        padding-left: 0; */
}
</style>
<!-- <style scoped>
    
</style> -->