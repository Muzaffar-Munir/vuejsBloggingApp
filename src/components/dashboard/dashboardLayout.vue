<template>
    <div class="hello">
        <sideBarNav></sideBarNav>

        <router-view></router-view>

        <!-- Main Footer -->
        <footer class="main-footer">
            <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
            All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0
            </div>
        </footer>
    </div>
</template> 

<script>
import sideBarNav from './sidebarNav.vue'
export default {
    name: 'dashboardLayout',
    components: {
        sideBarNav,
    }
}
</script>
