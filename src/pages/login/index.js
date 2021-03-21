import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { clientId, redirectUri } from '@/config/Constants';

const Login = () => {
  console.log('');
  return (
    <>
      <section className="section hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns ">
              <div className="column is-three-fifths is-offset-one-fifth">
                <p className="panel-heading">Login</p>
                <div className="card ">
                  <div className=" card-content has-text-centered">
                    <h1>
                      <p className="pt-2 pb-9">WELCOME</p>
                    </h1>
                    <hr />
                    <a
                      href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`}
                      className="button is-large"
                    >
                      <span className="icon is-large">
                        <FontAwesomeIcon size="2x" icon={faGithubSquare} />
                      </span>
                      <span>Login with GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
