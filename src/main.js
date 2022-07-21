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
import AutoComplete from 'primevue/autocomplete';
const app = createApp(App)
export const eventListener = app
app.use(PrimeVue)
app.use(router)
app.filter('toCurrency', function (value) {
	if (typeof value !== "number") {
		return value;
	}
	var formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	});
	return formatter.format(value);
});

app.filter('toDecimal', function (value) {
	if (!value) return value
					
	return parseFloat(value).toFixed(2) 
}) 
app.component('ButTon', Button)
app.component('InputText', InputText)
app.component('DropDown', Dropdown)
app.component('DiaLog', Dialog)
app.component('DataTable', DataTable)
app.component('CoLumn', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('RoW', Row)
app.component('AutoComplete',AutoComplete)
app.mount('#app')
