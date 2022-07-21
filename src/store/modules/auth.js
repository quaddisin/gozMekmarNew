
const state = {

    hasToken : false,
    user : ''
}

const actions = {

    tokenAct({commit},data){

        commit('tokenMut',data)
    }
}

const mutations = {

    tokenMut(state,data){

        state.hasToken = data.status;
        state.user = data.user;
    }
}

const getters = {

    getToken(state){

        return state.hasToken;
    },
    getUser(state){

        return state.user;
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}