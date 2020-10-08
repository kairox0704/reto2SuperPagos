export default{
    namespaced:true,
    state:{
        apiStore: null,
        apiListC:[],
        apiListS:[],
        apiListE:[]
    },
    mutations:{
        CargarApi(state,payload){
            state.apiStore = payload
        },
        CargarListasC(state,payload){
            state.apiListC = payload
        },CargarListasE(state,payload){
            state.apiListE = payload
        },
        CargarListasS(state,payload){
            state.apiListS = payload
        }
    },
    getters:{
        devolverApi: state => {
            return state.apiStore
        }
    }
}

