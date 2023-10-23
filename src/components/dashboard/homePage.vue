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
        </div><!-- /.row -->
        <div>
          <button @click="handleCreate" class="btn btn-primary">Create</button>
        </div>
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->
    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">

            <!-- /.card -->

            <div class="card">
              <div class="card-header border-0">
                <h3 class="card-title">Products</h3>
                <div class="card-tools">
                  <a href="#" class="btn btn-tool btn-sm">
                    <i class="fas fa-download"></i>
                  </a>
                  <a href="#" class="btn btn-tool btn-sm">
                    <i class="fas fa-bars"></i>
                  </a>
                </div>
              </div>
              <div class="card-body table-responsive p-0">
                <table class="table table-striped table-valign-middle">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>title</th>
                      <th>Content</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody v-if="blogs.length">
                    <tr v-for="item in blogs" :key="item.id">
                      <td>
                        1
                      </td>
                      <td>{{ item.title }}</td>
                      <td>{{ item.content }}</td>
                      <td>
                        <button @click="deleteBlog(item.id)" class="btn btn-danger btn-sm">Delete</button>
                        <button @click="handleClickEdit(item.id)" class="btn btn-success btn-sm ml-1">Edit</button>
                        <button type="button" class="btn btn-info btn-sm ml-1">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col-md-6 -->

          <!-- /.col-md-6 -->
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

const GET_USERS = gql`
query ListBlogs {
    listBlogs {
        items {
            id
            title
            content
        }
    }
}`;

export default {
  name: 'dashboardHome',
  data() {
    return {
      blogs: []
    }
  },
  methods: {
    handleCreate() {
      this.$router.push('/dashboard/blog-create');
    },
    async getBlog() {
      try {
        const { data } = await this.$apollo.query({
          query: GET_USERS,
          fetchPolicy: 'no-cache'
        });
        this.blogs = data.listBlogs.items;
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async deleteBlog(id) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`mutation MyQuery {
          deleteBlog(input: {id: "${id}"}){
          id
          }
        }
        `,
        });
        if (data && data.deleteBlog) {
          console.log("Item deleted successfully!");
          this.getBlog();
          // Optionally, you can handle UI updates or redirects after successful deletion.
        } else {
          this.$toast.error('something went wrong!');
        }

      } catch (error) {
        console.log(error);
        console.log("Error deleting item:", error);
        this.$toast.error('something went wrong');
        // Handle error states or show error messages to the user.
      }
    },
    handleClickEdit(id) {
      this.$router.push('/dashboard/blog-edit/' + id)
    }
  },
  created() {
    this.getBlog();
  }
}
</script>