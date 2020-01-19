import { AUTHENTICATION, DEAUTHENTICATION } from '../constants/constants';
import cookie from 'js-cookie';
import Router from 'next/router';
export const authentication = user => dispatch => 
    fetch(`http://localhost:8000/api/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(data => data.json())
    .then(res =>
       {
        setCookie('token', response.token);
        Router.push('/');
         dispatch({type: AUTHENTICATION, payload: res.token})
       })
    .catch(err => console.log(err));

export const setCookie = (key, value) => {
    if(process.browser){
        Cookie.set(key, value, {
            exprires: 1,
            path: '/'
        })
    }
};

export const removeCookie = key => {
    if(process.browser){
        cookie.remove(key, {
            exprires: 1
        })
    }
}

export const getCookie = (key, req) => {
    return  process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key,req);
}

const getCookieFromBrowser = key => {
    return cookie.get(key)
}

const getCookieFromServer = (key, req) => {
    if(!req.headers.cookie){
        return undefined;
    }

    const rawCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${key}=`));
    if(!rawCookie){
        return undefined;
    }

    return rawCookie.split('=')[1];
}

export const reauthenticate = token => dispatch => (dispatch({type: AUTHENTICATION, payload: token}));

export const deauthenticate = () => dispatch => {
    removeCookie('token');
    Router.push('/');
    dispatch({type: DEAUTHENTICATION});
}


export const checkServerSideCookie = ctx => {
    if (ctx.isServer) {
        if (ctx.req.headers.cookie) {
            const token = getCookie('token', ctx.req);
            ctx.store.dispatch(reauthenticate(token, user));
        }
    } else {
        const token = ctx.store.getState().authentication.token;

        if (token && user && (ctx.pathname === '/signin' || ctx.pathname === '/signup')) {
            setTimeout(function() {
                Router.push('/');
            }, 0);
        }
    }
};
