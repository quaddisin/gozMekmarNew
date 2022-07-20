import Vue from 'vue';
import router from '../router'
import store from '../store/store'
const auth = {
    tokenStatus: () => {
        const secretKey = '1LAM1vvkeAmzxfRaCSbTksDnZNVsE1jrV6'
        const token = Vue.$jwt.getToken()
        const result = Vue.$jwt.decode(token,secretKey)
        if (result == null) {
            const data = { 'status': false, 'user': '' }
            store.dispatch('tokenAct',data)
            router.push('/login')
        } else {
            const data = { 'status': true, 'user': result.user }
            store.dispatch('tokenAct',data)
        }
    }
    

}
export default auth;
