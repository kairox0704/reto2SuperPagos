<template>
  <div>
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
      ListC:[],
      ListE:[],
      ListS:['F','M']
    }
  },
  mounted(){
    this.getTodos();
    this.intervalo();
  },
  methods: {
    getTodos(){
      axios.get
      ('https://www.datos.gov.co/resource/gt2j-8ykr.json')
      .then( Response =>{
        this.todos = Response.data
        for(var todo in this.todos){
          var ExistC = false;
          var ExistE = false;
          if(this.ListC.length === 0){
            this.ListC.push(this.todos[todo].ciudad_de_ubicaci_n);
          }

          if(this.ListC.length !== 0){
            for (let i = 0; i < this.ListC.length; i++) {
              if(this.ListC[i] == this.todos[todo].ciudad_de_ubicaci_n){
                ExistC = true;
              }
            }
            if(ExistC === false){
              this.ListC.push(this.todos[todo].ciudad_de_ubicaci_n)
            }
            ExistC = false;
          }

          if(this.ListE.length === 0){
            this.ListE.push(this.todos[todo].estado);
          }

          if(this.ListE.length !== 0){
            for (let i = 0; i < this.ListE.length; i++) {
              if(this.ListE[i] == this.todos[todo].estado){
                ExistE = true;
              }
            }
            if(ExistE === false){
              this.ListE.push(this.todos[todo].estado)
            }
            ExistE = false;
          }

        }
        this.CargarApi(this.todos)
        this.CargarListasC(this.ListC)
        this.CargarListasE(this.ListE)
        this.CargarListasS(this.ListS)
      })
      .catch( e=> console.log(e))
    },
    ...mapMutations('apiStore',['CargarApi']),
    ...mapMutations('apiStore',['CargarListasC']),
    ...mapMutations('apiStore',['CargarListasE']),
    ...mapMutations('apiStore',['CargarListasS']),
    intervalo(){
      setInterval(function(){
        this.getTodos()
      },600000)
    }
  },
  computed:{
      ...mapState('apiStore',['apiStore'])
  }
}
</script>

<style>

</style>
