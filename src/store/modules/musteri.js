const state = {

    musteri_listesi: null,
    musteri_siparis_listesi:null,
    siparis_ozet : null , 
    siparis_ozet_ayrinti : null,
    musteri_model : null,
    musteri_ulke_list : null,
    musteri_temsilci_list: null
    
}

const actions = {


    musteri_listesi_yukle_act({commit},data){

        commit('musteri_listesi_yukle_mut',data)
    },
    musteri_siparis_listesi_yukle_act({commit},data){

        commit('musteri_siparis_listesi_yukle_act',data)
    },
    yeni_musteri_model_yukle_act({commit},data){

        commit('yeni_musteri_model_yukle_mut',data)
    },
    musteri_detay_yukle_act({commit},data){

        commit('musteri_detay_yukle_mut',data)
    }
    ,
    musteri_siparis_yukle_act({commit},data){

        commit('musteri_siparis_yukle_mut',data)
    },
    siparis_ozet_ayrinti_act({commit},data){

        commit('siparis_ozet_ayrinti_mut',data)
    },
}

const mutations = {


    musteri_listesi_yukle_mut(state,data){

        state.musteri_listesi = data
    },
    musteri_siparis_listesi_yukle_mut(state,data){

        state.musteri_siparis_listesi = data
    },
    siparis_ozet_ayrinti_mut(state,data){

        state.siparis_ozet_ayrinti = data
    },
    yeni_musteri_model_yukle_mut(state,data){

        state.musteri_model = data.musteri_model
        state.siparis_ozet = data.siparis_ozet
        state.musteri_ulke_list = data.ulke_list
        state.musteri_temsilci_list = data.temsilci_list
    },
    musteri_detay_yukle_mut(state,data){
        state.musteri_model = data.musteri_detay
        state.siparis_ozet = data.siparis_ozet
        state.musteri_ulke_list = data.ulke_list
        state.musteri_temsilci_list = data.temsilci_list
    },
    
}

const getters = {

    musteri_listesi(state){

        return state.musteri_listesi
    },
    musteri_siparis_listesi(state){

        return state.musteri_siparis_listesi
    },
    musteri_model(state){

        return state.musteri_model
    },
    siparis_ozet(state){

        return state.siparis_ozet
    },
    siparis_ozet_ayrinti(state){

        return state.siparis_ozet_ayrinti
    },
    musteri_ulke_list(state){

        return state.musteri_ulke_list
    },
    musteri_temsilci_list(state){

        return state.musteri_temsilci_list
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}