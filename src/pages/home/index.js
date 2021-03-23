import React, { useEffect, useState, useRef, useContext } from 'react';
import { MapContainer } from '@/shared/MapConainer';
import CardUser from '@/components/CardUser';
import { AppContext } from '@/shared/AppContext';
import Router from 'next/router';
import SearchField from '@/components/SearchField';

const Home = () => {
  const { state, update } = useContext(AppContext);
  const [user, setUser] = useState();
  const [secondUser, setSecondUser] = useState();
  const [starredRepos, setStarredRepos] = useState([]);
  const [fetchUserError, setFetchUserError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('token');
    if (isUserLoggedIn) {
      fetchUser();
      fetchStarred();
    } else {
      Router.push({
        pathname: '/login/',
      });
    }
  }, []);

  const searchUser = async (loginName) => {
    setLoading(true);
    setFetchUserError(false);
    setUser(null);

    if (loginName) {
      await fetchUser(loginName);
      fetchStarred(loginName);
    }
    setLoading(false);
  };

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/api/user`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    if (!response.ok) {
      setFetchUserError(true);
    } else {
      const user = await response.json();
      setFetchUserError(false);
      setUser(user);
    }
  };

  const findSecondUser = async (userName) => {
    const response = await fetch(`https://api.github.com/users/${userName}`);
    if (response.ok) {
      const user = await response.json();
      setSecondUser(user);
    }
  };

  const addStar = async (owner, repoName) => {
    console.log('addStar', owner, repoName);
  };

  const removeStar = async (owner, repoName) => {
    console.log('removeStar', owner, repoName);

    const resp = await fetch(`http://localhost:3000/api/user/starreds`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
      method: 'DELETE',
      body: JSON.stringify({ owner, repoName }),
    });
    if (resp.ok) {
      const starRep = await resp.json();

      console.log('Removido');
      // setStarredRepos(starRep);
    }
  };

  const fetchStarred = async (userName) => {
    const resp = await fetch(`http://localhost:3000/api/user/starreds`, {
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    if (resp.ok) {
      const starRep = await resp.json();
      setStarredRepos(starRep);
    }
  };

  return (
    <>
      <>
        <section className="hero">
          <div className="hero-body">
            <p className="title">GitHub App</p>
            <SearchField onFetchUser={findSecondUser} />
          </div>
        </section>
        {user && (
          <div className="container is-fullhd">
            <div className="columns">
              <div className="column is-4">
                <CardUser user={user} onAddStar={addStar} onRemoveStar={removeStar} starredRepos={starredRepos} />
              </div>
              <div className="column is-8">
                <MapContainer location={user.location} secondLocation={secondUser && secondUser.location} />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Home;
