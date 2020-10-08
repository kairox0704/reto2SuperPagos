<template>
  <div>
      <h1 v-for="(item,index) in apiStore" :key="index">{{item}}</h1>
  </div>
</template>

<script>
import axios from'axios'
import { mapState, mapMutations } from "vuex"
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
        this.todos = Response.data
        this.CargarApi(this.todos)
      })
      .catch( e=> console.log(e))
    },
    ...mapMutations('apiStore',['CargarApi'])
  },
  computed:{
      ...mapState('apiStore',['apiStore'])
  }
}
</script>

<style>

</style>