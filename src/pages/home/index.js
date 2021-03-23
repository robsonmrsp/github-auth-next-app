import React, { useContext, useEffect } from 'react';
import { MapContainer } from '@/shared/MapConainer';
import CardUser from '@/components/CardUser';
import { AppContext } from '@/shared/AppContext';
import AuthLayout from '@/components/AuthLayout';

const Home = () => {
  const { state } = useContext(AppContext);
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('token');
    if (isUserLoggedIn) {
    }
  }, []);

  const addStar = async (owner, repoName) => {
    console.log('addStar', owner, repoName);
  };

  const removeStar = async (owner, repoName) => {
    const resp = await fetch(`http://localhost:3000/api/user/starreds`, {
      method: 'DELETE',
      body: JSON.stringify({ owner, repoName }),
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    if (resp.ok) {
      const starRep = await resp.json();
      console.log('Removido');
    }
  };

  return (
    <AuthLayout>
      {state.authUser && (
        <div className="container is-fullhd">
          <div className="columns">
            <div className="column is-4">
              <CardUser
                user={state.authUser}
                isAuthUser={state.isAuthUser}
                onAddStar={addStar}
                onRemoveStar={removeStar}
                starredRepos={state.starredRepos}
              />
            </div>
            <div className="column is-8">
              <MapContainer location={state.authUser.location} secondLocation={state.secondUser && state.secondUser.location} />
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default Home;
