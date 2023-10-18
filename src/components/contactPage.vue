<template>
  <div class="hello">
    <h1>{{ 'contact' }}</h1>
    <h4>{{ msg }}</h4>



    <button class="btn btn-info" @click="shouldChangeTitle()"> changeinfo()</button>
    
  </div>
</template>

<script>
export default {
  name: 'contactPage',

  props: {
    msg: String,
    changeTitle: String
  },
  methods:{
    shouldChangeTitle(){
      // this.changeTitle.emit('new titel')
      this.$emit('changeTitle','Awesome ')
    }
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
