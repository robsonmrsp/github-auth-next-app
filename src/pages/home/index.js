import React, { useContext, useEffect, useState } from 'react';
import { MapContainer } from '@/shared/MapConainer';
import CardUser from '@/components/CardUser';
import { AppContext } from '@/shared/AppContext';
import AuthLayout from '@/components/AuthLayout';
import { API_URL } from '@/config/Constants';

const Home = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { state, update } = useContext(AppContext);

  const addStar = async (owner, repoName) => {
    console.log('addStar', owner, repoName);
  };

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

  const removeStar = async (owner, repoName) => {
    update({ loading: true });
    const resp = await fetch(`${API_URL}/user/starreds`, {
      method: 'DELETE',
      body: JSON.stringify({ owner, repoName }),
      headers: {
        'x-token': localStorage.getItem('token'),
      },
    });
    if (resp.ok) {
      const starRep = await resp.json();
      const newRepos = await fetchStarred();
      update({ loading: false, starredRepos: newRepos });
    }
    update({ loading: false });
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
