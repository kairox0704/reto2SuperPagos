export default{
    namespaced:true,
    state:{
        apiStore: null
    },
    mutations:{
        CargarApi(state,payload){
            state.apiStore = payload
        }
    }
}