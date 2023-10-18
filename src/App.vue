<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
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
  },
  created(){
   
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
