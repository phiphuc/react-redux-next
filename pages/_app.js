import { Provider } from  'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../store'
const MyApp = ({Component, pageProps, store }) => {
    return (
        <>
            <Provider store = {store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}
MyApp.getInitialProps = async ({ Component, ctx}) => {
    ctx.store.dispatch({ type: 'FOO', payload: 'foo' });
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps }
}

export default withRedux(makeStore)(MyApp)