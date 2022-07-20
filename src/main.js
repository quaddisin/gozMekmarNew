import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/rhea/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';
const app = createApp(App)
export const eventListener = app
app.use(PrimeVue)
app.use(router)
app.component('ButTon', Button)
app.component('InputText', InputText)
app.component('DropDown', Dropdown)
app.component('DiaLog', Dialog)
app.component('DataTable', DataTable)
app.component('CoLumn', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('RoW',Row)
app.mount('#app')
