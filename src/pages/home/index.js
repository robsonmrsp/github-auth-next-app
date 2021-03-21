import React, { useEffect, useState, useRef, useContext } from 'react';
import { MapContainer } from '@/shared/MapConainer';
import SearchField from '@/components/SearchField';
import CardUser from '@/components/CardUser';
import { AppContext } from '@/shared/AppContext';

const Home = () => {
  const { state, update } = useContext(AppContext);
  const [user, setUser] = useState();
  const [starredRepos, setStarredRepos] = useState([]);
  const [fetchUserError, setFetchUserError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('token');
    if (isUserLoggedIn) {
      fetchUser();
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
    console.log(response);
    if (!response.ok) {
      setFetchUserError(true);
    } else {
      const user = await response.json();
      setFetchUserError(false);
      setUser(user);
    }
  };

  const fetchStarred = async (userName) => {
    const resp = await fetch(`https://api.github.com/users/${userName}/starred`);
    console.log('resp.ok', resp.ok);
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
            {/* <SearchField onFetchUser={searchUser} /> */}
          </div>
        </section>
        {user && (
          <div className="container is-fullhd">
            <div className="columns">
              <div className="column is-4">
                <CardUser user={user} starredRepos={starredRepos} />
              </div>
              <div className="column is-8">
                <MapContainer location={user.location} />
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default Home;
