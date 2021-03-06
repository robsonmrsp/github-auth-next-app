import React, { useContext } from 'react';
import Link from 'next/link';
import SearchField from '@/components/SearchField';
import { AppContext } from '@/shared/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '@/config/Constants';

const Layout = ({ children }) => {
  const { state, update } = useContext(AppContext);

  const searchUser = async (loginName) => {
    update({ loading: true, user: null, error: '' });
    if (loginName) {
      const user = await fetchUser(loginName);
      const starredRepos = await fetchStarred(loginName);
      if (!user) {
        update({ loading: false, error: 'Usuário não encontrado' });
      } else {
        update({ loading: false, error: '', user, starredRepos });
      }
    }
    update({ loading: false });
  };

  const fetchUser = async (userName) => {
    console.log('API_URL', API_URL);
    const response = await fetch(`${API_URL}/guest/${userName}`);
    if (response.ok) {
      const user = await response.json();
      return user;
    }
  };

  const fetchStarred = async (userName) => {
    console.log('API_URL', API_URL);
    const resp = await fetch(`${API_URL}/guest/${userName}/starreds`);
    if (resp.ok) {
      const starredRepos = await resp.json();
      return starredRepos;
    }
  };

  return (
    <>
      <>
        <nav className="navbar ">
          <div className="navbar-brand">
            <a className="navbar-item" href="http://github.com">
              <img
                src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                alt="Bulma: a modern CSS framework based on Flexbox"
                width={30}
                height={30}
              />
              GitHub App
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <Link href="/login">
                      <button type="button" className="button is-primary">
                        <span className="icon">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <span>Login</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Git hub app {state.loading ? ' ( processing... )' : ''}</h1>
              <SearchField placeholder="Find a github user" onFetchUser={searchUser} />
              {state.error && <div className="has-text-danger">{state.error}!</div>}
            </div>
          </div>
        </section>
        <section className="section"> {children}</section>
      </>
    </>
  );
};

export default Layout;
