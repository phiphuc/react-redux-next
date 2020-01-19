import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux';
import { authentication } from '....//actions/authActions';
import Layout from '../components/Layout/Layout';

const Signin = ({ authentication }) => {
    const [email,setEmail] = useState('phiphuc1994@gmail.com');
    const [password, setPassword] = useState('phiphuc');

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Login with ', { email, password });
        const user = { email, password };
        authentication(user)
    }
    return (
        <Layout title="Sign In">
            <h3>Sign In</h3>
            <form onSubmit={ handleSubmit }>
                <div>
                    <input type="email" placeholder="Email" required value={ email } onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <input className="input" type="password" placeholder="Password" required value={ password } onChange={e => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </Layout>
    )
}

export default connect(state => state, { authentication })(Signin)