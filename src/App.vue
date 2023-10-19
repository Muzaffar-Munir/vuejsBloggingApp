<template>
  <div id="app">
    <loader :is-visible="this.$store.state.showLoader"></loader>
    <router-view></router-view>
  </div>
</template>

<script>

import loader from './components/loaderComponent.vue';

export default {
  components:{
    loader
  },
  name: 'App',
  data(){
    return{
    }
  },
  methods: {
    increments(){
      // this.$store.commit('increment')
    this.$store.commit('increment')

    },
    redirectTo(){
      console.log('clikded');
    //  this.decremented();
    console.log(this.$store.state.count)

    },
    decremented(){
      // this.$store.commit('decrement')
      this.$store.commit("decrement")

    }
  }
   
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
