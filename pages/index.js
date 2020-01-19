import Layout from '../components/Layout/Layout';

const Index = ({foo, custom}) => {
    return(
        <Layout>
            <div>

            </div>
            <div>Props from getInitiaProps {custom}</div>
        </Layout>
    )
}

export default Index