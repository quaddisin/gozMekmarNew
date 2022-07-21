
const state = {

    userAdmin : false,
    user : false
  
 
}

const actions = {

    userKontrolAct({commit}){

        const user = JSON.parse(localStorage.getItem('user'))
        
       if(user){
            
            if(user.kullaniciAdi == 'Gizem' || user.kullaniciAdi == 'Ozlem' || user.kullaniciAdi == 'Sema' || user.kullaniciAdi == 'Hakan' || user.kullaniciAdi == 'Sergen') 
              data.user = true
           
        }
      

        const data = {

        
            userStatus  :user
          
        }


        commit('userKontrolMut', data);
        
    }
}

const mutations = {

    userKontrolMut(state,data){

        
        state.user = data
       
    }
}

const getters = {

    
    getUserStatus(state){

        return state.user;
    }
    
}


export default {

    state,
    actions,
    mutations,
    getters
}