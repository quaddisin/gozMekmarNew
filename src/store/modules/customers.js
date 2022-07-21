const state = {

   
    satisci_detay : null
   
}

const actions = {


  
    musteri_ayrinti_yukle_act({commit},data){

        commit('musteri_ayrinti_yukle_mut',data)
    }
}

const mutations = {


   
    musteri_ayrinti_yukle_mut(state,data){

        state.satisci_detay = data
       
    }
    
}

const getters = {

    satisci_detay(state){

        return state.satisci_detay
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}