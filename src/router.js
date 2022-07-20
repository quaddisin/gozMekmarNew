import LoginViews from './views/LoginViews'
import SeleksiyonGiris from './views/seleksiyon/SeleksiyonGiris'
import KasaOlculeri from './views/seleksiyon/KasaOlculeri'
import { createRouter,createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name:'loginForm',
        component:LoginViews
    },
    {
        path: '/seleksiyon/uretim',
        name:'seleksiyonGiris',
        component:SeleksiyonGiris
    },
    {
        path: '/seleksiyon/kasaOlculeri',
        name:'kasaOlculeri',
        component:KasaOlculeri
    }

    
];
const router = createRouter({
    routes:routes,
    mode:'history',
    history:createWebHistory()
});
export default router
