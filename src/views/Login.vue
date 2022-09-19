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
        name: 'Login',
        
        data() {
            return {
                email: '',
                password: '',
                error: false,
                errorMsg: `An error occurred, please try again`,
                api_token: "63e7b69b04c8f9d9c1c368a10ee586de676e5ae58b970225b4eb4d4ac8a633f141e98c656f296fabb0c1be54b01b23c152d09f41a562f7d6acde3865c3b53e33af5e1fbb4680adf71552f6b8e733e5df460a1c8fa32f42e2ccc26f204198bddc9382dcfe5d1af774465ce706baa6fcda5e0c0b8050f90a74f86dd8cffa1ccecb",
            
            }
        },
        methods: {
            async login(e) {
                e.preventDefault()
                try {
                    const res = await axios.post(`http://localhost:1337/api/auth/local`, {
                        identifier: this.email,
                        password: this.password
                    });
                    
                    const { jwt, user } = res.data
                    console.log = this.password
                    console.log = this.email
                    window.localStorage.setItem('jwt', jwt)
                    window.localStorage.setItem('userData', JSON.stringify(user))
                    // window.localStorage.setItem('bookmarks', JSON.stringify(user.bookmarks))
                    this.$router.push('/')
                } catch(error) {
                    console.log(error)
                    this.error = true
                    this.password = ''
                }
            },
        }
    }
</script>
<style scoped>
</style>