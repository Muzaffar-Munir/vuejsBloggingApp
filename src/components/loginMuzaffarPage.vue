<template>
    <div class="login-box login-box-center">
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form @submit="getUser()">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Username" v-model="user.Username">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Password" v-model="user.Password">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- /.col -->
                        <div>
                            <button class="btn btn-primary btn-block">Sign In</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>

                <p class="mb-0 mt-2">
                    <router-link to="/register">Register a new membership</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
  
<script>
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import router from '../router'

export default {
    name: 'loginMuzaffarPage',
    data() {
        return {
            user: {
                Username: '',
                Password: ''
            }
        }
    },
    methods: {
        getUser() {
            const authenticationData = {
                ...this.user
            };
            const authenticationDetails = new AuthenticationDetails(
                authenticationData,
            );
            const poolData = {
                UserPoolId: process.env.VUE_APP_AWS_USER_POLL_ID,
                ClientId: process.env.VUE_APP_AWS_CLIENT_ID,
            };
            const userPool = new CognitoUserPool(poolData);
            const userData = {
                Username: this.user.Username,
                Pool: userPool,
            };
            // this.$store.commit('isShowLoader', true)
            const cognitoUser = new CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    console.log("res", result);

                    const accessToken = result.getAccessToken().getJwtToken();

                    /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
                    const idToken = result;
                    // ? result?.idToken?.jwtToken : null

                    console.log(accessToken, idToken);
                    // this.$store.commit('isShowLoader', false)
                    localStorage.setItem("currentUser", accessToken)
                    router.push('/dashboard/home');


                },

                onFailure: function (err) {
                    console.log('failuare', err);
                    // this.$store.commit('isShowLoader', false)
                },
            });
        }
    }
}
</script>

<style>
.login-box-center {
    margin: 5rem auto;
}
</style>
  
  
  