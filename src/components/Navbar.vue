<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">BraingeneersHub</b-navbar-brand>
      <!-- <router-link to="/">Plates</router-link> | -->
      <router-link to="/">Experiments</router-link>|
      <router-link to="/wells">Wells</router-link>|
      <router-link to="/about">About</router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <em>{{username}}</em>
            </template>
            <b-dropdown-item @click="openUserInfoModal" href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
        <b-button style="display:none" id="user-info" v-b-modal="'user-info-modal'">user info</b-button>
        <b-modal size="lg" v-bind:id="'user-info-modal'" centered v-bind:title="'barf'">
        </b-modal>
    </b-navbar>
  </div>
</template>
<script>
    import $ from 'jquery';

    export default {
        name: 'NavBar',
        
        data() {
            return {
                username: "nobody",
                email: '',
                password: '',
                error: false,
                errorMsg: `An error occurred, please try again`,
            }
        },
        methods:
        {
            mounted(){
                // get user info from local storage
                var user = JSON.parse(localStorage.getItem('userData'));
                console.log(user);
            },
            clicked() {
               console.log("clicked")
            },
            openUserInfoModal() {
                console.log("openUserInfoModal")
                $('#user-info').click()
            }
        },
    }

</script>