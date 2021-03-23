import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { clientId, redirectUri } from '@/config/Constants';
import { AppContext } from '@/shared/AppContext';

const Login = ({ githubClientId, githubRedirectUri }) => {
  const { state, update } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem('token', false);
    update({ isAuthUser: false });
  }, []);

  return (
    <>
      <section className="section hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns ">
              <div className="column is-three-fifths is-offset-one-fifth">
                <article className="panel is-primary">
                  <p className="panel-heading  is-primary">Login</p>
                  <div className="card ">
                    <div className=" card-content has-text-centered">
                      <h1>
                        <p className="pt-2 pb-9">WELCOME</p>
                      </h1>
                      <hr />
                      <a
                        href={`https://github.com/login/oauth/authorize?scope=repo%20user%20repo_deployment&client_id=${githubClientId}&redirect_uri=${githubRedirectUri}`}
                        className="button is-large"
                      >
                        <span className="icon is-large">
                          <FontAwesomeIcon size="2x" icon={faGithubSquare} />
                        </span>
                        <span>Login with GitHub</span>
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Essa é apenas uma forma de passar a informação que está nas variaveis de ambiente(server-side) para o cliente.
// A outra é configurando devidamente o next.config(como o que está feito e comentado).
// Feita essa configuração a variavel de ambiente poderá ser usada no  client-side.
export const getServerSideProps = async (ctx) => {
  return {
    props: {
      githubClientId: clientId,
      githubRedirectUri: redirectUri,
    },
  };
};
export default Login;
