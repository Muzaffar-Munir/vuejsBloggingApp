<template>
    <div>
        <!-- Content Wrapper. Contains page content -->

        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Dashboard v3</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><router-link to="/dashboard/home">Home</router-link></li>
                            <li class="breadcrumb-item active">Dashboard v3</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->
        <!-- Main content -->
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card card-default">
                            <div class="card-header">
                                <h3 class="card-title">Create User</h3>
                            </div>
                            <div class="card-body p-2">
                                <div class="bs-stepper">

                                    <div class="bs-stepper-content">
                                        <!-- your steps content here -->
                                        <div id="logins-part" class="content" role="tabpanel"
                                            aria-labelledby="logins-part-trigger">
                                            <div class="form-group">
                                                <label for="title">Name</label>
                                                <input type="text" class="form-control" id="title" placeholder="Enter Name"
                                                    v-model="user.name">
                                            </div>
                                            <div class="form-group">
                                                <label for="content">Email</label>
                                                <input type="email" class="form-control" id="email"
                                                    placeholder="Enter Email" v-model="user.email">
                                            </div>
                                            <button class="btn btn-primary" @click="submit()">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </div>
        <!-- /.content -->
    </div>
</template>
  
<script>
import gql from 'graphql-tag';


export default {
    name: 'CreateUser',
    data() {
        return {
            user: {
                id: crypto.randomUUID(),
                name: '',
                email: '',
            },
            title: '',
            content: ''
        }
    },
    methods: {
        submit() {
            this.$store.commit('isShowLoader', true)
            if (this.$route.params.id) {
                this.updateData();
            } else {
                this.createUser();
            }
            this.$store.commit('isShowLoader', false)

        },
        async createUser() {
            console.log("AAAAAAAAa ", this.user);

            try {
                const { data } = await this.$apollo.mutate({
                    mutation: gql`mutation MyQuery {
            createUserServiceDev(input: {email: "${this.user.email}", id: "${this.user.id}", name: "${this.user.name}"}) {
                                            id,
                                            name,
                                            email
                                        }
                                    }`,
                });

                if (data && !data.createUserServiceDev) {
                    // Optionally, you can handle UI updates or redirects after successful deletion.
                    this.$toast.error('something went wrong');
                }
                this.$router.push('/dashboard/listUser')
                // this.getData();
            } catch (error) {
                console.log(error);
                console.log("Error deleting item:", error);

                this.$toast.error(error?.message || 'something went wrong');
                // Handle error states or show error messages to the user.
            }
        },
        async updateData(){
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: gql`mutation MyQuery {
                        updateUserServiceDev(input: {email: "${this.user.email}", id: "${this.user.id}", name: "${this.user.name}"}) {
                                            id,
                                            name,
                                            email
                                        }
                                    }`,
                });

                if (data && !data.updateUserServiceDev) {
                    // Optionally, you can handle UI updates or redirects after successful deletion.
                    this.$toast.error('something went wrong');
                }
                this.$router.push('/dashboard/listUser')
                // this.getData();
            } catch (error) {
                console.log(error);
                console.log("Error deleting item:", error);

                this.$toast.error(error?.message || 'something went wrong');
                // Handle error states or show error messages to the user.
            }
        },
        async getUser(id) {
            try {
                const { data } = await this.$apollo.query({
                    query: gql`query MyQuery {
            getUserServiceDev(id: "${id}"){
    email
    id
    name
  }
            }`
                });

                console.log(data);
                // this.listUserServiceDevs = data?.listUserServiceDevs;
                if (data?.getUserServiceDev) {
                    this.user = data.getUserServiceDev;
                }
            } catch (error) {
                console.error("Error fetching items:", error);
                // Handle error states or show error messages to the user.
            }
        },
    },
    created() {
        console.log(this.$route.params.id);
        if (this.$route.params.id) {
            this.getUser(this.$route.params.id);
        }
    },
}
</script>

<style>
.login-box-center {
    margin: 5rem auto;
}
</style>
  
  
  