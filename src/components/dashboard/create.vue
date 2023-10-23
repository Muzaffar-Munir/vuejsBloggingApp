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
                    <div class="col-md-12">
                        <div class="card card-default">
                            <div class="card-header">
                                <h3 class="card-title">Create Blog</h3>
                            </div>
                            <div class="card-body p-2">
                                <div class="bs-stepper">

                                    <div class="bs-stepper-content">
                                        <!-- your steps content here -->
                                        <div id="logins-part" class="content" role="tabpanel"
                                            aria-labelledby="logins-part-trigger">
                                            <div class="form-group">
                                                <label for="title">Title</label>
                                                <input type="text" class="form-control" id="title" placeholder="Enter title"
                                                    v-model="blog.title">
                                            </div>
                                            <div class="form-group">
                                                <label for="content">content</label>
                                                <textarea type="text" class="form-control" id="content"
                                                    placeholder="Enter content" v-model="blog.content"> </textarea>
                                            </div>
                                            <button class="btn btn-primary" @click="submit">{{ this.$route.params.id ?
                                                "Update" : "Create" }}</button>
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
    name: 'BlogCreate',
    data() {
        return {
            blog: {
                title: '',
                content: ''
            }
        }
    },
    methods: {
        submit() {
            this.$store.commit('isShowLoader', true);
            if (this.$route.params.id) {
                this.updateBlog();
            } else {
                this.createBlog();
            }
            this.$store.commit('isShowLoader', false)
        },
        async createBlog() {
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: gql`mutation MyMutation {
                        createBlog(input: {content: "${this.blog.content}", title: "${this.blog.title}"}) {
                            id
                            content
                            title
                        }
                    }`,
                });
                if (data && data.createBlog) {
                    // Optionally, you can handle UI updates or redirects after successful deletion.
                    this.$toast.error('something went wrong');
                }
                this.$router.push('/dashboard/home')
                // this.getData();
            } catch (error) {
                console.log(error);
                console.log("Error deleting item:", error);

                this.$toast.error(error?.message || 'something went wrong');
                // Handle error states or show error messages to the user.
            }
        },
        async updateBlog() {
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: gql`mutation MyMutation {
                    updateBlog(input: {content: "${this.blog.content}", id: "${this.$route.params.id}", title: "${this.blog.title}"}) {
                        content
                        id
                        title
                    }
                    }`,
                });

                if (data && !data.updateBlog) {
                    // Optionally, you can handle UI updates or redirects after successful deletion.
                    this.$toast.error('something went wrong');
                }
                this.$router.push('/dashboard/home')
                // this.getData();
            } catch (error) {
                console.log(error);
                console.log("Error deleting item:", error);

                this.$toast.error(error?.message || 'something went wrong');
                // Handle error states or show error messages to the user.
            }
        },
        async getBlogById(id) {
            try {
                const { data } = await this.$apollo.query({
                    query: gql`query listBlogs {
                        getBlog(id: "${id}") {
                            id
                            content
                            title
                        }
                        }`
                });

                if (data?.getBlog) {
                    this.blog = data.getBlog;
                }
            } catch (error) {
                console.error("Error fetching items:", error);
                // Handle error states or show error messages to the user.
            }
        },
    },
    created() {
        if (this.$route.params.id) {
            this.getBlogById(this.$route.params.id);
        }
    },
}
</script>

<style>
.login-box-center {
    margin: 5rem auto;
}
</style>
  
  
  