import React, { useEffect, useState, useRef, useContext } from 'react';
import { clientId, redirectUri, clientSecret } from '@/config/Constants';
import FormData from 'form-data';
import Router from 'next/router';
import * as nodeFetch from 'node-fetch';
import { AppContext } from '@/shared/AppContext';

const Validate = ({ authUser, token }) => {
  const { state, update } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      update({ isUserLoggedIn: !!token });
      Router.push({
        pathname: '/home/',
      });
    }
  }, []);

  return <>processado...</>;
};

export const getServerSideProps = async (ctx) => {
  const {
    query: { code },
  } = ctx;
  const data = new FormData({});
  data.append('client_id', clientId);
  data.append('client_secret', clientSecret);
  data.append('code', code);
  data.append('redirect_uri', redirectUri);
  const responseAccessToken = await nodeFetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    body: data,
  });

  const responseAccessTokenText = await responseAccessToken.text();
  const params = new URLSearchParams(responseAccessTokenText);
  const accessToken = params.get('access_token');

  // const responseUser = await nodeFetch(`https://api.github.com/user`, {
  //   headers: {
  //     Authorization: `token ${accessToken}`,
  //   },
  // });

  // const authUser = await responseUser.json();
  // console.log(authUser);

  return {
    props: {
      token: accessToken,
    },
  };
};

export default Validate;
