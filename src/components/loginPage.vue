<template>
    <div class="login-box login-box-center">
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form @submit="login">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Username" v-model="username">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Password" v-model="password">
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
import AWS from '../config/aws-config';

export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        login() {
            this.$store.commit('isShowLoader', true)
            const cognito = new AWS.CognitoIdentityServiceProvider();
            const params = {
                AuthFlow: process.env.VUE_APP_LOGIN_TYPE,
                ClientId: process.env.VUE_APP_AWS_CLIENT_ID, // Replace with your App Client ID
                AuthParameters: {
                    USERNAME: this.username,
                    PASSWORD: this.password,
                },
            };
            cognito.initiateAuth(params, (err, data) => {
                if (err) {
                    this.$store.commit('isShowLoader', false)

                    console.error('Sign-in error:', err);
                } else {
                    localStorage.setItem("currentUser", data.AuthenticationResult.AccessToken)
                    this.$router.push('/dashboard/home');
                    console.log('Sign-in success:', data);
                    this.$store.commit('isShowLoader', false)

                }
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
  
  
  