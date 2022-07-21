const state = {

    stok_ana_list : null ,
    stok_ayrinti_list : null,
    stok_top_ayrinti_list: null,
    uretimRaporList: null,
    stokRaporList:null
    

}

const actions = {

    stok_ana_list_yukle_act({commit},data){

        commit('stok_ana_liste_yukle_mut',data)
    },
    stok_ayrinti_list_yukle_act({commit},data){

        commit('stok_ayrinti_list_yukle_mut',data)
    },
    stok_top_ayrinti_list_yukle_act({commit},data){

        commit('stok_top_ayrinti_list_yukle_mut',data)
    },

    uretim_rapor_list_load_act({ commit }, data) {
        commit('uretim_rapor_list_load_mut',data)
    },
    stok_rapor_list_load_act({ commit }, data) {
        commit('stok_rapor_list_load_mut',data)
    }
    
    
    
      
    }
    


const mutations = {

    stok_ana_liste_yukle_mut(state,data){

        state.stok_ana_list = data.stok_listesi
    },
    stok_ayrinti_list_yukle_mut(state,data){

        state.stok_ayrinti_list = data.stok_top_listesi
   },
   stok_top_ayrinti_list_yukle_mut(state,data){

       state.stok_top_ayrinti_list = data

    },
    uretim_rapor_list_load_mut(state, data) {
       state.uretimRaporList = data
    },
    stok_rapor_list_load_mut(state, data) {
       state.stokRaporList = data
   }
   
    
}

const getters = {

    stok_ana_list(state){
        
        return state.stok_ana_list
        
    },
    
    stok_ayrinti_list(state){

        return state.stok_ayrinti_list
    },
    
    stok_top_ayrinti_list(state){

        return state.stok_top_ayrinti_list
    },
    stok_top_ayrinti_list_urunid(state){

        return state.stok_top_ayrinti_list_urunid
    },
    uretim_rapor_list_all(state) {
        return state.uretimRaporList
    },
    stok_rapor_list_all(state) {
        return state.stokRaporList
    }
    
}


export default {

    state,
    actions,
    mutations,
    getters
}