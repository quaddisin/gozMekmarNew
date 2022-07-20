import io from 'socket.io-client';

const socket = {
    siparis: io('https:doktor-socket.mekmar.com'),
    headers: {
        'Access-Control-Allow-Origin':'*',
    }
}
export default socket;