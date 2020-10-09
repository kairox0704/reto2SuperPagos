<template>
  <div class="container">
    <div >
       
        <button class="btn btn-success margin: 0 auto;" type="button" @click="agregarFiltro(true)">Inicializar</button>
        
        <input id="InC" type = "text" v-model="filtroC">
        <input id="InE" type = "text" v-model="filtroE">
        <input id="InS" type = "text" v-model="filtroS">
        <button @click="agregarFiltro(true)">agregar</button>
        <button @click="eliminarFiltro">eliminar</button>
        <button @click="ventana=true">Formulario Parciente</button>
    </div>
    <api/>
    <div div class="container">
        <div class="row">
            <div class="col-md-6 col-xs-12">
                <h1>Filtros</h1>
                <form action="text">
                    <table class="table table-striped">
                        <tbody>
                            <tr v-for="(item1, index1) in listFilterR" :key=index1>
                                <th>{{item1}}</th>
                            </tr> 
                        </tbody>
                    </table>
                </form>
                
                <div v-if="ventana">
                    <h1>Informacion</h1>
                    <form action="text">
                        <table class="table table-striped">
                            <tr>
                                <th>ID</th>
                                <th><input type = "text" v-model="ValID"> </th>
                            </tr>
                            <tr>
                                <th>Ciudad</th>
                                <th><input type = "text" v-model="ValCiudad"> </th>
                            </tr>
                            <tr>
                                <th>Estado</th>
                                <th><input type = "text" v-model="ValEstado"></th>
                            </tr>
                            <tr>
                                <th>Sexo</th>
                                <th><input type = "text" v-model="ValSexo"></th>
                            </tr>
                        </table>
                        <input @click="guardar" @click.prevent="ventana=false" type="button" value="guardar">
                        <input @click="eliminar" @click.prevent="ventana=false" type="button" value="eliminar">
                        <input @click="actualizar" @click.prevent="ventana=false" type="button" value="actualizar">
                    </form>
                </div>
            </div>
            <div class="col-md-6 col-xs-12">
                <h1>Lista De pacientes</h1>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ciudad</th>
                            <th>Estado</th>
                            <th>Sexo</th>
                        </tr>
                    </thead>
                    <tbody>    
                    <tr v-for="(item, index) in listaG" :key=index> 
                            <th>{{item.id_de_caso}}</th>
                            <th>{{item.ciudad_de_ubicaci_n}}</th>
                            <th>{{item.estado}}</th>
                            <th>{{item.sexo}}</th>   
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
            ventana : false,
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
            if(e){
                this.aux = this.devolverApi
            }
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
            this.filtroC = ''
            this.filtroE = ''
            this.filtroS = ''
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
            this.nuevoD.id_de_caso = (this.aux.length + 1);
            this.nuevoD.ciudad_de_ubicaci_n = this.ValCiudad;
            this.nuevoD.estado = this.ValEstado;
            this.nuevoD.sexo = this.ValSexo;
            this.aux.push(this.nuevoD);
            this.agregarFiltro(true)
        },
        eliminar(){
            this.aux.splice(this.ValID-1,1)
            this.CargarApi(this.aux)
            this.agregarFiltro(true)
        },
        actualizar(){
            var salida = true;
            var i = 0;
            while (salida) {
                if(this.aux[i].id_de_caso === this.ValID){
                    if(this.ValCiudad != ''){
                        this.aux[i].ciudad_de_ubicaci_n = this.ValCiudad;
                        salida = false;
                    } 
                    if(this.ValEstado != ''){
                        this.aux[i].estado = this.ValEstado;
                        salida = false;
                    } 
                    if(this.ValSexo != ''){
                        this.aux[i].sexo = this.ValSexo;
                        salida = false;
                    } 
                }
                i++;
                if(this.aux.length<=i){
                    salida = true;
                }
            }
            this.agregarFiltro(false)
        },
        ...mapMutations('apiStore',['CargarApi'])
    }
}
</script>