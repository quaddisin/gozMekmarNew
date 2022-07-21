const state = {

    evrak_siparisList : null,
    evrak_evrakList : null
    
}

const actions = {

    loadEvrakList({commit},data){

        commit('loadEvrakListMut',data)
    }

}

const mutations = {

    loadEvrakListMut(state,data){
        
        state.evrak_siparisList = data.siparis_liste;
        state.evrak_evrakList = data.evrak_listesi;
       

       

       
    }
    
    
}

const getters = {

   evrak_siparisList(state){

        return state.evrak_siparisList;
    },
    evrak_evrakList(state){

        return state.evrak_evrakList
    }
    
    

}

export default {

    state,
    actions,
    mutations,
    getters
}