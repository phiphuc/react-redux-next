import Link from 'next/link';
import Head from 'next/head';
import { connect } from 'react-redux';
import { deauthenticate } from '../../actions/authActions';

const Layout = ({ children, title, deauthenticate, isAuthenticated }) => (
  <div>
    <Head>
    {title && <title>{title}</title>}
    </Head>
    <div>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <a>Sign Up</a>
              </Link>
            </li>
          </>
        )}
        {
          isAuthenticated && (
            <li onClick={deauthenticate}>
              <a>Sign Out</a>
            </li>
          )
        }
        <li>
          <Link href="/whoami">
            <a>Who Am I</a>
          </Link>
        </li>
      </ul>
    </div>

    <div className="has-text-centered">{children}</div>
  </div>
);

const mapStateToProps = state => ({ isAuthenticated: !!state.authentication });

export default connect(mapStateToProps, { deauthenticate })(Layout);