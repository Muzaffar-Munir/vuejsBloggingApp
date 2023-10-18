<template>
    <div class="login-box login-box-center">
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Verify page</p>

                <form @submit="handleVerfication">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Verification Code" v-model="verificationCode">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- /.col -->
                        <div>
                            <button class="btn btn-primary btn-block">Verify</button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import AWS from '../config/aws-config';

export default {
    name: 'VerificationPage',
    data() {
        return {
            verificationCode: '',
        }
    },
    methods: {
        handleVerfication() {
            const cognito = new AWS.CognitoIdentityServiceProvider();

            const params = {
                ClientId: process.env.VUE_APP_AWS_CLIENT_ID,
                ConfirmationCode: this.verificationCode,
                Username: this.$route.params.username,
            };

            cognito.confirmSignUp(params, (err, data) => {
                if (err) {
                    console.error('Code verification error:', err);
                } else {
                    console.log('Code verification success:', data);
                    // Proceed with user sign-in or other actions
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
  
  
  