import axios from 'axios';

export const getPost = () => dispatch =>
    axios({
        method: 'GET',
        url: `https://jsonplaceholder.typicode.com/posts`,
        headers: []
    }).then( response => dispatch({type: 'FOO',payload: response.data }));