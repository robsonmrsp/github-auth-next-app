import React, { useEffect, useState, useRef } from 'react';
import { faUsers, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContainer } from '@/shared/MapConainer';
import SearchField from '@/components/SearchField';
import CardUser from '@/components/CardUser';

export default function Home() {
  const [user, setUser] = useState();
  const [starredRepos, setStarredRepos] = useState([]);
  const [fetchUserError, setFetchUserError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const fetchUser = async (userName) => {
    const response = await fetch(`https://api.github.com/users/${userName}`);
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
    console.log(1);
    console.log('resp.ok', resp.ok);
    if (resp.ok) {
      console.log(2);
      const starRep = await resp.json();
      console.log(3);
      setStarredRepos(starRep);
    }
    console.log(4);
  };

  return (
    <>
      <>
        <section className="hero">
          <div className="hero-body">
            <p className="title">GitHub App</p>
            <SearchField placeholder="Find a repository" onFetchUser={searchUser} />
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
}
