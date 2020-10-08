<template>
  <div>
    <div >
        <input type = "text" v-model="filtroC">
        <input type = "text" v-model="filtroE">
        <input type = "text" v-model="filtroS">
        <button @click="agregarFiltro(true)">agregar</button>
        <button @click="eliminarFiltro">eliminar</button>
        <button  @click="ventana=true">nueva tarea</button>
        
        <div v-if="ventana">
            <form action="text">
                <div>
                    <label>Id  </label>
                <input type = "text" v-model="ValID">                
                </div>
                 <div>
                    <label>Ciudad</label>
                    <input type = "text" v-model="ValCiudad">   
                </div>
                <div>
                    <label>Estado</label>
                    <input type = "text" v-model="ValEstado">   
                </div>
                <div>
                    <label>Sexo</label>
                    <input type = "text" v-model="ValSexo">   
                </div>
                <input @click="guardar" @click.prevent="ventana=false" type="button" value="guardar">
                <input @click="eliminar" @click.prevent="ventana=false" type="button" value="eliminar">
                <input @click="actualizar" @click.prevent="ventana=false" type="button" value="actualizar">
            </form>
        </div>
    </div>
    <div>   
        <div v-for="(item1, index1) in listFilterR" :key=index1>{{item1}}</div>
    </div>
    <api/>
    <div v-for="(item, index) in listaG" :key=index>
      {{item.id_de_caso}} {{item.ciudad_de_ubicaci_n}} {{item.estado}}  {{item.sexo}} 
    </div>
  </div>
</template>

<script>
import api from './api'
import axios from'axios'
import { mapState, mapMutations, mapGetters } from "vuex"

export default {
    name: 'home',

    data(){
        return{
            listFilterC : [],
            listFilterE : [],
            listFilterS : [],
            listFilterR : [],
            filtroC: '',
            filtroE: '',
            filtroS: '',
            contC:0,
            contE:0,
            contS:0,
            contG:0,
            graf : null,
            listaG : [],
            aux : null,
            myWorker: null,
            ventana : true,
            ValID : '',
            ValCiudad : '',
            ValEstado : '',
            ValSexo : '',
            nuevoD : []
        }
    },
    components:{
        api
    },
    computed:{
        ...mapState('apiStore',['apiStore']),
        ...mapGetters('apiStore',[
            'devolverApi'
        ])
    },
    methods:{
        agregarFiltro(e){
            this.aux = this.devolverApi
            this.listaG = [];
            if(e){
                if(this.filtroC != ''){
                    if(this.listFilterC.indexOf(this.filtroC) < 0){
                        this.listFilterC.push(this.filtroC);
                        this.listFilterR.push(this.filtroC);
                    }
                }
                if(this.filtroE != ''){
                    if(this.listFilterE.indexOf(this.filtroE) < 0){
                        this.listFilterE.push(this.filtroE);
                        this.listFilterR.push(this.filtroE);
                    }
                }
                if(this.filtroS != ''){
                    if(this.listFilterS.indexOf(this.filtroS) < 0){
                    this.listFilterS.push(this.filtroS);
                    this.listFilterR.push(this.filtroS);
                    }
                }
            }
            for (var i=0; i<this.aux.length;i++) {
                for (var j=0; j< this.listFilterC.length;j++) {
                    if (this.listFilterC[j] === this.aux[i].ciudad_de_ubicaci_n) {
                        this.contC =  1;                     
                    }
                }
                for (var l=0; l<this.listFilterE.length;l++) {
                    if (this.listFilterE[l] === this.aux[i].estado) {
                        this.contE =  1;                        
                    }
                }
                for (var k=0; k<this.listFilterS.length;k++) {
                    if (this.listFilterS[k] === this.aux[i].sexo) {
                        this.contS =  1;                        
                    }
                }
                if(this.listFilterC.length>0){
                    this.contC = this.contC - 1
                }
                if(this.listFilterE.length>0){
                    this.contE = this.contE - 1
                }
                if(this.listFilterS.length>0){
                    this.contS = this.contS - 1
                }
                if(this.contC==0 && this.contE==0 && this.contS==0){
                    this.listaG.push(this.aux[i]);
                }
                this.contC = 0;
                this.contE = 0;
                this.contS = 0;
            }
        },
        eliminarFiltro(){
            this.listFilterC.splice(this.listFilterC.indexOf(this.filtroC),1)
            this.listFilterE.splice(this.listFilterE.indexOf(this.filtroE),1)
            this.listFilterS.splice(this.listFilterS.indexOf(this.filtroS),1)

            this.listFilterR.splice(this.listFilterR.indexOf(this.filtroC),1)
            this.listFilterR.splice(this.listFilterR.indexOf(this.filtroE),1)
            this.listFilterR.splice(this.listFilterR.indexOf(this.filtroS),1)


            this.agregarFiltro(false)
        },
        guardar(){
            this.nuevoD = this.aux[0];
            this.nuevoD.ciudad_de_ubicaci_n = this.ValCiudad;
            this.nuevoD.id_de_caso = this.aux.length
            this.nuevoD.estado = this.ValEstado;
            this.nuevoD.sexo = this.ValSexo;
            this.aux.push(this.nuevoD);
            this.agregarFiltro(false)
        },
        eliminar(){
            this.listFilterS.splice(this.ValID,1)
            this.agregarFiltro(false)
        },
        actualizar(){
            this.nuevoD = this.aux[this.ValID];
            if(this.ValCiudad != ''){
                this.nuevoD.ciudad_de_ubicaci_n = this.ValCiudad;
            } 
            if(this.ValCiudad != ''){
                this.nuevoD.estado = this.ValEstado;
            } 
            if(this.ValCiudad != ''){
                this.nuevoD.sexo = this.ValSexo;
            } 
            this.agregarFiltro(false)
        }
    }
}
</script>