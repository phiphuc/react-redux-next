import axios from 'axios';
import { connect } from 'react-redux';
import { reauthenticate, getCookie, checkServerSideCookie  } from '../actions/authActions';
import Router from 'next/router';
import Layout from '../components/Layout/Layout';

const Whoami =({user}) => (
    <Layout title = "Who Am I">
        {(user &&  (
            <>
            <h2>Who im i</h2>
                {JSON.stringify(user)}
            </>
        )) ||'Please sign in'}
    </Layout>
)

Whoami.getInitialProps = async ctx =>  {
    checkServerSideCookie(ctx);
    if(ctx.isServer){
        if (ctx.req.headers.cookie) {
            const token = getCookie('token', ctx.req);
            console.log('WHOAMI ', token);
            ctx.store.dispatch(reauthenticate(token));
          }
    } else {
    const token = ctx.store.getState().authentication.token;

    if (token && (ctx.pathname === '/signin' || ctx.pathname === '/signup')) {
      setTimeout(function() {
        Router.push('/');
      }, 0);
    }
  }
   const token = ctx.store.getState().authentication.token;
    if(token){
        return {user: 'Ryan'};
    }
}

export default connect(state => state, { reauthenticate })(Whoami);