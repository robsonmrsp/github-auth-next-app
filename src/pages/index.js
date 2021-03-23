import React, { useEffect, useState, useRef, useContext } from 'react';
import { faUsers, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContainer } from '@/shared/MapConainer';
import CardUser from '@/components/CardUser';
import Layout from '@/components/Layout';
import { AppContext } from '@/shared/AppContext';

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <Layout>
      {state.user && (
        <div className="container is-fullhd">
          <div className="columns">
            <div className="column is-4">
              <CardUser user={state.user} starredRepos={state.starredRepos} />
            </div>
            <div className="column is-8">
              <MapContainer location={state.user.location} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
