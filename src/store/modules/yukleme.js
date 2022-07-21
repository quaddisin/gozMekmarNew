const state = {

    aylik_yukleme_listesi :  [],
    yukleme_yillik : [],
 }

const actions = {

    yuklemeAylik_Act({commit},data){

        commit('yukleme_aylik_mut',data)
    },
    yuklemeYillik_Act({commit},data){

        commit('yukleme_yillik_mut',data)
    }
}

const mutations = {
    yukleme_aylik_mut(state,data){

        state.aylik_yukleme_listesi = data
    },
    yukleme_yillik_mut(state,data){

        state.yukleme_yillik = data
    }

 
}

const getters = {

    aylik_yukleme_listesi(state){

        return state.aylik_yukleme_listesi
    },
    yukleme_yillik(state){

        return state.yukleme_yillik
    }
   
}


export default {

    state,
    actions,
    mutations,
    getters
}