import React, { useContext, useEffect } from 'react';
import SearchField from '@/components/SearchField';
import { AppContext } from '@/shared/AppContext';
import Link from 'next/link';

import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '@/config/Constants';

// FIX-ME Essa duplicação de código seria resolvida sem aumento de
// complexidade nesse componente se aumentarmos o nivel de abstração dos
// servicos de acesso a API. De tal maneira que Layout e AuthLayou seriam uma só.
// Mas acho qeu não dá tempo.
const AuthLayout = ({ children }) => {
  const { state, update } = useContext(AppContext);

  useEffect(() => {
    if (state.isAuthUser) {
      searchUser();
    } else {
      Router.push({
        pathname: '/login/',
      });
    }
  }, []);

  const searchUser = async () => {
    update({ loading: true, user: null, error: '' });
    try {
      const authUser = await fetchUser();
      const starredRepos = await fetchStarred();
      if (!authUser) {
        update({ loading: false, error: 'Usuário não encontrado' });
      } else {
        update({ loading: false, error: '', authUser, starredRepos });
      }

      update({ loading: false, error: '', authUser, starredRepos });
    } catch (error) {
      console.error(error);
      update({ loading: false, error: 'Erro ao buscar um ' });
    }
  };

  // TODO Implementar algum tratamento de erro
  const fetchUser = async () => {
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    if (response.ok) {
      const user = await response.json();
      return user;
    }
  };

  //TODO Implementar algum tratamento de erro
  const fetchStarred = async () => {
    const resp = await fetch(`${API_URL}/user/starreds`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    if (resp.ok) {
      const starRep = await resp.json();
      return starRep;
    }
  };

  const findSecondUser = async (userName) => {
    update({ loading: true });
    const response = await fetch(`${API_URL}/guest/${userName}`);
    if (response.ok) {
      const secondUser = await response.json();
      update({ loading: false, secondUser, error: '' });
    } else {
      update({ loading: false, error: 'Erro ao localizar outro usuário' });
    }
    update({ loading: false });
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
                    <Link href="/logout">
                      <button type="button" className="button is-primary">
                        <span className="icon">
                          <FontAwesomeIcon icon={faSignOutAlt} />
                        </span>
                        <span>Logout</span>
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
              {/* já pensando na lógica unificada. fetchUSer se comportaria dependendo do logado ou não. */}
              <SearchField placeholder="Find a github user partner" onFetchUser={findSecondUser} />
              {state.error && <div className="has-text-danger">{state.error}!</div>}
            </div>
          </div>
        </section>
        <section className="section"> {children}</section>
      </>
    </>
  );
};

export default AuthLayout;
