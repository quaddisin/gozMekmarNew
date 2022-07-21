const state = {

    loadStatus : false
}

const actions = {

    loadBegin({commit}){

        commit('loadBeginMut')
    },
    loadEnd({commit}){

        commit('loadEndMut');
    }
}

const mutations = {

    loadBeginMut(state){

        state.loadStatus = true;
    },
    loadEndMut(state){

        state.loadStatus = false;
    }

}

const getters = {

    getLoadStatus(state){

        return state.loadStatus;
    }
}

export default {

    state,
    actions,
    mutations,
    getters

}