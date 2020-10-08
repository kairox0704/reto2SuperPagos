<template>
  <div>
      <h1>numero {{$store.state.numero = this.todos}}</h1>
      <h1>{{$store.state.numero}}</h1>
  </div>
</template>

<script>
import axios from'axios'
export default {
  name: 'api',
  data(){
    return{
      todos:null,
    }
  },
  mounted(){
    this.getTodos();
  },
  methods: {
    getTodos(){
      axios.get
      ('https://www.datos.gov.co/resource/gt2j-8ykr.json')
      .then( Response =>{
        console.log(this.todos)
        this.todos = Response.data
      })
      .catch( e=> console.log(e))

    }
  }
}
</script>

<style>

</style>