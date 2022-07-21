const state = {

    vadeListesi :null,
 
    
}
const actions = {

    vadeListesiAct({commit},data){

        commit('vadeListesiMut',data);
    }
}
const mutations = {

    vadeListesiMut(state,data){

        state.vadeListesi = data;
        
    },
   
}
const getters = {

    vadeListesi(state){

        return state.vadeListesi;
    }
}


export default{

    state,
    actions,
    mutations,
    getters
}