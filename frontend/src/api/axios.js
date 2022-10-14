import axios from 'axios';

export default axios.create({
    baseURL: 'http://chat-palomo.herokuapp.com/'
});