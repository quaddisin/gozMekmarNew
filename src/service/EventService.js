import axios from 'axios';

export default class EventService {

	getEvents() {
		localStorage.setItem('efesuser')
		return axios.get('assets/layout/data/events.json').then(res => res.data.data);
	}
}