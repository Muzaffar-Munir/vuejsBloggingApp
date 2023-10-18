<template>
  <div class="hello">
    <h1>{{ 'about' }}</h1>
    <contactPage msg="testMessage from About" @changeTitle="ChangeT($event)"> </contactPage>

    <button class="btn btn-info" @click="onIncrease()"> +</button>
    <button class="btn btn-danger" @click="descrease()"> -</button>
    
  </div>
</template>

<script>
import contactPage from './contactPage'

export default {
  name: 'AboutPage',
  components:{
    contactPage,
  },
methods:{
  onIncrease(){
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  },
  descrease(){
    this.$store.commit('decrement')
  },
  ChangeT(data){
    console.log(data);
  }
},
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
