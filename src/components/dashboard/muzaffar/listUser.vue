<template>
  <div>
    <!-- Content Wrapper. Contains page content -->

    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid d-flex">
        <div class="row mb-2">
          <div class="col-sm-6">
            <!-- <h1 class="m-0">Dashboard v3</h1> -->
          </div><!-- /.col -->
        </div><!-- /.row -->
        <div>
          <routerLink to="/dashboard/createUser"> <button class="btn btn-primary">Create</button></routerLink>
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
                <h3 class="card-title">Users</h3>
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
                      <th>Id #</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>More</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in listUserServiceDevs?.items" :key="index">
                      <td>
                        {{ item?.id }}
                      </td>
                      <td>{{ item?.name }}</td>
                      <td>
                        {{ item?.email }}
                      </td>
                      <td>
                        <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
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
query MyQuery {
  listUserServiceDevs {
    items {
      email
      id
      name
    }
  }
}`;
export default {
  name: 'dashboardHome',
  methods: {
    async getData() {
      try {
        const { data } = await this.$apollo.query({
          query: GET_USERS,
        });

        console.log(data);
        this.listUserServiceDevs = data?.listUserServiceDevs;
      } catch (error) {
        console.error("Error fetching items:", error);
        // Handle error states or show error messages to the user.
      }
    },
    async deleteItem(id) {

      try {
        const { data } = await this.$apollo.mutate({
          mutation: gql`mutation MyQuery {
          deleteUserServiceDev(input: {id: "${id}"}){
          id
          }
        }
        `,
        });

        console.log(data);
        if (data && !data.deleteUserServiceDev) {
          console.log("Item deleted successfully!");
          // Optionally, you can handle UI updates or redirects after successful deletion.
          this.$toast.error('something went wrong');
        } else {
          this.getData();
        }
        
      } catch (error) {
        console.log(error);
        console.log("Error deleting item:", error);
        // Handle error states or show error messages to the user.
      }
    }
  },
  data() {
    return {
      listUserServiceDevs: [],
    }
  },

  created() {
    this.getData();
  }
}
</script>