<template>
    <div class="login-box login-box-center">
        <div class="card">
            <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" placeholder="Email">
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <input type="password" class="form-control" placeholder="Password">
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

                <p class="mb-1">
                    <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p class="mb-0">
                    <router-link to="/register">Register a new membership</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        register() {
            const params = {
                AuthFlow: 'USER_PASSWORD_AUTH',
                ClientId: 'Client_id', // Replace with your App Client ID
                AuthParameters: {
                    USERNAME: this.username,
                    PASSWORD: this.password,
                },
            };
            console.log("Register ::::: ", params)
        }
    }
}
</script>

<style>
.login-box-center {
    margin: 5rem auto;
}
</style>
  
  
  