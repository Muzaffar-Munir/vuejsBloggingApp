<template>
    <div class="register-box signup-box-center">

        <div class="card">
            <div class="card-body register-card-body">
                <p class="login-box-msg">Register a new membership</p>

                <form @submit="register">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Username" v-model="username">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Email" v-model="email">
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
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Retype password" v-model="confirmPassword">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <button class="btn btn-primary btn-block">Register</button>
                        </div>
                    </div>
                </form>

                <router-link to="/login">I already have a membership</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import AWS from '../config/aws-config';

export default {
    name: 'SignUpPage',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        register() {
            const cognito = new AWS.CognitoIdentityServiceProvider();

            const params = {
                ClientId: process.env.VUE_APP_AWS_CLIENT_ID, // Replace with your App Client ID
                Username: this.username,
                Password: this.password,
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: this.email,
                    },
                ],
            };

            cognito.signUp(params, (err, data) => {
                if (err) {
                    console.error('Sign-up error:', err);
                } else {
                    this.$router.push(`/verify/${this.username}`);
                    console.log('Sign-up success:', data);
                    // Handle user confirmation, send confirmation code
                }
            });

        }
    }
}
</script>

<style>
.signup-box-center {
    margin: 5rem auto;

}
</style>
  
  
  